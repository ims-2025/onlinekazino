import type { MetadataRoute } from 'next';

import {
  getOperators,
  getArticles,
  getArticleCategories,
} from '@/lib/data';
import { getTopicSlugs } from '@/lib/topics';
import { getComparisonSlugs } from '@/lib/comparisons';
import { getCitySlugs } from '@/lib/cities';
import { getBestForSlugs } from '@/lib/bestFor';
import { getRegulationSlugs } from '@/lib/regulations';
import { getGlossarySlugs } from '@/lib/glossary';
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
    { url: `${base}/labakie/`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/regulejumi/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/glosarijs/`,                lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/sauszemes-kazino/`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/sauszemes-kazino/online-vs-sauszemes/`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/sauszemes-kazino/turistiem/`,             lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/sauszemes-kazino/etikete/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/sauszemes-kazino/spelu-zales/`,           lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
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

  // Only emit operators that have a non-empty, slug-shaped slug — entries
  // pointing at 4XX URLs get penalised in Ahrefs and ignored by Google.
  const operatorPages: MetadataRoute.Sitemap = getOperators()
    .filter((op) => op.slug && /^[a-z0-9-]+$/.test(op.slug))
    .map((op) => ({
      url: `${base}/kazino/${op.slug}/`,
      lastModified: safeDate(op.modifiedAt, now),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }));

  // Only published articles with valid slugs. Drafts and anything with a
  // malformed slug must never reach the sitemap.
  const articlePages: MetadataRoute.Sitemap = getArticles()
    .filter(
      (a) =>
        a.isPublished !== false &&
        a.status !== 'draft' &&
        a.slug &&
        /^[a-z0-9-]+$/.test(a.slug),
    )
    .map((a) => ({
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

  const cityPages: MetadataRoute.Sitemap = getCitySlugs().map((slug) => ({
    url: `${base}/sauszemes-kazino/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const bestForPages: MetadataRoute.Sitemap = getBestForSlugs().map((slug) => ({
    url: `${base}/labakie/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const regulationPages: MetadataRoute.Sitemap = getRegulationSlugs().map((slug) => ({
    url: `${base}/regulejumi/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const glossaryPages: MetadataRoute.Sitemap = getGlossarySlugs().map((slug) => ({
    url: `${base}/glosarijs/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }));

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
    ...cityPages,
    ...bestForPages,
    ...regulationPages,
    ...glossaryPages,
    ...comparisonPages,
  ];
}
