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
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OPS = resolve(ROOT, 'data/operators.json');
const OVERRIDES = resolve(ROOT, 'data/operators-overrides.json');

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

  let applied = 0;
  let unmatched = [];

  const patched = operators.map((op) => {
    const patch = overrides[op.slug];
    if (!patch) return op;
    applied++;
    return deepMerge(op, patch);
  });

  // Catch override keys that didn't match any operator slug
  const opSlugs = new Set(operators.map((o) => o.slug));
  for (const slug of Object.keys(overrides)) {
    if (slug === '_meta') continue;
    if (!opSlugs.has(slug)) unmatched.push(slug);
  }

  await writeFile(OPS, JSON.stringify(patched, null, 2) + '\n', 'utf8');

  console.log(`Applied overrides to ${applied} operator(s).`);
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
