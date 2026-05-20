import Link from 'next/link';
import type { Operator } from '@/lib/types';
import { RatingStars } from './RatingStars';
import { OperatorLogo } from './OperatorLogo';

/**
 * Operator card on the homepage / `/kazino` index.
 * Editorial layout: rank numeral, name in serif, rating, bonus highlight,
 * and two CTAs (outline review, filled affiliate). Reads as a guide entry,
 * not a casino-lobby tile.
 */
interface Props {
  operator: Operator;
  position?: number;
}

export function OperatorRow({ operator, position }: Props) {
  const reviewHref = `/kazino/${operator.slug}/`;
  const goHref = `/go/${operator.slug}/`;
  const bonus = operator.bonus.shortDesc || 'Apskatīt aktuālo welcome bonusu';

  return (
    <article className="group relative grid items-center gap-5 rounded-xl border border-line bg-bone p-5 shadow-soft transition hover:border-carmine-200 hover:shadow-lift md:grid-cols-[auto,1.4fr,1.6fr,auto] md:gap-7 md:p-6">
      {/* Rank + logo + name ------------------------------------------ */}
      <div className="flex items-center gap-4">
        {position !== undefined && (
          <span
            aria-hidden
            className="hidden font-mono text-xs font-semibold tracking-widest2 text-ink-mute md:block"
          >
            {position.toString().padStart(2, '0')}
          </span>
        )}
        <OperatorLogo operator={operator} size={56} />
        <div className="min-w-0">
          <Link
            href={reviewHref}
            className="font-serif text-xl font-semibold tracking-tightish text-ink hover:text-carmine-700 md:text-2xl"
          >
            {operator.name}
          </Link>
          {operator.facets.licences[0] && (
            <p className="mt-0.5 text-xs text-ink-mute">
              Licence: {operator.facets.licences[0]}
            </p>
          )}
        </div>
      </div>

      {/* Rating ------------------------------------------------------ */}
      <div className="flex flex-col gap-1.5 border-l border-line/70 pl-5 md:border-l">
        <span className="eyebrow">Mūsu vērtējums</span>
        <RatingStars value={operator.ratings.overall ?? 0} />
        <span className="text-2xs text-ink-faint">
          Pārbaudīts {operator.modifiedAt ? formatShortDate(operator.modifiedAt) : '2026'}
        </span>
      </div>

      {/* Bonus ------------------------------------------------------- */}
      <div className="flex flex-col gap-1.5 border-l border-line/70 pl-5">
        <span className="eyebrow">Welcome bonuss</span>
        <p
          className="text-sm leading-snug text-ink-soft"
          dangerouslySetInnerHTML={{ __html: bonus }}
        />
        <span className="text-2xs text-ink-faint">
          18+ · Bonusam piemērojami T&C
        </span>
      </div>

      {/* CTAs -------------------------------------------------------- */}
      <div className="flex shrink-0 flex-col gap-2.5">
        <Link
          href={goHref}
          rel="sponsored nofollow"
          className="inline-flex items-center justify-center rounded-md bg-carmine-500 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-carmine-600"
        >
          Apmeklēt
        </Link>
        <Link
          href={reviewHref}
          className="inline-flex items-center justify-center rounded-md border border-line bg-paper px-5 py-2.5 text-sm font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
        >
          Lasīt apskatu
        </Link>
      </div>
    </article>
  );
}

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('lv-LV', { month: 'short', year: 'numeric' }).format(d);
}
