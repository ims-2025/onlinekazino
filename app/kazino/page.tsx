import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { OperatorRow } from '@/components/OperatorRow';
import { JsonLd } from '@/components/JsonLd';
import { getOperators } from '@/lib/data';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Online Kazino Latvijā 2026 — Visu IAUI Licencēto Operatoru Saraksts',
  description: trimDescription(
    'Visi mūsu pārskatītie online kazino, kas darbojas Latvijā ar IAUI licenci. Salīdziniet vērtējumus, welcome bonusus, maksājumu metodes un izņemšanas ātrumus.',
  ),
  path: '/kazino/',
});

export default function OperatorsIndexPage() {
  const operators = getOperators();
  const breadcrumb = breadcrumbSchema([
    { name: 'Sākums', href: '/' },
    { name: 'Kazino', href: '/kazino/' },
  ]);
  const list = itemListSchema(
    operators.map((op) => ({ name: op.name, url: `/kazino/${op.slug}/` })),
  );

  return (
    <>
      <JsonLd data={[breadcrumb, list]} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/kazino/', label: 'Kazino' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Pārskati</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Online kazino Latvijā
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Pilns saraksts ar visiem mūsu pārskatītajiem operatoriem, kas
              darbojas Latvijā ar Izložu un azartspēļu uzraudzības inspekcijas
              (IAUI) licenci. Sakārtots pēc kopējā vērtējuma.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="space-y-3.5">
          {operators.map((op, i) => (
            <OperatorRow key={op.slug} operator={op} position={i + 1} />
          ))}
          {operators.length === 0 && (
            <p className="text-ink-mute">
              Pārskati tiek atjaunināti — atgriezieties pēc brīža.
            </p>
          )}
        </div>

        <p className="mt-10 max-w-3xl text-sm text-ink-mute">
          Mēs regulāri pievienojam jaunus operatorus, kad tie saņem IAUI
          licenci.{' '}
          <Link href="/metodologija/" className="text-carmine-600 underline decoration-carmine-300 underline-offset-2 hover:decoration-carmine-500">
            Mūsu vērtēšanas metodoloģija
          </Link>{' '}
          ir publiska un nemainīga visiem operatoriem.
        </p>
      </section>
    </>
  );
}
