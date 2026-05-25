#!/usr/bin/env node
/**
 * Publish a batch of daily articles produced by the morning scheduled run.
 *
 * Reads a JSON file like:
 *   [
 *     {
 *       "title":   "...",
 *       "excerpt": "...",
 *       "content": "<p>...</p>",
 *       "categorySlug": "kazino-celvezi",
 *       "categoryLabel": "Kazino ceļveži",
 *       "author":  "annab" | "dt_admin"
 *     },
 *     ... (5 items)
 *   ]
 *
 * For each entry:
 *   - slugifies the title (LV diacritic-aware)
 *   - ensures slug uniqueness against existing articles
 *   - assigns a randomized publishedAt within the daily window so there's no
 *     visible time-of-day pattern across runs
 *   - computes wordCount
 *   - appends to data/wp-articles.json
 *
 * After all 5 are appended, performs `git add . && git commit && git push`
 * so Vercel auto-deploys.
 *
 * Usage:
 *   node scripts/publish-daily-articles.mjs path/to/batch.json
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const ARTICLES_PATH = join(ROOT, 'data', 'wp-articles.json');

// --- helpers --------------------------------------------------------------

const LV_MAP = {
  ā: 'a', č: 'c', ē: 'e', ģ: 'g', ī: 'i', ķ: 'k',
  ļ: 'l', ņ: 'n', š: 's', ū: 'u', ž: 'z',
  Ā: 'a', Č: 'c', Ē: 'e', Ģ: 'g', Ī: 'i', Ķ: 'k',
  Ļ: 'l', Ņ: 'n', Š: 's', Ū: 'u', Ž: 'z',
};

function slugify(input) {
  const lowered = String(input).toLowerCase();
  const stripped = lowered
    .split('')
    .map((ch) => LV_MAP[ch] ?? ch)
    .join('');
  return stripped
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function ensureUniqueSlug(base, existing) {
  if (!existing.has(base)) return base;
  for (let i = 2; i < 50; i++) {
    const candidate = `${base}-${i}`;
    if (!existing.has(candidate)) return candidate;
  }
  return `${base}-${Date.now()}`;
}

function countWords(html) {
  const text = String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

/**
 * Build a publishedAt timestamp for today with a randomized hour/minute
 * inside the configured window. Window default 06:00–22:00 Riga local.
 *
 * Each call produces a different stamp so the 5 daily articles spread across
 * the day naturally.
 */
function randomizedTimestamp({ minHour = 6, maxHour = 22 } = {}) {
  const now = new Date();
  const hour = minHour + Math.floor(Math.random() * (maxHour - minHour));
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  const d = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    second,
  );
  // WordPress-style "Y-m-d H:i:s" (matches the rest of wp-articles.json)
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function nextWpId(existing) {
  const max = existing.reduce((m, a) => Math.max(m, Number(a.wpId) || 0), 0);
  return max + 1;
}

/**
 * Clear stale git lock files left behind by previous aborted runs.
 *
 * The Cowork sandbox sometimes leaves orphaned `.git/*.lock` files because
 * the shell can't `unlink()` them on cleanup. Rename works where delete
 * doesn't, so we rename any lockfiles aside on every run.
 */
function clearStaleGitLocks() {
  const gitDir = join(ROOT, '.git');
  if (!existsSync(gitDir)) return;
  const candidates = [
    'HEAD.lock',
    'index.lock',
    'packed-refs.lock',
    'REBASE_HEAD.lock',
    'refs/heads/main.lock',
  ];
  for (const rel of candidates) {
    const p = join(gitDir, rel);
    if (existsSync(p)) {
      try {
        renameSync(p, `${p}.stale-${Date.now()}`);
        console.log(`Cleared stale git lock: .git/${rel}`);
      } catch (err) {
        console.warn(`Could not clear .git/${rel}: ${err.message}`);
      }
    }
  }
}

// --- main -----------------------------------------------------------------

function main() {
  clearStaleGitLocks();

  const batchPath = process.argv[2];
  if (!batchPath) {
    console.error('Usage: node scripts/publish-daily-articles.mjs <batch.json>');
    process.exit(1);
  }
  if (!existsSync(batchPath)) {
    console.error(`Batch file not found: ${batchPath}`);
    process.exit(1);
  }

  const batch = JSON.parse(readFileSync(batchPath, 'utf8'));
  if (!Array.isArray(batch) || batch.length === 0) {
    console.error('Batch must be a non-empty JSON array.');
    process.exit(1);
  }

  const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
  const slugSet = new Set(articles.map((a) => a.slug));
  let wpId = nextWpId(articles);

  // Sort batch so timestamps are produced in a randomized order (slug-stable)
  const stamps = batch.map(() => randomizedTimestamp()).sort();

  const added = [];
  batch.forEach((entry, idx) => {
    const required = ['title', 'excerpt', 'content', 'categorySlug', 'categoryLabel'];
    for (const k of required) {
      if (!entry[k]) {
        console.error(`Entry ${idx} missing required field: ${k}`);
        process.exit(1);
      }
    }
    const baseSlug = slugify(entry.title);
    if (!baseSlug) {
      console.error(`Entry ${idx} produced empty slug from title: ${entry.title}`);
      process.exit(1);
    }
    const slug = ensureUniqueSlug(baseSlug, slugSet);
    slugSet.add(slug);

    const author = entry.author === 'annab' || entry.author === 'dt_admin' ? entry.author : 'dt_admin';
    const publishedAt = stamps[idx];

    const record = {
      wpId: wpId++,
      slug,
      title: entry.title,
      status: 'publish',
      isPublished: true,
      promoteDraft: false,
      author,
      excerpt: entry.excerpt,
      content: entry.content,
      categories: [{ slug: entry.categorySlug, label: entry.categoryLabel }],
      featuredImage: entry.featuredImage ?? null,
      wordCount: countWords(entry.content),
      publishedAt,
      modifiedAt: publishedAt,
      link: `/raksti/${slug}/`,
    };
    articles.push(record);
    added.push({ slug, title: entry.title, wordCount: record.wordCount, publishedAt });
  });

  writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2) + '\n', 'utf8');

  console.log(`Appended ${added.length} articles:`);
  for (const a of added) {
    console.log(`  • ${a.slug} (${a.wordCount} words, ${a.publishedAt})`);
  }

  // --- git commit + push ------------------------------------------------
  const today = new Date().toISOString().slice(0, 10);
  try {
    execSync('git add data/wp-articles.json', { cwd: ROOT, stdio: 'inherit' });
    execSync(
      `git commit -m "Daily articles ${today} (${added.length} posts)"`,
      { cwd: ROOT, stdio: 'inherit' },
    );
    pushWithToken();
    console.log('Pushed to origin/main — Vercel will deploy.');
  } catch (err) {
    console.error('Git operation failed:', err.message);
    process.exit(2);
  }
}

/**
 * Push to origin/main using a Personal Access Token from `.github-token` if
 * the sandbox shell has no stored GitHub credentials.
 *
 * The token file is a single line containing a GitHub PAT (fine-grained token
 * with "Contents: write" on this repo, or a classic token with `repo` scope).
 * It is gitignored and never committed.
 *
 * If no token file exists, falls back to plain `git push` (which will work in
 * a normal terminal where the user's credential helper is already configured).
 */
function pushWithToken() {
  const tokenPath = join(ROOT, '.github-token');

  if (!existsSync(tokenPath)) {
    // No token — assume the caller has credentials already (e.g. macOS keychain,
    // gh CLI, SSH). Use the configured remote unmodified.
    execSync('git push origin main', { cwd: ROOT, stdio: 'inherit' });
    return;
  }

  const token = readFileSync(tokenPath, 'utf8').trim();
  if (!token) {
    throw new Error(`.github-token exists but is empty: ${tokenPath}`);
  }

  // Read the existing remote so we can derive the owner/repo without hardcoding.
  const remoteUrl = execSync('git remote get-url origin', { cwd: ROOT })
    .toString()
    .trim();
  // Accept https://github.com/owner/repo(.git) or git@github.com:owner/repo(.git)
  const match = remoteUrl.match(/github\.com[:/]+([^/]+)\/([^/.]+)(?:\.git)?$/);
  if (!match) {
    throw new Error(`Cannot parse GitHub remote URL: ${remoteUrl}`);
  }
  const [, owner, repo] = match;
  const authedUrl = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;

  // Push to the authenticated URL without persisting it to the repo config.
  // `git push <url>` is a one-shot — origin's stored URL stays clean.
  execSync(`git push ${authedUrl} main`, {
    cwd: ROOT,
    stdio: ['ignore', 'inherit', 'inherit'],
  });
}

main();
