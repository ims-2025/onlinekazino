/**
 * Typed accessors for the multi-operator "best for X" round-up data
 * (data/best-for.json). Rendered at /labakie/ and /labakie/[slug]/.
 */

import bestForJson from '@/data/best-for.json';

export interface BestForWinner {
  operator: string;
  rank: number;
  headline: string;
  reason: string;
}

export interface BestForRound {
  title: string;
  metaDescription: string;
  intro: string;
  criteria: string[];
  winners: BestForWinner[];
  verdict: string;
}

interface BestForFile {
  _meta: { description: string; lastEdited: string };
  rounds: Record<string, BestForRound>;
}

const data = bestForJson as unknown as BestForFile;

export function getBestForRound(slug: string): BestForRound | undefined {
  return data.rounds[slug];
}

export function getBestForSlugs(): string[] {
  return Object.keys(data.rounds);
}

export function getAllBestForRounds(): Array<{ slug: string; round: BestForRound }> {
  return Object.entries(data.rounds).map(([slug, round]) => ({ slug, round }));
}
