/**
 * Metadata helpers — keep all <head> tags in one place so we can audit canonicals,
 * OG, Twitter, hreflang and language consistently.
 */

import type { Metadata } from 'next';
import { SITE } from './site';

export interface SeoInput {
  title: string;
  description: string;
  path: string; // canonical path beginning with `/`
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

export function buildMetadata(input: SeoInput): Metadata {
  const url = new URL(input.path, SITE.url).toString();
  const ogImage =
    input.image ??
    `${SITE.url}/og/default.png`; // generated at build time, fallback included

  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: {
        'lv-LV': url,
      },
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: input.type ?? 'website',
      locale: 'lv_LV',
      url,
      siteName: SITE.name,
      title: input.title,
      description: input.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
      ...(input.authors && { authors: input.authors }),
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}

/** Truncate a description to fit Google's ~155-char display window. */
export function trimDescription(s: string, max = 155): string {
  const flat = s.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}
