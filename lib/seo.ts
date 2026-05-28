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
  /** Inputs to the dynamic OG renderer at `/og`. Ignored if `image` is set. */
  og?: {
    eyebrow?: string;
    rating?: string | number;
    meta?: string;
  };
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

/**
 * Build the dynamic OG image URL by passing title + optional eyebrow/rating
 * to `/og`. Resolved against SITE.url so social crawlers see an absolute URL.
 */
function buildOgUrl(input: SeoInput): string {
  const params = new URLSearchParams({ title: input.title });
  if (input.og?.eyebrow) params.set('eyebrow', input.og.eyebrow);
  if (input.og?.rating !== undefined) params.set('rating', String(input.og.rating));
  if (input.og?.meta) params.set('meta', input.og.meta);
  return `${SITE.url}/og?${params.toString()}`;
}

/**
 * Truncate a title to fit Google's ~60-char `<title>` display window without
 * cutting a word mid-syllable. We deliberately keep H1 (rendered separately in
 * the page template) untouched — only the <title>, OG title, and Twitter card
 * use the trimmed version.
 */
export function trimTitle(s: string, max = 60): string {
  const flat = s.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

export function buildMetadata(input: SeoInput): Metadata {
  const url = new URL(input.path, SITE.url).toString();
  const ogImage = input.image ?? buildOgUrl(input);
  const metaTitle = trimTitle(input.title);

  return {
    title: metaTitle,
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
      title: metaTitle,
      description: input.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
      ...(input.authors && { authors: input.authors }),
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      title: metaTitle,
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
