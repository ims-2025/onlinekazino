import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { OperatorLogo } from '@/components/OperatorLogo';
import { RatingStars } from '@/components/RatingStars';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getBestForRound, getBestForSlugs } from '@/lib/bestFor';
import { getOperatorBySlug } from '@/lib/data';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getBestForSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const r = getBestForRound(params.slug);
  if (!r) return {};
  return buildMetadata({
    title: r.title,
    description: trimDescription(r.metaDescription),
    path: `/labakie/${params.slug}/`,
    type: 'article',
    og: { eyebrow: 'Labākie operatori' },
  });
}

export default function BestForPage({ params }: Props) {
  const r = getBestForRound(params.slug);
  if (!r) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Labākie operatori', href: '/labakie/' },
            { name: r.title, href: `/labakie/${params.slug}/` },
          ]),
          itemListSchema(
            r.winners
              .map((w) => {
                const op = getOperatorBySlug(w.operator);
                return op ? { name: op.name, url: `/kazino/${op.slug}/` } : null;
              })
              .filter((x): x is { name: string; url: string } => x !== null),
          ),
        ]}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/labakie/', label: 'Labākie operatori' },
            { href: `/labakie/${params.slug}/`, label: r.title },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Labākie operatori · ranžējums</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            {r.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {r.intro}
          </p>
        </header>

        {/* Criteria block */}
        <section className="mt-12 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Kā mēs vērtējam</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
            Pieci kritēriji šim salīdzinājumam
          </h2>
          <ol className="mt-6 space-y-3 text-base leading-relaxed text-ink-soft">
            {r.criteria.map((c, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-2xs font-semibold uppercase tracking-widest2 text-carmine-700 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Ranked operators */}
        <section className="mt-14">
          <p className="eyebrow">Mūsu ranžējums</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl">
            Operatoru saraksts
          </h2>
          <div className="mt-8 space-y-6">
            {r.winners.map((w) => {
              const op = getOperatorBySlug(w.operator);
              if (!op) return null;
              return (
                <article
                  key={w.operator}
                  className="relative grid gap-5 rounded-2xl border border-line bg-bone p-7 shadow-soft md:grid-cols-[auto_1fr_auto] md:items-start md:p-8"
                >
                  <div className="flex items-center gap-5 md:flex-col md:items-start">
                    <span className="font-mono text-3xl font-bold text-carmine-600">
                      {String(w.rank).padStart(2, '0')}
                    </span>
                    <OperatorLogo operator={op} size={72} />
                  </div>

                  <div className="md:pl-2">
                    <h3 className="font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
                      <Link
                        href={`/kazino/${op.slug}/`}
                        className="hover:text-carmine-700"
                      >
                        {op.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-widest2 text-carmine-700">
                      {w.headline}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-ink-soft">
                      {w.reason}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <RatingStars value={op.ratings.overall ?? 0} />
                      <span className="text-sm text-ink-mute">
                        {(op.ratings.overall ?? 0).toFixed(2)} / 5
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    <Link
                      href={`/go/${op.slug}/`}
                      rel="sponsored nofollow"
                      className="inline-flex items-center justify-center rounded-md bg-carmine-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-carmine-600"
                    >
                      Apmeklēt
                    </Link>
                    <Link
                      href={`/kazino/${op.slug}/`}
                      className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:decoration-carmine-500"
                    >
                      Pilns apskats →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Verdict */}
        <section className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Redakcijas verdikts</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
            Ko mēs iesakām
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            {r.verdict}
          </p>
        </section>

        {/* Disclosure */}
        <section className="mt-12 rounded-xl border border-line bg-paper-soft p-6 text-xs leading-relaxed text-ink-mute md:p-7">
          <p>
            <strong className="text-ink">Caurspīdības atruna:</strong>{' '}
            OnlineKazino.com saņem komisiju, kad lasītāji reģistrējas operatoros
            caur mūsu saitēm. Komisija neietekmē mūsu ranžējumu — vērtējumi
            balstīti uz vienotu publisku metodoloģiju. 18+. Spēlējiet
            atbildīgi.{' '}
            <Link
              href="/atbildiga-spele/"
              className="underline decoration-line hover:decoration-carmine-500"
            >
              Atbildīgas spēles ceļvedis
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}
