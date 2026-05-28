#!/usr/bin/env node
/**
 * One-shot cleanup pass to fix the issues Ahrefs surfaced on 2026-05-27:
 *
 *   - Health Score: 42 / 100
 *   - 134 pages link to broken page
 *   - 30 broken images / 35 pages have broken image
 *   - 62 pages link to redirect
 *
 * Two root causes account for the vast majority:
 *
 *   1. featuredImage URLs point at /wp-content/uploads/… on the now-defunct
 *      WP install — they all 404.
 *   2. Article HTML contains inline <img …wp-content…> and
 *      <a href="…/apskati/{slug}/"> references — the same dead WP URLs.
 *
 * This script walks data/wp-articles.json and:
 *
 *   - sets featuredImage to null on any record whose URL contains
 *     /wp-content/ (the article template handles null already).
 *   - strips <img> tags whose src points at /wp-content/ from `content` HTML
 *     (also removes <figure> wrappers that are now empty).
 *   - rewrites href="…/apskati/{slug}/" to "/kazino/{slug}/" inline.
 *   - rewrites any other absolute internal URL
 *     ("https://www.onlinekazino.com/…") to a root-relative href so we don't
 *     emit cross-origin links.
 *
 * Idempotent — running twice yields no diff.
 *
 * Usage:
 *   node scripts/ahrefs-cleanup.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ARTICLES_PATH = join(ROOT, 'data', 'wp-articles.json');

const APSKATI_TO_KAZINO = (s) =>
  s
    .replace(
      /https?:\/\/(?:www\.)?onlinekazino\.com\/apskati\/([a-z0-9-]+)\/?/gi,
      '/kazino/$1/',
    )
    // Bare paths too, in case any made it in without the host
    .replace(/href="\/apskati\/([a-z0-9-]+)\/?"/gi, 'href="/kazino/$1/"');

const ABSOLUTE_INTERNAL = (s) =>
  s.replace(
    /https?:\/\/(?:www\.)?onlinekazino\.com(\/(?!og|api|wp-content|wp-includes)[^\s"'<>]*)/g,
    '$1',
  );

const STRIP_WP_IMG = (s) =>
  s
    // <figure …><img … wp-content … /></figure>
    .replace(
      /<figure[^>]*>\s*<img[^>]*\bsrc=["'][^"']*\/wp-content\/[^"']*["'][^>]*>\s*(<figcaption[^>]*>[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi,
      '',
    )
    // bare <img … wp-content … />
    .replace(
      /<img[^>]*\bsrc=["'][^"']*\/wp-content\/[^"']*["'][^>]*\/?>/gi,
      '',
    )
    // any anchor wrapping a wp-content url (e.g. lightbox links)
    .replace(
      /<a[^>]*\bhref=["'][^"']*\/wp-content\/[^"']*["'][^>]*>[\s\S]*?<\/a>/gi,
      '',
    );

function clean(html) {
  if (!html) return html;
  let out = html;
  out = STRIP_WP_IMG(out);
  out = APSKATI_TO_KAZINO(out);
  out = ABSOLUTE_INTERNAL(out);
  // Collapse double blank lines created by stripped figures
  out = out.replace(/(\r?\n\s*){3,}/g, '\n\n');
  return out;
}

function main() {
  const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
  let imgNulled = 0;
  let contentStripped = 0;
  let apskatiRewritten = 0;
  let absoluteRewritten = 0;

  for (const a of articles) {
    // Pack A — featuredImage
    if (a.featuredImage && /\/wp-content\//i.test(a.featuredImage)) {
      a.featuredImage = null;
      imgNulled++;
    }

    // Pack A — inline images + Pack B — apskati rewrite + absolute → relative
    if (a.content) {
      const before = a.content;
      const afterImg = STRIP_WP_IMG(before);
      const afterApskati = APSKATI_TO_KAZINO(afterImg);
      const afterAbs = ABSOLUTE_INTERNAL(afterApskati);
      const after = afterAbs.replace(/(\r?\n\s*){3,}/g, '\n\n');

      if (afterImg !== before) contentStripped++;
      if (afterApskati !== afterImg) apskatiRewritten++;
      if (afterAbs !== afterApskati) absoluteRewritten++;

      a.content = after;

      // Recompute wordCount because we may have stripped figures
      const text = after.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      a.wordCount = text ? text.split(' ').length : 0;
    }
  }

  writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2) + '\n', 'utf8');

  console.log('Ahrefs cleanup complete:');
  console.log(`  • featuredImage set to null:           ${imgNulled} articles`);
  console.log(`  • inline /wp-content/ images stripped: ${contentStripped} articles`);
  console.log(`  • /apskati/ links rewritten:           ${apskatiRewritten} articles`);
  console.log(`  • absolute internal URLs relativised:  ${absoluteRewritten} articles`);
  console.log(`  • Total articles processed:            ${articles.length}`);
}

main();
