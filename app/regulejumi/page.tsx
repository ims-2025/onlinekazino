import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getAllRegulationPages } from '@/lib/regulations';

export const metadata = buildMetadata({
  title: 'Latvijas azartspēļu regulējumu ceļvedis 2026',
  description: trimDescription(
    'Latvijas azartspēļu regulējumu ceļvedis — IAUI, Azartspēļu likums, nodokļi laimestiem, KYC un AML procedūras, ES regulējumu salīdzinājums.',
  ),
  path: '/regulejumi/',
  og: { eyebrow: 'Regulējumi' },
});

export default function RegulationsHubPage() {
  const pages = getAllRegulationPages();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Regulējumi', href: '/regulejumi/' },
          ]),
          itemListSchema(
            pages.map(({ slug, page }) => ({
              name: page.title,
              url: `/regulejumi/${slug}/`,
            })),
          ),
        ]}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/regulejumi/', label: 'Regulējumi' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Latvijas regulējumu ceļvedis</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Azartspēļu regulējumi un likumdošana
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Detalizēti ceļvedi par Latvijas azartspēļu likumdošanu — IAUI
              kā regulators, Azartspēļu un izložu likums, nodokļi laimestiem,
              KYC un AML procedūras, kā arī ES jurisdikciju salīdzinājums.
              Šie raksti ir saraksti spēlētājiem, ne juridiskas konsultācijas
              — specifiskos jautājumos sazinieties ar IAUI vai kvalificētu
              juristu.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {pages.map(({ slug, page }, i) => (
            <Link
              key={slug}
              href={`/regulejumi/${slug}/`}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-bone p-7 shadow-soft transition hover:border-carmine-200 hover:shadow-lift md:p-8"
            >
              <span className="font-mono text-2xs uppercase tracking-widest2 text-ink-mute">
                / {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tightish text-ink group-hover:text-carmine-700 md:text-3xl">
                {page.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft line-clamp-4">
                {page.lede}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-carmine-600">
                Lasīt
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
