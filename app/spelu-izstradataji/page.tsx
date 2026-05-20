import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getTopicsByHub } from '@/lib/topics';

export const metadata = buildMetadata({
  title: 'Spēļu izstrādātāji Latvijas online kazino — Synot, NetEnt, EGT',
  description: trimDescription(
    'Padziļināts ceļvedis par populārākajiem spēļu izstrādātājiem Latvijas IAUI licencētos kazino — Synot, NetEnt, EGT, Pragmatic Play, Microgaming, Evolution.',
  ),
  path: '/spelu-izstradataji/',
});

export default function ProvidersPage() {
  const providers = getTopicsByHub('spelu-izstradataji');
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Spēļu izstrādātāji', href: '/spelu-izstradataji/' },
        ])}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/spelu-izstradataji/', label: 'Spēļu izstrādātāji' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Studio profili</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Spēļu izstrādātāji
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Kuri studio dominē Latvijas tirgū un kāpēc — Synot (vienīgais
              vietējais), starptautiskie giganti NetEnt, EGT, Pragmatic Play,
              Microgaming, un live kazino līderis Evolution.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <Link
              key={p.slug}
              href={`/spelu-izstradataji/${p.slug}/`}
              className="group flex flex-col gap-3 bg-bone p-7 transition hover:bg-paper lg:p-8"
            >
              <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink group-hover:text-carmine-700">
                {p.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft">{p.lede}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-2xs font-semibold uppercase tracking-widest2 text-carmine-600">
                Profils
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
