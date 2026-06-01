/**
 * Typed accessors for regulation pages (data/regulations.json).
 * Rendered at /regulejumi/ and /regulejumi/[slug]/.
 */

import regulationsJson from '@/data/regulations.json';

export interface RegulationSection {
  heading: string;
  body: string;
}

export interface RegulationFaq {
  q: string;
  a: string;
}

export interface RegulationPage {
  title: string;
  metaDescription: string;
  lede: string;
  sections: RegulationSection[];
  faq: RegulationFaq[];
}

interface RegulationsFile {
  _meta: { description: string; primarySource: string; lastVerified: string };
  pages: Record<string, RegulationPage>;
}

const data = regulationsJson as unknown as RegulationsFile;

export function getRegulationPage(slug: string): RegulationPage | undefined {
  return data.pages[slug];
}

export function getRegulationSlugs(): string[] {
  return Object.keys(data.pages);
}

export function getAllRegulationPages(): Array<{ slug: string; page: RegulationPage }> {
  return Object.entries(data.pages).map(([slug, page]) => ({ slug, page }));
}

export function getRegulationsMeta(): RegulationsFile['_meta'] {
  return data._meta;
}
