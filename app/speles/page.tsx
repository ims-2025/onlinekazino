import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Online Kazino Spēles — Sloti, Blackjack, Rulete, Live Kazino',
  description: trimDescription(
    'Visu populārāko online kazino spēļu ceļvedis Latvijas spēlētājiem. Spēļu automāti, galda spēles, live dīleri, džekpoti — kur spēlēt un kā vinnēt.',
  ),
  path: '/speles/',
});

const HUBS = [
  { num: '01', href: '/speles/spelu-automati/', title: 'Spēļu automāti', copy: 'Augsta RTP sloti, Megaways™, klasiskie un progresīvie džekpoti.' },
  { num: '02', href: '/speles/blackjack/', title: 'Blackjack', copy: 'Pamata stratēģija, kāršu skaitīšana, online blackjack varianti.' },
  { num: '03', href: '/speles/rulete/', title: 'Rulete', copy: 'Eiropas, amerikāņu, franču ruletes salīdzinājums un stratēģijas.' },
  { num: '04', href: '/speles/baccarat/', title: 'Baccarat', copy: 'Punto Banco, Mini Baccarat un noteikumi iesācējiem.' },
  { num: '05', href: '/speles/pokers/', title: 'Pokers', copy: 'Texas Hold\'em, Omaha, video pokers un turnīri online.' },
  { num: '06', href: '/speles/live-kazino/', title: 'Live kazino', copy: 'Crazy Time, Monopoly Live, live ruletes un blackjack.' },
  { num: '07', href: '/speles/dzekpoti/', title: 'Progresīvie džekpoti', copy: 'Mega Moolah, Mega Fortune un citi rekordlielie džekpoti.' },
];

export default function GamesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Spēles', href: '/speles/' },
        ])}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/speles/', label: 'Spēles' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Spēļu ceļveži</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Online kazino spēles
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Padziļināti ceļveži par populārākajām online kazino spēlēm —
              noteikumiem, stratēģijām, RTP un kur tās spēlēt Latvijā.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-3">
          {HUBS.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="group flex flex-col gap-3 bg-bone p-7 transition hover:bg-paper lg:p-8"
            >
              <span className="font-mono text-xs tracking-wider2 text-carmine-600">
                / {h.num}
              </span>
              <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink group-hover:text-carmine-700">
                {h.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft">{h.copy}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-2xs font-semibold uppercase tracking-widest2 text-carmine-600">
                Atvērt
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
