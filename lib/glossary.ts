/**
 * Typed accessors for the gambling glossary (data/glossary.json).
 * Rendered at /glosarijs/ and /glosarijs/[topic]/.
 */

import glossaryJson from '@/data/glossary.json';

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface GlossaryTopic {
  title: string;
  metaDescription: string;
  lede: string;
  terms: GlossaryTerm[];
}

interface GlossaryFile {
  _meta: { description: string; lastEdited: string };
  topics: Record<string, GlossaryTopic>;
}

const data = glossaryJson as unknown as GlossaryFile;

export function getGlossaryTopic(slug: string): GlossaryTopic | undefined {
  return data.topics[slug];
}

export function getGlossarySlugs(): string[] {
  return Object.keys(data.topics);
}

export function getAllGlossaryTopics(): Array<{ slug: string; topic: GlossaryTopic }> {
  return Object.entries(data.topics).map(([slug, topic]) => ({ slug, topic }));
}
