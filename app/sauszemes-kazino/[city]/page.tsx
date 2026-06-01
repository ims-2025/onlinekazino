import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getCityBySlug, getCitySlugs, getCitiesMeta } from '@/lib/cities';

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props) {
  const c = getCityBySlug(params.city);
  if (!c) return {};
  return buildMetadata({
    // Compact title: "Sauszemes kazino {Locative} — IAUI ceļvedis 2026"
    // — kept under 55 chars for every Latvian locative form so Google
    // never truncates in the SERP and trimTitle() never has to cut.
    title: `Sauszemes kazino ${c.nameLocative} — IAUI ceļvedis 2026`,
    description: trimDescription(c.lede),
    path: `/sauszemes-kazino/${params.city}/`,
    type: 'article',
    og: { eyebrow: `Sauszemes kazino · ${c.name}` },
  });
}

export default function CityHubPage({ params }: Props) {
  const c = getCityBySlug(params.city);
  if (!c) notFound();
  const meta = getCitiesMeta();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Sauszemes kazino', href: '/sauszemes-kazino/' },
            { name: c.name, href: `/sauszemes-kazino/${c.slug}/` },
          ]),
          faqSchema(c.faq),
        ]}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/sauszemes-kazino/', label: 'Sauszemes kazino' },
            { href: `/sauszemes-kazino/${c.slug}/`, label: c.name },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Sauszemes kazino · {c.regionLabel}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tightish text-ink md:text-6xl">
            Sauszemes kazino {c.nameLocative}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {c.lede}
          </p>
        </header>

        {/* Quick facts strip */}
        <section className="mt-10 grid gap-4 rounded-2xl border border-line bg-paper-soft p-6 md:grid-cols-4 md:p-7">
          <Fact label="Iedzīvotāji" value={c.population.toLocaleString('lv-LV')} />
          <Fact label="Reģions" value={c.regionLabel} />
          <Fact label="Sauszemes kazino" value={c.venueOverview.casinoCount} />
          <Fact label="Spēļu zāles" value={c.venueOverview.slotHallCount} />
        </section>

        {/* Intro paragraphs */}
        <section className="prose-editorial mt-10 max-w-prose">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* Dominant operator panel */}
        <section className="mt-12 rounded-2xl border border-line bg-bone p-7 shadow-soft">
          <p className="eyebrow">Dominējošais operators</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
            {c.venueOverview.dominantOperator}
          </h2>
          {c.venueOverview.secondaryOperators.length > 0 && (
            <p className="mt-4 text-sm text-ink-soft">
              <strong className="text-ink">Citi licencētie operatori:</strong>{' '}
              {c.venueOverview.secondaryOperators.join(', ')}
            </p>
          )}
          {c.venueOverview.districts.length > 0 && (
            <p className="mt-2 text-sm text-ink-soft">
              <strong className="text-ink">Galvenās zonas:</strong>{' '}
              {c.venueOverview.districts.join(', ')}
            </p>
          )}
        </section>

        {/* Body sections */}
        {c.sections.map((s, i) => (
          <section key={i} className="mt-12 max-w-prose">
            <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
              {s.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{s.body}</p>
            {s.links && s.links.length > 0 && (
              <ul className="mt-5 space-y-2 text-sm">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* FAQ */}
        <section className="mt-14 max-w-prose">
          <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
            Bieži uzdotie jautājumi
          </h2>
          <div className="mt-6">
            <Faq items={c.faq} />
          </div>
        </section>

        {/* Source + disclosure */}
        <section className="mt-14 rounded-xl border border-line bg-paper-soft p-6 text-xs leading-relaxed text-ink-mute md:p-7">
          <p>
            <strong className="text-ink">Avoti:</strong> Sauszemes kazino un
            spēļu zāļu informācija balstīta uz{' '}
            <a
              href={meta.iauiSource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line hover:decoration-carmine-500"
            >
              IAUI publisko licenciātu reģistru
            </a>{' '}
            (pēdējoreiz pārbaudīts: {meta.lastVerified}). Operatoru darba laiki
            un konkrētas adreses var mainīties — pirms apmeklējuma pārbaudiet
            operatora oficiālajā lapā.
          </p>
          <p className="mt-3">
            <strong className="text-ink">Caurspīdības atruna:</strong>{' '}
            OnlineKazino.com saņem komisiju, kad lasītāji reģistrējas online
            operatoros caur mūsu saitēm. Sauszemes kazino apraksti nav
            komerciāli — mūsu klasifikācija balstās uz publiski pieejamo
            informāciju. 18+. Spēlējiet atbildīgi.{' '}
            <Link href="/atbildiga-spele/" className="underline decoration-line hover:decoration-carmine-500">
              Atbildīgas spēles ceļvedis
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs font-semibold uppercase tracking-widest2 text-ink-mute">
        {label}
      </p>
      <p className="mt-1 font-serif text-xl font-semibold text-ink">{value}</p>
    </div>
  );
}
