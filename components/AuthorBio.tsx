import Link from 'next/link';
import { SITE } from '@/lib/site';

/**
 * Author callout block. Visible authorship is one of the bigger E-E-A-T
 * delta levers for YMYL content — Google's "Reviews update" rewards it
 * specifically.
 */
export function AuthorBio({ slug }: { slug: string }) {
  const author = SITE.authors[slug as keyof typeof SITE.authors];
  if (!author) return null;
  return (
    <aside
      className="not-prose flex items-start gap-4 rounded-lg border border-line bg-bone p-5 shadow-soft"
      aria-label={`Autors: ${author.name}`}
    >
      <span
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-carmine-500/10 font-serif text-lg font-semibold text-carmine-600"
      >
        {initials(author.name)}
      </span>
      <div className="text-sm leading-relaxed">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <Link href={author.url} className="font-semibold text-ink hover:text-carmine-700">
            {author.name}
          </Link>
          <span className="text-2xs uppercase tracking-widest2 text-ink-mute">
            {author.role}
          </span>
        </div>
        <p className="mt-1.5 text-ink-soft">{author.bio}</p>
      </div>
    </aside>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}
