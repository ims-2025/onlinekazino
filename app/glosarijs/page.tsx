import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getAllGlossaryTopics } from '@/lib/glossary';

export const metadata = buildMetadata({
  title: 'Online kazino glosārijs latviski 2026',
  description: trimDescription(
    'Online kazino terminoloģijas glosārijs latviski. Slotu termini, bonusi, galda spēles, maksājumi, live kazino, atbildīga spēle — saprotami iesācējiem un pieredzes spēlētājiem.',
  ),
  path: '/glosarijs/',
  og: { eyebrow: 'Glosārijs' },
});

export default function GlossaryHubPage() {
  const topics = getAllGlossaryTopics();
  const totalTerms = topics.reduce((n, t) => n + t.topic.terms.length, 0);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Glosārijs', href: '/glosarijs/' },
          ]),
          itemListSchema(
            topics.map(({ slug, topic }) => ({
              name: topic.title,
              url: `/glosarijs/${slug}/`,
            })),
          ),
        ]}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/glosarijs/', label: 'Glosārijs' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">
              {totalTerms} termini · {topics.length} tematiskie segmenti
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Online kazino glosārijs latviski
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Online kazino terminoloģija latviešu valodā — sākot no slotu RTP
              un Megaways mehānikas, līdz blackjack pamata stratēģijai, KYC
              procedūrām un atbildīgas spēles instrumentiem. Šis glosārijs ir
              ceļvedis gan iesācējiem, gan pieredzes spēlētājiem.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {topics.map(({ slug, topic }, i) => (
            <Link
              key={slug}
              href={`/glosarijs/${slug}/`}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-bone p-7 shadow-soft transition hover:border-carmine-200 hover:shadow-lift md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xs uppercase tracking-widest2 text-ink-mute">
                  / {String(i + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full border border-line bg-paper px-3 py-1 text-2xs font-semibold uppercase tracking-widest2 text-ink-mute">
                  {topic.terms.length} termini
                </span>
              </div>
              <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tightish text-ink group-hover:text-carmine-700 md:text-3xl">
                {topic.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft line-clamp-3">
                {topic.lede}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-carmine-600">
                Skatīt terminus
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
