#!/usr/bin/env node
/**
 * apply-overrides.mjs
 * --------------------------------------------------------------------------
 * Deep-merges data/operators-overrides.json into data/operators.json.
 *
 * Run after scripts/import-wp.mjs to layer hand-edited operator copy (real
 * LV reviews, correct affiliate URLs, logos) on top of the WP export.
 *
 *   node scripts/import-wp.mjs path/to/wp-export.xml
 *   node scripts/apply-overrides.mjs
 *
 * The override file is keyed by operator slug. Any nested object is merged
 * key-by-key; arrays and primitives are replaced wholesale. Operators not
 * present in the override file pass through unchanged.
 * --------------------------------------------------------------------------
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OPS = resolve(ROOT, 'data/operators.json');
const OVERRIDES = resolve(ROOT, 'data/operators-overrides.json');
const ADDITIONS = resolve(ROOT, 'data/operators-additions.json');

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/** Deep-merge `patch` into `base`. Arrays and primitives are replaced. */
function deepMerge(base, patch) {
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (isPlainObject(v) && isPlainObject(out[k])) {
      out[k] = deepMerge(out[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

async function main() {
  const operators = JSON.parse(await readFile(OPS, 'utf8'));
  const overrides = JSON.parse(await readFile(OVERRIDES, 'utf8'));
  const additions = existsSync(ADDITIONS)
    ? JSON.parse(await readFile(ADDITIONS, 'utf8'))
    : { operators: [] };

  let merged = 0;
  let appended = 0;
  let unmatched = [];

  // Pass 1 — merge overrides into existing operators (by slug)
  const patched = operators.map((op) => {
    const patch = overrides[op.slug];
    if (!patch) return op;
    merged++;
    return deepMerge(op, patch);
  });

  const opSlugs = new Set(patched.map((o) => o.slug));
  for (const slug of Object.keys(overrides)) {
    if (slug === '_meta') continue;
    if (!opSlugs.has(slug)) unmatched.push(slug);
  }

  // Pass 2 — append net-new operators that aren't in the WP-imported set.
  // Skipped silently if an addition's slug already exists (use overrides for
  // that case instead).
  for (const newOp of additions.operators ?? []) {
    if (!newOp.slug) continue;
    if (opSlugs.has(newOp.slug)) {
      console.warn(`WARN: addition "${newOp.slug}" already exists — use operators-overrides.json for edits.`);
      continue;
    }
    patched.push(newOp);
    opSlugs.add(newOp.slug);
    appended++;
  }

  // Resort by overall rating (descending) so getOperators() ordering matches
  // the post-WP-import shape.
  patched.sort((a, b) => (b.ratings?.overall ?? 0) - (a.ratings?.overall ?? 0));

  await writeFile(OPS, JSON.stringify(patched, null, 2) + '\n', 'utf8');

  console.log(`Merged overrides into ${merged} operator(s); appended ${appended} new operator(s).`);
  if (unmatched.length) {
    console.warn(
      `WARN: ${unmatched.length} override key(s) did not match any operator slug:`,
    );
    for (const s of unmatched) console.warn('  -', s);
  }
}

main().catch((err) => {
  console.error('apply-overrides failed:', err);
  process.exit(1);
});
