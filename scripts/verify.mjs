#!/usr/bin/env node
/**
 * Smoke-test the JSON data layer the way the app templates will use it.
 * Run with: node scripts/verify.mjs
 *
 * Catches the integrity issues TypeScript would catch (missing fields, broken
 * slugs, dangling references, empty arrays where the UI assumes content).
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = resolve(ROOT, 'data');

let errors = 0;
let warnings = 0;

const fail = (msg) => {
  console.error(`  ✗ ${msg}`);
  errors++;
};
const warn = (msg) => {
  console.warn(`  ⚠ ${msg}`);
  warnings++;
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

async function load(name) {
  return JSON.parse(await readFile(resolve(DATA, name), 'utf8'));
}

const operators = await load('operators.json');
const articles = await load('wp-articles.json');
const pages = await load('wp-pages-processed.json');
const affiliates = await load('affiliates.json');
const redirects = await load('redirects.json');

console.log('\n→ Operators');
const keep = operators.filter((o) => o.keep);
ok(`${operators.length} total, ${keep.length} kept`);
for (const op of keep) {
  if (!op.slug) fail(`Operator wpId=${op.wpId} missing slug`);
  if (!op.name) fail(`Operator ${op.slug} missing name`);
  if (op.ratings.overall === undefined) warn(`${op.slug} has no overall rating`);
  if (!op.affiliate.url) warn(`${op.slug} has empty affiliate URL`);
  if (!op.bonus.shortDesc) warn(`${op.slug} has no bonus shortDesc`);
}

console.log('\n→ Articles');
const live = articles.filter((a) => a.isPublished || a.promoteDraft);
ok(`${articles.length} total, ${live.length} renderable`);
const slugs = new Set();
for (const a of live) {
  if (!a.slug) fail(`Article wpId=${a.wpId} missing slug`);
  if (slugs.has(a.slug)) fail(`Duplicate article slug: ${a.slug}`);
  slugs.add(a.slug);
  if (!a.title) fail(`${a.slug} missing title`);
  if (!a.content || a.content.length < 30) warn(`${a.slug} has very short content (${a.content?.length ?? 0} chars)`);
  if (a.categories.length === 0) warn(`${a.slug} has no categories`);
}

console.log('\n→ Affiliates');
ok(`${affiliates.length} affiliate entries`);
const opSlugs = new Set(keep.map((o) => o.slug));
for (const aff of affiliates) {
  if (!opSlugs.has(aff.operatorSlug)) {
    fail(`Affiliate references unknown operator: ${aff.operatorSlug}`);
  }
  if (!aff.sourceUrl?.startsWith('https://')) {
    fail(`Affiliate ${aff.operatorSlug} has invalid sourceUrl`);
  }
}

console.log('\n→ Pages');
ok(`${pages.length} pages migrated`);

console.log('\n→ Redirects');
ok(`${redirects.length} redirects`);
const targets = new Set();
for (const r of redirects) {
  if (!r.from || !r.to) fail(`Redirect missing from/to`);
  if (targets.has(r.from)) warn(`Duplicate redirect source: ${r.from}`);
  targets.add(r.from);
}

console.log('\n→ Article category coverage');
const categoryCounts = new Map();
for (const a of live) {
  for (const c of a.categories) {
    categoryCounts.set(c.slug, (categoryCounts.get(c.slug) ?? 0) + 1);
  }
}
ok(`${categoryCounts.size} unique categories`);
const ranked = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]);
for (const [slug, count] of ranked.slice(0, 8)) {
  console.log(`    ${slug.padEnd(30)} ${count}`);
}

console.log('\n→ Author distribution');
const authorCounts = new Map();
for (const a of live) {
  authorCounts.set(a.author, (authorCounts.get(a.author) ?? 0) + 1);
}
for (const [author, count] of authorCounts) {
  console.log(`    ${author.padEnd(15)} ${count}`);
}

console.log('\n→ Build readiness');
if (keep.length === 0) fail('No operators kept — homepage will be empty');
if (live.length === 0) fail('No articles renderable — /raksti will be empty');
if (affiliates.length === 0) warn('No affiliate URLs — /go/[slug] will redirect to /kazino/');

console.log('');
if (errors > 0) {
  console.error(`✗ ${errors} error(s), ${warnings} warning(s).`);
  process.exit(1);
} else {
  console.log(`✓ All checks passed (${warnings} warning(s)).`);
}
