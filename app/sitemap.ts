import type { MetadataRoute } from 'next';

import {
  getOperators,
  getArticles,
  getArticleCategories,
} from '@/lib/data';
import { getTopicSlugs } from '@/lib/topics';
import { getComparisonSlugs } from '@/lib/comparisons';
import { SITE } from '@/lib/site';

/**
 * Safe Date parser. Some WP records (draft posts that were never published)
 * have `0000-00-00 00:00:00` as their modified date, which becomes an Invalid
 * Date — `.toISOString()` then throws RangeError and kills the sitemap build.
 * Fall back to `now` for anything we can't parse cleanly.
 */
function safeDate(input: string | undefined, fallback: Date): Date {
  if (!input) return fallback;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

/**
 * Static sitemap generated at build time. Includes:
 *   - homepage + hub pages + legal pages
 *   - every operator review
 *   - every article + article category page
 *   - every topic page (games, payments, bonus types, RG, providers)
 *
 * Routes here MUST exist as actual pages — Google penalises sitemaps that
 * point at 404s.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, '');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/kazino/`,                   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/bonusi/`,                   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/speles/`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/maksajumi/`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/spelu-izstradataji/`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/salidzinajumi/`,            lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/raksti/`,                   lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${base}/atbildiga-spele/`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/par-mums/`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${base}/autori/`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/autori/aldis-skuja/`,       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/autori/anna-jansons/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/redakcionala-politika/`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${base}/metodologija/`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/kontakti/`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${base}/privatuma-politika/`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/lietosanas-noteikumi/`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/sikdatnes/`,                lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  const operatorPages: MetadataRoute.Sitemap = getOperators().map((op) => ({
    url: `${base}/kazino/${op.slug}/`,
    lastModified: safeDate(op.modifiedAt, now),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const articlePages: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${base}/raksti/${a.slug}/`,
    lastModified: safeDate(a.modifiedAt, now),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = getArticleCategories().map((c) => ({
    url: `${base}/raksti/kategorija/${c.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const topicHubs: Array<{ hub: 'speles' | 'maksajumi' | 'bonusi' | 'atbildiga-spele' | 'spelu-izstradataji'; path: string }> = [
    { hub: 'speles', path: '/speles/' },
    { hub: 'maksajumi', path: '/maksajumi/' },
    { hub: 'bonusi', path: '/bonusi/' },
    { hub: 'atbildiga-spele', path: '/atbildiga-spele/' },
    { hub: 'spelu-izstradataji', path: '/spelu-izstradataji/' },
  ];

  const topicPages: MetadataRoute.Sitemap = topicHubs.flatMap(({ hub, path }) =>
    getTopicSlugs(hub).map((slug) => ({
      url: `${base}${path}${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  );

  const comparisonPages: MetadataRoute.Sitemap = getComparisonSlugs().map((slug) => ({
    url: `${base}/salidzinajumi/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...operatorPages,
    ...articlePages,
    ...categoryPages,
    ...topicPages,
    ...comparisonPages,
  ];
}
