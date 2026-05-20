import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Online Kazino Maksājumu Metodes Latvijā 2026',
  description: trimDescription(
    'Salīdziniet maksājumu metodes Latvijas online kazino — Swedbank Link, SEB, Trustly, Revolut, kartes, kriptovalūta. Ātrums, drošība un komisijas.',
  ),
  path: '/maksajumi/',
});

const METHODS = [
  { num: '01', href: '/maksajumi/swedbank-link/', title: 'Swedbank Link', copy: 'Tūlītējas iemaksas un izņemšanas Swedbank klientiem.' },
  { num: '02', href: '/maksajumi/seb/', title: 'SEB', copy: 'SEB internetbankas integrācija — viena no izplatītākajām LV.' },
  { num: '03', href: '/maksajumi/citadele/', title: 'Citadele', copy: 'Citadele banka — bezsaiti banku iemaksu metode.' },
  { num: '04', href: '/maksajumi/trustly/', title: 'Trustly', copy: 'Pay-and-play tūlītējas iemaksas bez reģistrēšanās.' },
  { num: '05', href: '/maksajumi/revolut/', title: 'Revolut', copy: 'Revolut karte un konts — ātri starptautiski pārskaitījumi.' },
  { num: '06', href: '/maksajumi/visa-mastercard/', title: 'Visa / MasterCard', copy: 'Klasiskās kredīta un debeta kartes.' },
  { num: '07', href: '/maksajumi/skrill/', title: 'Skrill', copy: 'E-makss ar plašu starptautisku pieņemšanu.' },
  { num: '08', href: '/maksajumi/neteller/', title: 'Neteller', copy: 'Vēl viens populārais e-makss kazino spēlētājiem.' },
  { num: '09', href: '/maksajumi/paypal/', title: 'PayPal', copy: 'Vai PayPal patiesi strādā Latvijas kazino?' },
  { num: '10', href: '/maksajumi/kriptovaluta/', title: 'Kriptovalūta', copy: 'Bitcoin, Ethereum, USDT — kuri kazino tos pieņem.' },
];

export default function PaymentsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Maksājumi', href: '/maksajumi/' },
        ])}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/maksajumi/', label: 'Maksājumi' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Iemaksas un izņemšanas</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Maksājumu metodes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Salīdziniet iemaksu un izņemšanas metodes Latvijas online kazino —
              ātrums, drošība, komisijas un kuri operatori tās pieņem.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-3">
          {METHODS.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex flex-col gap-3 bg-bone p-7 transition hover:bg-paper lg:p-8"
            >
              <span className="font-mono text-xs tracking-wider2 text-carmine-600">
                / {m.num}
              </span>
              <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink group-hover:text-carmine-700">
                {m.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft">{m.copy}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-2xs font-semibold uppercase tracking-widest2 text-carmine-600">
                Apskatīt
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
