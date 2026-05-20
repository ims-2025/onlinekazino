import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { OperatorLogo } from '@/components/OperatorLogo';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getAllComparisons } from '@/lib/comparisons';
import { getOperatorBySlug } from '@/lib/data';

export const metadata = buildMetadata({
  title: 'Operatoru salīdzinājumi — Tiešās dueles starp LV kazino',
  description: trimDescription(
    'Optibet vs OlyBet, Klondaika vs Optibet un citi tiešie salīdzinājumi. Bonusi, izņemšanas ātrumi, spēļu klāsts — visas dimensijas blakus.',
  ),
  path: '/salidzinajumi/',
  og: { eyebrow: 'Tiešie salīdzinājumi' },
});

export default function ComparisonsIndexPage() {
  const comparisons = getAllComparisons();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Salīdzinājumi', href: '/salidzinajumi/' },
          ]),
          itemListSchema(
            comparisons.map((c) => ({ name: c.title, url: `/salidzinajumi/${c.slug}/` })),
          ),
        ]}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/salidzinajumi/', label: 'Salīdzinājumi' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Tiešie salīdzinājumi</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Operatoru salīdzinājumi
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Divi LV operatori, piecas dimensijas, viens verdikts. Šie ir
              biežākie izvēles dilemmas, par kuriem mums uzdod jautājumus —
              kuru izvēlēties starp diviem konkrētiem zīmoliem.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {comparisons.map((c) => {
            const left = getOperatorBySlug(c.left);
            const right = getOperatorBySlug(c.right);
            if (!left || !right) return null;
            return (
              <article
                key={c.slug}
                className="flex flex-col gap-5 rounded-2xl border border-line bg-bone p-7 shadow-soft transition hover:border-carmine-200 hover:shadow-lift md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <OperatorLogo operator={left} size={48} />
                    <span className="font-serif text-2xl font-bold tracking-tightish text-ink-mute">vs</span>
                    <OperatorLogo operator={right} size={48} />
                  </div>
                  {c.winner !== 'tie' && (
                    <span className="rounded-full border border-carmine-300 bg-carmine-500/10 px-3 py-1 text-2xs font-semibold uppercase tracking-widest2 text-carmine-700">
                      Uzvar {c.winner === c.left ? left.name : right.name}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-xl font-semibold leading-snug tracking-tightish text-ink md:text-2xl">
                  <Link href={`/salidzinajumi/${c.slug}/`} className="hover:text-carmine-700">
                    {c.title}
                  </Link>
                </h2>

                <p className="text-sm leading-relaxed text-ink-soft line-clamp-3">
                  {c.intro}
                </p>

                <Link
                  href={`/salidzinajumi/${c.slug}/`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
                >
                  Skatīt pilno salīdzinājumu
                  <span aria-hidden>→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
