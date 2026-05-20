#!/usr/bin/env node
/**
 * import-wp.mjs
 * --------------------------------------------------------------------------
 * Parses the WordPress export XML for OnlineKazino.com and emits the JSON
 * data files the Next.js app reads at build time:
 *
 *   data/operators.json          — LV-licensed operator records (KEEP/REWRITE)
 *   data/affiliates.json         — affiliate URLs + tracking metadata
 *   data/wp-articles.json        — annab pillar drafts + relevant published posts
 *   data/wp-pages-processed.json — static pages (about, contact, etc.)
 *   data/wp-attachments.json     — surviving attachments (logos, real featured imgs)
 *   data/redirects.json          — old WP URL → new path map (for next.config redirects)
 *
 * Decisions live in docs/CONTENT_AUDIT.md. Tweak the constants at the top to
 * change keep/discard rules.
 *
 * Usage: node scripts/import-wp.mjs path/to/onlinekazino.WordPress.xml
 *
 * Pure Node (>=20). No external deps required (uses built-in regex + a tiny
 * hand-rolled parser; this XML is large but well-formed and predictable).
 * --------------------------------------------------------------------------
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA_DIR = resolve(ROOT, 'data');

// ---------------------------------------------------------------------------
// Audit decisions (see docs/CONTENT_AUDIT.md)
// ---------------------------------------------------------------------------

// Casino slugs that survive — real LV operators. Demo casinos are dropped.
// Note: WP slugs (wp:post_name) sometimes differ from the title — these are the
// actual slugs observed in the export. We additionally treat any record with a
// non-Mercury affiliate partner (e.g. Enlabs Partners) as real, regardless of
// whether the slug appears here.
const KEEP_CASINO_SLUGS = new Set([
  'optibet',
  'olybet',
  'klondaika-kazino',
  'laimz',
  'lvbet-kazino',
  'tonybet',
  'verde-kazino',
]);

// Mercury-theme demo affiliate URL — anything pointing here is template data
const MERCURY_DEMO_URL = 'https://1.envato.market/mercury';

// Authors whose drafts we want to publish (Anna Jansons wrote the LV pillar
// articles; dt_admin's published posts are older industry news, kept on a
// separate track).
const PROMOTE_DRAFT_AUTHORS = new Set(['annab']);

// ---------------------------------------------------------------------------
// Tiny WXR (WordPress eXtended RSS) reader
// ---------------------------------------------------------------------------

/**
 * Pull every <item>…</item> block out of the WXR file. WXR doesn't nest items,
 * so a simple state-machine split is robust enough and stays O(n) over the
 * 9 MB file.
 */
function splitItems(xml) {
  const items = [];
  let i = 0;
  while (i < xml.length) {
    const start = xml.indexOf('<item>', i);
    if (start === -1) break;
    const end = xml.indexOf('</item>', start);
    if (end === -1) break;
    items.push(xml.slice(start, end + '</item>'.length));
    i = end + 1;
  }
  return items;
}

const CDATA_RX = /<!\[CDATA\[([\s\S]*?)\]\]>/;

/** Extract a single element's CDATA / text body by tag name. */
function tag(item, name) {
  const rx = new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`);
  const m = item.match(rx);
  if (!m) return undefined;
  const cdata = m[1].match(CDATA_RX);
  return (cdata ? cdata[1] : m[1]).trim() || undefined;
}

/** Extract every <wp:postmeta> as a {key, value} dict. */
function postMeta(item) {
  const meta = {};
  const rx = /<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g;
  let m;
  while ((m = rx.exec(item)) !== null) {
    const block = m[1];
    const key = block.match(/<wp:meta_key>([\s\S]*?)<\/wp:meta_key>/);
    const val = block.match(/<wp:meta_value>([\s\S]*?)<\/wp:meta_value>/);
    if (!key) continue;
    const k = (key[1].match(CDATA_RX)?.[1] ?? key[1]).trim();
    const v = val ? (val[1].match(CDATA_RX)?.[1] ?? val[1]).trim() : '';
    meta[k] = v;
  }
  return meta;
}

/** Extract every <category domain=… nicename=…>label</category>. */
function categories(item) {
  const out = [];
  const rx = /<category domain="([^"]+)" nicename="([^"]+)">([\s\S]*?)<\/category>/g;
  let m;
  while ((m = rx.exec(item)) !== null) {
    const label = (m[3].match(CDATA_RX)?.[1] ?? m[3]).trim();
    out.push({ domain: m[1], slug: m[2], label });
  }
  return out;
}

/**
 * Strip Gutenberg block comments (`<!-- wp:xxx -->`) and the small handful of
 * Mercury theme shortcodes that show up in casino content. Keeps the inner
 * HTML intact so the article markup stays portable.
 */
function cleanBlockMarkup(html) {
  if (!html) return '';
  return html
    // Gutenberg block delimiters
    .replace(/<!-- \/?wp:[^>]*-->/g, '')
    // Mercury pros/cons shortcodes — content already contains the <ul>
    .replace(/\[\/?aces-(?:pros|cons)-\d+(?:\s+title="[^"]*")?\]/g, '')
    // Card glyph shortcodes (decorative)
    .replace(/\[aces-card[^\]]*\]/g, '')
    // Trailing whitespace + redundant blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Collapse all HTML to a plain-text excerpt of N chars. */
function excerptFromHtml(html, n = 220) {
  const txt = (html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return txt.length <= n ? txt : txt.slice(0, n - 1) + '…';
}

/** Latvian-friendly slug fallback (strips diacritics, lowercases). */
function slugify(s) {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Per-post-type extractors
// ---------------------------------------------------------------------------

function extractCommon(item) {
  return {
    wpId: Number(tag(item, 'wp:post_id')),
    title: tag(item, 'title'),
    slug: tag(item, 'wp:post_name'),
    status: tag(item, 'wp:status'),
    type: tag(item, 'wp:post_type'),
    author: tag(item, 'dc:creator'),
    publishedAt: tag(item, 'wp:post_date_gmt') ?? tag(item, 'wp:post_date'),
    modifiedAt: tag(item, 'wp:post_modified_gmt') ?? tag(item, 'wp:post_modified'),
    link: tag(item, 'link'),
    excerpt: tag(item, 'excerpt:encoded') ?? '',
    content: cleanBlockMarkup(tag(item, 'content:encoded') ?? ''),
    categories: categories(item),
    meta: postMeta(item),
  };
}

function buildOperator(item, attachments) {
  const c = extractCommon(item);
  const meta = c.meta;
  const affiliateUrl = meta.casino_external_link || '';
  const isMercuryDemo = affiliateUrl.startsWith(MERCURY_DEMO_URL);
  const slug = c.slug || slugify(c.title);
  // "Keep" if either the slug is on our allow-list OR the affiliate partner is
  // a legitimate LV network (i.e. the URL doesn't point at the Mercury demo).
  // This catches future entries we haven't manually classified.
  const keep =
    KEEP_CASINO_SLUGS.has(slug) ||
    (affiliateUrl.length > 0 && !isMercuryDemo);

  const ratings = {
    trust: numOrUndef(meta.casino_rating_trust),
    games: numOrUndef(meta.casino_rating_games),
    bonus: numOrUndef(meta.casino_rating_bonus),
    customer: numOrUndef(meta.casino_rating_customer),
    overall: numOrUndef(meta.casino_overall_rating),
  };

  const featuredImageId = meta._thumbnail_id ? Number(meta._thumbnail_id) : null;
  const featuredImage = featuredImageId
    ? attachments.get(featuredImageId)?.url ?? null
    : null;

  // Group categories by domain for easy template access
  const byDomain = {};
  for (const cat of c.categories) {
    (byDomain[cat.domain] ??= []).push(cat.label);
  }

  return {
    wpId: c.wpId,
    slug,
    name: c.title,
    status: c.status,
    keep,
    isMercuryDemo,
    ratings,
    affiliate: {
      url: affiliateUrl,
      partner: detectPartner(affiliateUrl),
    },
    bonus: {
      shortDesc: stripHtml(meta.casino_short_desc ?? ''),
      termsDesc: stripHtml(meta.casino_terms_desc ?? ''),
      detailedTc: stripHtml(meta.casino_detailed_tc ?? ''),
      buttonNotice: stripHtml(meta.casino_button_notice ?? ''),
    },
    facets: {
      licences: byDomain['licence'] ?? [],
      depositMethods: byDomain['deposit-method'] ?? [],
      withdrawalMethods: byDomain['withdrawal-method'] ?? [],
      currencies: byDomain['currency'] ?? [],
      languages: byDomain['casino-language'] ?? [],
      software: byDomain['software'] ?? [],
      devices: byDomain['device'] ?? [],
      restrictedCountries: byDomain['restricted-country'] ?? [],
      categories: byDomain['casino-category'] ?? [],
      established: byDomain['casino-est']?.[0] ?? null,
      owner: byDomain['owner']?.[0] ?? null,
    },
    featuredImage,
    excerpt: stripHtml(c.excerpt) || excerptFromHtml(c.content),
    content: c.content,
    publishedAt: c.publishedAt,
    modifiedAt: c.modifiedAt,
  };
}

function detectPartner(url) {
  if (!url) return null;
  if (url.includes('enlabspartners.com')) return 'enlabs';
  if (url.includes('1.envato.market')) return 'mercury-demo';
  return 'direct';
}

function buildArticle(item, attachments) {
  const c = extractCommon(item);
  const featuredImageId = c.meta._thumbnail_id ? Number(c.meta._thumbnail_id) : null;
  const featuredImage = featuredImageId
    ? attachments.get(featuredImageId)?.url ?? null
    : null;

  const promote = c.status === 'draft' && PROMOTE_DRAFT_AUTHORS.has(c.author);
  const isPublished = c.status === 'publish';

  return {
    wpId: c.wpId,
    slug: c.slug || slugify(c.title),
    title: c.title,
    status: c.status,
    isPublished,
    promoteDraft: promote, // annab's drafts are the editorial backbone
    author: c.author,
    excerpt: stripHtml(c.excerpt) || excerptFromHtml(c.content),
    content: c.content,
    categories: c.categories.map((cat) => ({ slug: cat.slug, label: cat.label })),
    featuredImage,
    wordCount: wordCount(c.content),
    publishedAt: c.publishedAt,
    modifiedAt: c.modifiedAt,
    link: c.link,
  };
}

function buildPage(item, attachments) {
  const c = extractCommon(item);
  const featuredImageId = c.meta._thumbnail_id ? Number(c.meta._thumbnail_id) : null;
  const featuredImage = featuredImageId
    ? attachments.get(featuredImageId)?.url ?? null
    : null;
  return {
    wpId: c.wpId,
    slug: c.slug || slugify(c.title),
    title: c.title,
    status: c.status,
    content: c.content,
    excerpt: stripHtml(c.excerpt) || excerptFromHtml(c.content),
    featuredImage,
    publishedAt: c.publishedAt,
    modifiedAt: c.modifiedAt,
  };
}

function buildAttachment(item) {
  const c = extractCommon(item);
  const url = tag(item, 'wp:attachment_url');
  return {
    wpId: c.wpId,
    url,
    title: c.title,
    publishedAt: c.publishedAt,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function numOrUndef(v) {
  if (v === undefined || v === null || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function stripHtml(s) {
  return (s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(html) {
  return stripHtml(html).split(/\s+/).filter(Boolean).length;
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function writeJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`  ✓ ${path.replace(ROOT + '/', '')}  (${
    Array.isArray(data) ? data.length + ' items' : Object.keys(data).length + ' keys'
  })`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const xmlPath = process.argv[2];
  if (!xmlPath) {
    console.error('Usage: node scripts/import-wp.mjs <path-to-wp-export.xml>');
    process.exit(1);
  }

  console.log(`Reading ${xmlPath} …`);
  const xml = await readFile(xmlPath, 'utf8');
  const items = splitItems(xml);
  console.log(`  ${items.length} <item> blocks found.`);

  // Pass 1: index attachments so other records can resolve _thumbnail_id
  const attachments = new Map();
  for (const item of items) {
    if (tag(item, 'wp:post_type') !== 'attachment') continue;
    const att = buildAttachment(item);
    if (att.wpId && att.url) attachments.set(att.wpId, att);
  }

  // Pass 2: build typed records
  const operators = [];
  const articles = [];
  const pages = [];
  const skipped = { byType: {}, mercuryDemos: 0 };

  for (const item of items) {
    const t = tag(item, 'wp:post_type');
    if (!t) continue;
    if (t === 'attachment') continue;

    if (t === 'casino') {
      const op = buildOperator(item, attachments);
      operators.push(op);
      if (op.isMercuryDemo) skipped.mercuryDemos++;
    } else if (t === 'post') {
      articles.push(buildArticle(item, attachments));
    } else if (t === 'page') {
      pages.push(buildPage(item, attachments));
    } else if (t === 'bonus' || t === 'game') {
      // Audit decision: discard demo bonuses + games entirely.
      skipped.byType[t] = (skipped.byType[t] ?? 0) + 1;
    } else {
      skipped.byType[t] = (skipped.byType[t] ?? 0) + 1;
    }
  }

  // Sort outputs predictably
  operators.sort((a, b) => (b.ratings.overall ?? 0) - (a.ratings.overall ?? 0));
  articles.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));
  pages.sort((a, b) => a.slug.localeCompare(b.slug));

  // Affiliate index
  const affiliates = operators
    .filter((op) => op.keep && op.affiliate.url && op.affiliate.partner !== 'mercury-demo')
    .map((op) => ({
      operatorSlug: op.slug,
      partner: op.affiliate.partner,
      sourceUrl: op.affiliate.url,
      // Internal redirect we'll use on the frontend (`/go/<slug>`).
      goPath: `/go/${op.slug}`,
    }));

  // Redirect map: legacy WP permalinks → new IA paths
  const redirects = [];
  for (const op of operators) {
    if (!op.keep || !op.wpId) continue;
    redirects.push({
      from: `/?post_type=casino&p=${op.wpId}`,
      to: `/kazino/${op.slug}/`,
      permanent: true,
    });
  }
  for (const a of articles) {
    if (!a.wpId) continue;
    redirects.push({
      from: `/?p=${a.wpId}`,
      to: `/raksti/${a.slug}/`,
      permanent: true,
    });
  }

  await ensureDir(DATA_DIR);
  await writeJson(resolve(DATA_DIR, 'operators.json'), operators);
  await writeJson(resolve(DATA_DIR, 'affiliates.json'), affiliates);
  await writeJson(resolve(DATA_DIR, 'wp-articles.json'), articles);
  await writeJson(resolve(DATA_DIR, 'wp-pages-processed.json'), pages);
  await writeJson(resolve(DATA_DIR, 'wp-attachments.json'), Array.from(attachments.values()));
  await writeJson(resolve(DATA_DIR, 'redirects.json'), redirects);

  // Summary
  const keepers = operators.filter((o) => o.keep).length;
  const draftPromote = articles.filter((a) => a.promoteDraft).length;
  const published = articles.filter((a) => a.isPublished).length;
  console.log('\nSummary');
  console.log('  operators kept (real LV):', keepers);
  console.log('  operators flagged demo  :', skipped.mercuryDemos);
  console.log('  articles published      :', published);
  console.log('  drafts to promote (annab):', draftPromote);
  console.log('  pages migrated          :', pages.length);
  console.log('  bonuses discarded       :', skipped.byType.bonus ?? 0);
  console.log('  game CPT discarded      :', skipped.byType.game ?? 0);
}

main().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
