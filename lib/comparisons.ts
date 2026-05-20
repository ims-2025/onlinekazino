/**
 * Comparison data accessor. Each entry pairs two operator slugs with hand-
 * written intro + verdict text. The detail page renders this metadata plus
 * an auto-generated side-by-side table built from operators.json.
 */
import comparisonsJson from '@/data/comparisons.json';

export interface ComparisonRecord {
  left: string;        // operator slug
  right: string;       // operator slug
  title: string;
  intro: string;
  verdict: string;
  winner: string;      // operator slug, or "tie"
}

const data = comparisonsJson as unknown as Record<string, ComparisonRecord | { description: string }> & {
  _meta?: unknown;
};

export function getComparisonSlugs(): string[] {
  return Object.keys(data).filter((k) => k !== '_meta');
}

export function getComparison(slug: string): ComparisonRecord | undefined {
  const entry = data[slug];
  if (!entry || slug === '_meta') return undefined;
  // Type guard: real comparison entries have `left`
  return 'left' in entry ? (entry as ComparisonRecord) : undefined;
}

export function getAllComparisons(): Array<{ slug: string } & ComparisonRecord> {
  return getComparisonSlugs()
    .map((slug) => {
      const c = getComparison(slug);
      return c ? { slug, ...c } : null;
    })
    .filter((x): x is { slug: string } & ComparisonRecord => Boolean(x));
}
