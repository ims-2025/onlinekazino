/**
 * Data accessors. Reads the JSON data files at module-load time so each lookup
 * is a synchronous array filter — fine because everything runs at build time.
 */

import operatorsJson from '@/data/operators.json';
import articlesJson from '@/data/wp-articles.json';
import pagesJson from '@/data/wp-pages-processed.json';
import affiliatesJson from '@/data/affiliates.json';
import type { Operator, Article, Page, Affiliate } from './types';

const operators = operatorsJson as unknown as Operator[];
const articles = articlesJson as unknown as Article[];
const pages = pagesJson as unknown as Page[];
const affiliates = affiliatesJson as unknown as Affiliate[];

// ---------------------------------------------------------------------------
// Operators
// ---------------------------------------------------------------------------

/** Real LV operators (Mercury demo entries excluded). */
export function getOperators(): Operator[] {
  return operators
    .filter((o) => o.keep)
    .sort((a, b) => (b.ratings.overall ?? 0) - (a.ratings.overall ?? 0));
}

export function getOperatorSlugs(): string[] {
  return getOperators().map((o) => o.slug);
}

export function getOperatorBySlug(slug: string): Operator | undefined {
  return operators.find((o) => o.slug === slug && o.keep);
}

/** Top N operators by overall rating, used on homepage. */
export function getTopOperators(n = 10): Operator[] {
  return getOperators().slice(0, n);
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

/** Articles eligible to render in the new site: published OR annab drafts. */
export function getArticles(): Article[] {
  return articles
    .filter((a) => a.isPublished || a.promoteDraft)
    .sort((a, b) =>
      (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
    );
}

export function getArticleSlugs(): string[] {
  return getArticles().map((a) => a.slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(
    (a) => a.slug === slug && (a.isPublished || a.promoteDraft),
  );
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getArticles().filter((a) =>
    a.categories.some((c) => c.slug === categorySlug),
  );
}

export function getArticleCategories(): ArticleCategoryWithCount[] {
  const counts = new Map<string, ArticleCategoryWithCount>();
  for (const a of getArticles()) {
    for (const c of a.categories) {
      const existing = counts.get(c.slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(c.slug, { slug: c.slug, label: c.label, count: 1 });
      }
    }
  }
  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

export interface ArticleCategoryWithCount {
  slug: string;
  label: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export function getPageBySlug(slug: string): Page | undefined {
  return pages.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Affiliates
// ---------------------------------------------------------------------------

export function getAffiliateByOperatorSlug(
  slug: string,
): Affiliate | undefined {
  return affiliates.find((a) => a.operatorSlug === slug);
}
