/**
 * Schema.org JSON-LD generators. Every template renders one or more of these
 * inside a <script type="application/ld+json"> tag — see components/JsonLd.tsx.
 *
 * We err on the side of *more* structured data: Google rewards detailed,
 * accurate JSON-LD on YMYL/review sites with rich SERP snippets.
 */

import { SITE } from './site';
import type { Operator, Article } from './types';

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.organization.name,
    legalName: SITE.organization.legalName,
    url: SITE.url,
    logo: SITE.publisher.logo,
    foundingDate: SITE.organization.foundingDate,
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE.organization.address.addressCountry,
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/meklet/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.href, SITE.url).toString(),
    })),
  };
}

/**
 * Operator review JSON-LD. Casino isn't an official Schema.org type, so we
 * attach `additionalType` and use the generic `Organization` envelope, which
 * Google's review parser accepts.
 */
export function operatorReviewSchema(operator: Operator, authorSlug: string): JsonLd {
  const author = SITE.authors[authorSlug as keyof typeof SITE.authors];
  const url = `${SITE.url}/kazino/${operator.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    inLanguage: SITE.locale,
    url,
    itemReviewed: {
      '@type': 'Organization',
      additionalType: 'https://schema.org/Casino',
      name: operator.name,
      url,
      ...(operator.featuredImage && { image: operator.featuredImage }),
      ...(operator.facets.established && {
        foundingDate: operator.facets.established,
      }),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: operator.ratings.overall ?? 0,
      bestRating: 5,
      worstRating: 0,
    },
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: author.url,
        }
      : undefined,
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: operator.publishedAt,
    dateModified: operator.modifiedAt,
  };
}

export function aggregateRatingSchema(operator: Operator): JsonLd | null {
  const r = operator.ratings.overall;
  if (r === undefined) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: r,
    bestRating: 5,
    worstRating: 0,
    ratingCount: 1,
    reviewCount: 1,
  };
}

export function articleSchema(article: Article, authorSlug?: string): JsonLd {
  const url = `${SITE.url}/raksti/${article.slug}/`;
  const author = authorSlug
    ? SITE.authors[authorSlug as keyof typeof SITE.authors]
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    inLanguage: SITE.locale,
    url,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    image: article.featuredImage ?? undefined,
    author: author
      ? { '@type': 'Person', name: author.name, url: author.url }
      : { '@type': 'Organization', name: SITE.name },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    description: article.excerpt,
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: new URL(it.url, SITE.url).toString(),
    })),
  };
}

export function personSchema(slug: string): JsonLd | null {
  const author = SITE.authors[slug as keyof typeof SITE.authors];
  if (!author) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: author.url,
    worksFor: { '@id': ORGANIZATION_ID },
  };
}
