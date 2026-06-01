import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getAllBestForRounds } from '@/lib/bestFor';

export const metadata = buildMetadata({
  title: 'Labākie online kazino Latvijā pēc kritērijiem 2026',
  description: trimDescription(
    'Atrodiet labāko Latvijas online kazino jūsu spēles stilam. High roller, slotu, live kazino, ātrāko izņemšanu — operatoru ranžējumi pa konkrētām kategorijām.',
  ),
  path: '/labakie/',
  og: { eyebrow: 'Labākie operatori' },
});

export default function BestForHubPage() {
  const rounds = getAllBestForRounds();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Labākie operatori', href: '/labakie/' },
          ]),
          itemListSchema(
            rounds.map(({ slug, round }) => ({
              name: round.title,
              url: `/labakie/${slug}/`,
            })),
          ),
        ]}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/labakie/', label: 'Labākie operatori' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Operatoru ranžējumi pēc kritērijiem</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Labākie LV operatori jūsu spēles stilam
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Nav viena „labākā” online kazino — labākā izvēle ir atkarīga
              no jūsu spēles stila, prioritātēm un budžeta. Mēs ranžējam
              IAUI licencētus operatorus pa konkrētām kategorijām, lai
              palīdzētu atrast operatoru, kurš atbilst tieši jūsu vajadzībām.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {rounds.map(({ slug, round }, i) => (
            <Link
              key={slug}
              href={`/labakie/${slug}/`}
              className="group flex flex-col gap-4 rounded-2xl border border-line bg-bone p-7 shadow-soft transition hover:border-carmine-200 hover:shadow-lift md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xs uppercase tracking-widest2 text-ink-mute">
                  / {String(i + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full border border-line bg-paper px-3 py-1 text-2xs font-semibold uppercase tracking-widest2 text-ink-mute">
                  {round.winners.length} operatori
                </span>
              </div>
              <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tightish text-ink group-hover:text-carmine-700 md:text-3xl">
                {round.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft line-clamp-4">
                {round.intro}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-carmine-600">
                Skatīt ranžējumu
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-soft">
        <div className="mx-auto max-w-wrap px-4 py-12 lg:px-8">
          <div className="max-w-prose">
            <p className="eyebrow">Saistīts</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
              Citi veidi salīdzināt operatorus
            </h2>
            <ul className="mt-5 space-y-2 text-base">
              <li>
                <Link
                  href="/salidzinajumi/"
                  className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
                >
                  Tiešie 1-pret-1 operatoru salīdzinājumi
                </Link>
              </li>
              <li>
                <Link
                  href="/kazino/"
                  className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
                >
                  Visi IAUI licencētie operatori
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologija/"
                  className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
                >
                  Mūsu vērtēšanas metodoloģija
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
