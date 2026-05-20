#!/usr/bin/env node
/**
 * categorize-drafts.mjs
 * --------------------------------------------------------------------------
 * Anna Jansons's pillar drafts in the WP export have no WordPress categories
 * attached. This script applies a keyword-based heuristic over each draft's
 * title and slug to assign one or more categories aligned with the new IA's
 * topical pillars.
 *
 * Output: writes the updated categories array back into data/wp-articles.json.
 * Only touches articles that currently have zero categories AND are promotable
 * drafts (annab pillar drafts). Already-categorized articles are left alone.
 *
 *   node scripts/categorize-drafts.mjs
 * --------------------------------------------------------------------------
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES = resolve(ROOT, 'data/wp-articles.json');

/**
 * Each rule is an ordered list — first match wins as the primary category
 * (used for breadcrumbs and on-card eyebrow), but ALL matching rules attach
 * their category to the article so category index pages are well populated.
 *
 * Patterns are lowercased substring tests against `slug + ' ' + title`.
 */
const RULES = [
  {
    slug: 'bonusi',
    label: 'Bonusi',
    patterns: ['bonus', 'bezdepozit', 'bezmaksas-griezien', 'free-spin', 'wagering', 'cashback', 'naudas-atmaks', 'high-roller', 'welcome', 'lojalitat', 'vip'],
  },
  {
    slug: 'maksajumi',
    label: 'Maksājumi',
    patterns: ['maksaj', 'depozit', 'iemaksu', 'iemaksas', 'minimal', 'swedbank', 'seb', 'revolut', 'trustly', 'kriptovalut', 'bitcoin', 'paypal', 'skrill', 'neteller', 'izņemšan', 'atrums'],
  },
  {
    slug: 'kazino-speles',
    label: 'Kazino spēles',
    patterns: ['spēļu-automat', 'spelu-automat', 'slot', 'blackjack', 'rulete', 'pokers', 'pokers', 'baccarat', 'megaways', 'džekpot', 'dzekpot', 'live-kazino', 'live-game-show', 'crazy-time', 'monopoly', 'rtp', 'rng', 'demo-spel', 'galda-spel', 'video-pokers', 'starburst', 'book-of-ra', 'keno', 'bingo', 'turniros'],
  },
  {
    slug: 'sporta-deribas',
    label: 'Sporta derības',
    patterns: ['sport', 'futbol', 'tenisa', 'tenisu', 'derīb', 'derib', 'e-sport', 'esport', 'esporta', 'virsligas', 'eiropas'],
  },
  {
    slug: 'atbildiga-spele',
    label: 'Atbildīga spēle',
    patterns: ['atbildig', 'limit', 'pašatteik', 'pasatteik', 'sociala-kazino', 'atkari', 'kapec'],
  },
  {
    slug: 'regulejumi-un-licences',
    label: 'Regulējumi un licences',
    patterns: ['licenc', 'regulej', 'likum', 'nodokl', 'iaui', 'baltij', 'parrobez', 'apliksan', 'aplikti'],
  },
  {
    slug: 'kazino-ceļveži',
    label: 'Kazino ceļveži',
    patterns: ['labak', 'celved', 'izvēl', 'izvel', 'ka-spelet', 'ka-izveleti', 'salidzinaj', 'salīdzinā', 'speletaj', 'pilnais', 'top-', 'jauni-', 'arzemju', 'mobilais', 'mobil', 'krap', 'apskat', 'sākumlap'],
  },
  {
    slug: 'spelu-izstradataji',
    label: 'Spēļu izstrādātāji',
    patterns: ['synot', 'egt', 'netent', 'pragmatic', 'microgaming', 'evolution', 'izstradataj'],
  },
  {
    slug: 'loterijas',
    label: 'Loterijas',
    patterns: ['loterij', 'eurojackpot', 'vikinglott', 'loto-5'],
  },
];

function categorize(article) {
  const haystack = `${article.slug} ${article.title}`.toLowerCase();
  const matches = [];
  for (const rule of RULES) {
    if (rule.patterns.some((p) => haystack.includes(p))) {
      matches.push({ slug: rule.slug, label: rule.label });
    }
  }
  return matches;
}

async function main() {
  const articles = JSON.parse(await readFile(ARTICLES, 'utf8'));

  let touched = 0;
  let unassigned = [];

  for (const a of articles) {
    // Only touch drafts that are being promoted AND currently uncategorized.
    if (!a.promoteDraft) continue;
    if (a.categories && a.categories.length > 0) continue;

    const cats = categorize(a);
    if (cats.length === 0) {
      unassigned.push(a.slug);
      // Default any leftover annab drafts to "Kazino ceļveži" so they at
      // least show up under one category page instead of orphaning.
      a.categories = [{ slug: 'kazino-celvezi', label: 'Kazino ceļveži' }];
    } else {
      a.categories = cats;
    }
    touched++;
  }

  await writeFile(ARTICLES, JSON.stringify(articles, null, 2) + '\n', 'utf8');

  console.log(`Categorized ${touched} draft article(s).`);
  if (unassigned.length) {
    console.warn(
      `${unassigned.length} article(s) didn't match any rule — defaulted to "Kazino ceļveži":`,
    );
    for (const s of unassigned) console.warn('  ·', s);
  }

  // Summary of distribution
  const dist = new Map();
  for (const a of articles) {
    if (!(a.isPublished || a.promoteDraft)) continue;
    for (const c of a.categories) {
      dist.set(c.label, (dist.get(c.label) ?? 0) + 1);
    }
  }
  console.log('\nFinal category distribution (all renderable articles):');
  for (const [label, n] of [...dist.entries()].sort((a, b) => b[1] - a[1])) {
    console.log('  ' + label.padEnd(28), n);
  }
}

main().catch((err) => {
  console.error('categorize-drafts failed:', err);
  process.exit(1);
});
