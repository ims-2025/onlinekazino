/**
 * Topic data accessor. Used by the dynamic [slug] routes under /speles,
 * /maksajumi, /bonusi, /atbildiga-spele, and /spelu-izstradataji.
 *
 * Each hub maps slug → { title, lede, sections[] }. Adding a new sub-page
 * is a one-line edit in data/topics.json.
 */
import topicsJson from '@/data/topics.json';

export type TopicHub =
  | 'speles'
  | 'maksajumi'
  | 'bonusi'
  | 'atbildiga-spele'
  | 'spelu-izstradataji';

export interface TopicSection {
  h: string;
  p: string;
}

export interface Topic {
  title: string;
  lede: string;
  sections?: TopicSection[];
}

const topics = topicsJson as Record<TopicHub, Record<string, Topic>>;

export function getTopic(hub: TopicHub, slug: string): Topic | undefined {
  return topics[hub]?.[slug];
}

export function getTopicSlugs(hub: TopicHub): string[] {
  return Object.keys(topics[hub] ?? {});
}

export function getTopicsByHub(hub: TopicHub): Array<{ slug: string } & Topic> {
  const entries = topics[hub] ?? {};
  return Object.entries(entries).map(([slug, t]) => ({ slug, ...t }));
}
