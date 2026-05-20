#!/usr/bin/env node
/**
 * download-logos.mjs
 * --------------------------------------------------------------------------
 * One-shot: pull each operator's logo from the old WP CDN, save into
 * public/operators/<slug>.<ext>, and rewrite operators-overrides.json +
 * operators.json to point at the local self-hosted paths.
 *
 * Run once before committing:
 *   node scripts/download-logos.mjs
 *
 * Why self-host: Safari's ITP blocks third-party image loads aggressively;
 * loading from the same origin as the app fixes that. Also future-proofs us
 * for when the old WP install is decommissioned.
 * --------------------------------------------------------------------------
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = resolve(ROOT, 'public/operators');
const OVERRIDES = resolve(ROOT, 'data/operators-overrides.json');

// slug → source URL on the old WP CDN
const LOGOS = {
  optibet: 'https://www.onlinekazino.com/wp-content/uploads/2022/11/optibet-120x120.png',
  'klondaika-kazino': 'https://www.onlinekazino.com/wp-content/uploads/2024/03/Klondaika-logo-1-120x120.jpeg',
  laimz: 'https://www.onlinekazino.com/wp-content/uploads/2022/11/laimz-120x120.png',
  olybet: 'https://www.onlinekazino.com/wp-content/uploads/2022/11/olybet.png',
  tonybet: 'https://www.onlinekazino.com/wp-content/uploads/2022/11/TonyBet-logo.webp',
  'lvbet-kazino': 'https://www.onlinekazino.com/wp-content/uploads/2024/06/lvbet-672x372-1.png',
  'verde-kazino': 'https://www.onlinekazino.com/wp-content/uploads/2024/06/verde-casino-logo.jpg',
};

/** Pick the extension from the URL — keep webp/jpg/png as-is. */
function extFromUrl(url) {
  const e = extname(new URL(url).pathname).toLowerCase();
  return e || '.png';
}

async function download(slug, url) {
  const ext = extFromUrl(url);
  const targetName = `${slug}${ext}`;
  const targetPath = resolve(PUBLIC_DIR, targetName);
  // Send a realistic browser request — the old WP install has hotlink/UA
  // protection and 403s anything that looks scripted.
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,lv;q=0.8',
      'Referer': 'https://www.onlinekazino.com/',
      'Sec-Fetch-Dest': 'image',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'same-origin',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(targetPath, buf);
  return { slug, file: `/operators/${targetName}`, bytes: buf.length };
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });

  const results = [];
  for (const [slug, url] of Object.entries(LOGOS)) {
    process.stdout.write(`  ${slug.padEnd(18)} ← ${url.split('/').pop()} ... `);
    try {
      const r = await download(slug, url);
      results.push(r);
      console.log(`✓ ${r.bytes} B → ${r.file}`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }

  if (results.length === 0) {
    console.error('\nNothing downloaded — exiting without changes.');
    process.exit(1);
  }

  // Rewrite featuredImage in operators-overrides.json so everything points
  // at the new self-hosted paths.
  const overrides = JSON.parse(await readFile(OVERRIDES, 'utf8'));
  for (const r of results) {
    if (overrides[r.slug]) overrides[r.slug].featuredImage = r.file;
  }
  await writeFile(OVERRIDES, JSON.stringify(overrides, null, 2) + '\n', 'utf8');

  console.log(`\nUpdated featuredImage for ${results.length} operator(s) in operators-overrides.json.`);
  console.log('Next: run `node scripts/apply-overrides.mjs` then commit + push.');
}

main().catch((err) => {
  console.error('download-logos failed:', err);
  process.exit(1);
});
