import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { OperatorLogo } from '@/components/OperatorLogo';
import { getOperators } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Online Kazino Bonusi 2026 — Top Welcome Piedāvājumi Latvijā',
  description: trimDescription(
    'Salīdziniet aktuālos welcome bonusus, bezdepozīta piedāvājumus un bezmaksas griezienus IAUI licencētos online kazino. Caurspīdīgs T&C un wagering analīze.',
  ),
  path: '/bonusi/',
});

export default function BonusesPage() {
  const operators = getOperators().filter((op) => op.bonus.shortDesc);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Bonusi', href: '/bonusi/' },
        ])}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/bonusi/', label: 'Bonusi' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Welcome piedāvājumi</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Online kazino bonusi
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Aktuālie welcome bonusi, bezdepozīta piedāvājumi un bezmaksas
              griezieni IAUI licencētos operatoros. Wagering nosacījumi norādīti
              atklāti — bez slēptiem pārsteigumiem.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            {[
              { href: '/bonusi/depozita-bonusi/', label: 'Depozīta bonusi' },
              { href: '/bonusi/bezmaksas-griezieni/', label: 'Bezmaksas griezieni' },
              { href: '/bonusi/bezdepozita/', label: 'Bezdepozīta bonusi' },
              { href: '/bonusi/cashback/', label: 'Cashback' },
              { href: '/bonusi/high-roller/', label: 'High roller' },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-full border border-line bg-bone px-3 py-1.5 text-ink-soft transition hover:border-carmine-300 hover:text-carmine-700"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {operators.map((op) => (
            <article
              key={op.slug}
              className="flex flex-col rounded-2xl border border-line bg-bone p-7 shadow-soft transition hover:border-carmine-200 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <OperatorLogo operator={op} size={44} />
                  <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink">
                    <Link href={`/kazino/${op.slug}/`} className="hover:text-carmine-700">
                      {op.name}
                    </Link>
                  </h2>
                </div>
                <span className="eyebrow">Welcome</span>
              </div>
              <p
                className="mt-4 font-serif text-xl leading-snug tracking-tightish text-ink"
                dangerouslySetInnerHTML={{ __html: op.bonus.shortDesc }}
              />
              {op.bonus.termsDesc && (
                <p
                  className="mt-3 text-xs leading-relaxed text-ink-mute"
                  dangerouslySetInnerHTML={{ __html: op.bonus.termsDesc }}
                />
              )}
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={`/go/${op.slug}/`}
                  rel="sponsored nofollow"
                  className="inline-flex items-center justify-center rounded-md bg-carmine-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-carmine-600"
                >
                  Saņemt bonusu
                </Link>
                <Link
                  href={`/kazino/${op.slug}/`}
                  className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:decoration-carmine-500"
                >
                  Lasīt apskatu →
                </Link>
              </div>
              <p className="mt-3 text-2xs text-ink-faint">
                18+ · Spēlējiet atbildīgi · Bonusam piemērojami T&amp;C
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
