import Link from 'next/link';

import { OperatorRow } from '@/components/OperatorRow';
import { OperatorLogo } from '@/components/OperatorLogo';
import { JsonLd } from '@/components/JsonLd';
import { Faq } from '@/components/Faq';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RatingStars } from '@/components/RatingStars';
import { getTopOperators, getArticles } from '@/lib/data';
import { breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: `Labākie online kazino Latvijā 2026 — IAUI licencēti operatori`,
  description: trimDescription(
    `Salīdziniet labākos online kazino Latvijā 2026. gadā. Pārbaudīti IAUI licencēti operatori, ekspertu pārskati, welcome bonusi un atbildīgas spēles ceļvedis.`,
  ),
  path: '/',
  type: 'website',
  og: { eyebrow: 'Latvijas premium kazino ceļvedis' },
});

const HOMEPAGE_FAQ = [
  {
    q: 'Kā izvēlēties drošu online kazino Latvijā?',
    a: 'Pirmkārt, pārbaudiet, vai operators ir saņēmis Izložu un azartspēļu uzraudzības inspekcijas (IAUI) licenci — to var izdarīt IAUI oficiālajā mājaslapā iaui.gov.lv. Drošs kazino nodrošina SSL šifrēšanu, caurspīdīgus bonusu nosacījumus un pieejamu klientu atbalstu latviešu valodā.',
  },
  {
    q: 'Vai laimesti online kazino Latvijā tiek aplikti ar nodokli?',
    a: 'Latvijā laimesti no IAUI licencētiem operatoriem līdz 3000 € gadā ienākuma nodoklis nav jāmaksā. Lielākiem laimestiem piemēro standarta iedzīvotāju ienākuma nodokļa likmi atbilstoši Likumam par iedzīvotāju ienākuma nodokli.',
  },
  {
    q: 'Kāda ir minimālā vecuma robeža azartspēlēm Latvijā?',
    a: 'Visi azartspēļu pakalpojumi Latvijā ir pieejami tikai personām vecumā no 18 gadiem. Operatori obligāti pārbauda vecumu reģistrācijas brīdī.',
  },
  {
    q: 'Kā darbojas Pašatteikušos personu reģistrs?',
    a: 'Pašatteikušos personu reģistrs (PPR) ir IAUI uzturēts reģistrs, kurā var pieteikties personas, kuras vēlas brīvprātīgi izslēgt sevi no azartspēlēm. Iekļaušana ir bez maksas un attiecas uz visiem licencētajiem operatoriem.',
  },
  {
    q: 'Kāds ir labākais Latvijas online kazino welcome bonuss?',
    a: 'Tas atkarīgs no jūsu spēles stila — augstas likmes spēlētājiem labāks ir liels procentuālais bonuss, savukārt ikdienas spēlētājiem — bezmaksas griezieni vai zema wagering nosacījuma piedāvājumi. Mūsu bonusu salīdzinājuma lapā detalizēti ranžējam aktuālos piedāvājumus.',
  },
];

const HUBS = [
  {
    href: '/bonusi/',
    eyebrow: '01',
    title: 'Welcome bonusi',
    copy: 'Depozīta bonusi, bezmaksas griezieni un cashback ar caurspīdīgu wagering analīzi.',
  },
  {
    href: '/speles/spelu-automati/',
    eyebrow: '02',
    title: 'Spēļu automāti',
    copy: 'Augsta RTP sloti, Megaways™, klasiskie automāti un progresīvie džekpoti.',
  },
  {
    href: '/speles/live-kazino/',
    eyebrow: '03',
    title: 'Live kazino',
    copy: 'Tiešraides ruletes, blackjack, baccarat un spēļu šovi ar reāliem dīleriem.',
  },
  {
    href: '/maksajumi/',
    eyebrow: '04',
    title: 'Maksājumu metodes',
    copy: 'Swedbank Link, SEB, Trustly, Revolut, kriptovalūta — ātrums un komisijas.',
  },
  {
    href: '/spelu-izstradataji/',
    eyebrow: '05',
    title: 'Spēļu izstrādātāji',
    copy: 'Synot, NetEnt, EGT, Pragmatic Play — kuri studio dominē Latvijas tirgū.',
  },
  {
    href: '/salidzinajumi/',
    eyebrow: '06',
    title: 'Salīdzinājumi',
    copy: 'Operatoru dueles — Optibet vs OlyBet, Klondaika vs Optibet, citi.',
  },
  {
    href: '/atbildiga-spele/',
    eyebrow: '07',
    title: 'Atbildīga spēle',
    copy: 'Limitu iestatīšana, Pašatteikušos personu reģistrs un atbalsta organizācijas.',
  },
];

export default function HomePage() {
  const operators = getTopOperators(7);
  const featured = operators[0];
  const recent = getArticles().slice(0, 4);

  const breadcrumb = breadcrumbSchema([{ name: 'Sākums', href: '/' }]);
  const operatorList = itemListSchema(
    operators.map((op) => ({ name: op.name, url: `/kazino/${op.slug}/` })),
  );
  const faq = faqSchema(HOMEPAGE_FAQ);

  return (
    <>
      <JsonLd data={[breadcrumb, operatorList, faq]} />

      {/* Hero ----------------------------------------------------------- */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-14 pt-8 lg:px-8 lg:pb-20 lg:pt-12">
          <Breadcrumbs items={[{ href: '/', label: 'Sākums' }]} />

          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flag-rule pt-5">
                <p className="eyebrow">Latvijas neatkarīgais ceļvedis · 2026</p>
                <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tightish text-ink md:text-5xl lg:text-6xl">
                  Labākie online kazino{' '}
                  <span className="italic text-carmine-600">Latvijā</span>,{' '}
                  pārbaudīti pa īstam.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                  Pārskati par IAUI licencētiem operatoriem, ko mūsu redaktori
                  testē klātienē — depozīts, spēle, izņemšana. Bez reklāmu
                  miglas. Bez nepamatotiem solījumiem.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="#top-operatori"
                    className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-carmine-600"
                  >
                    Skatīt rangu
                    <span aria-hidden>↓</span>
                  </Link>
                  <Link
                    href="/metodologija/"
                    className="inline-flex items-center gap-2 rounded-md border border-line bg-bone px-5 py-3 text-sm font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink"
                  >
                    Vērtēšanas metodoloģija
                  </Link>
                </div>

                <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8 text-sm">
                  <Stat n="14+" label="IAUI licencēti operatori" />
                  <Stat n="172" label="Padziļināti raksti" />
                  <Stat n="2026" label="Atjaunināts katru mēnesi" />
                </dl>
              </div>
            </div>

            {/* Featured operator card --------------------------------- */}
            {featured && (
              <aside
                aria-labelledby="featured-op"
                className="lg:col-span-5"
              >
                <div className="relative overflow-hidden rounded-2xl border border-line bg-bone shadow-lift">
                  <div className="absolute inset-x-0 top-0 h-1 bg-carmine-500" aria-hidden />
                  <div className="p-7 lg:p-8">
                    <p className="eyebrow">Mēneša izvēle</p>
                    <div className="mt-3 flex items-center gap-4">
                      <OperatorLogo operator={featured} size={64} />
                      <h2
                        id="featured-op"
                        className="font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl"
                      >
                        {featured.name}
                      </h2>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <RatingStars value={featured.ratings.overall ?? 0} size="lg" />
                      {featured.facets.licences[0] && (
                        <span className="rounded-full border border-line bg-paper-soft px-2.5 py-1 text-2xs font-medium text-ink-soft">
                          {featured.facets.licences[0]}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 rounded-lg bg-paper-soft p-5">
                      <p className="eyebrow">Welcome bonuss</p>
                      <p
                        className="mt-2 font-serif text-xl text-ink"
                        dangerouslySetInnerHTML={{ __html: featured.bonus.shortDesc || 'Apskatīt aktuālo bonusu' }}
                      />
                      {featured.bonus.termsDesc && (
                        <p
                          className="mt-2 text-2xs leading-relaxed text-ink-mute"
                          dangerouslySetInnerHTML={{ __html: featured.bonus.termsDesc }}
                        />
                      )}
                    </div>

                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                      <Link
                        href={`/go/${featured.slug}/`}
                        rel="sponsored nofollow"
                        className="inline-flex flex-1 items-center justify-center rounded-md bg-carmine-500 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-carmine-600"
                      >
                        Apmeklēt {featured.name}
                      </Link>
                      <Link
                        href={`/kazino/${featured.slug}/`}
                        className="inline-flex flex-1 items-center justify-center rounded-md border border-line bg-paper px-5 py-3 text-sm font-medium text-ink-soft transition hover:text-ink"
                      >
                        Pilns apskats
                      </Link>
                    </div>
                    <p className="mt-3 text-2xs text-ink-faint">
                      18+ · Spēlējiet atbildīgi · Bonusam piemērojami T&C
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-2xs leading-relaxed text-ink-mute">
                  Saites uz operatoriem ir komerciālas. Vērtējumus piešķir
                  redaktori pirms partnerattiecību noslēgšanas — skat.{' '}
                  <Link href="/redakcionala-politika/" className="underline decoration-line hover:decoration-carmine-500">
                    redakcionālo politiku
                  </Link>
                  .
                </p>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip ---------------------------------------------------- */}
      <section className="border-b border-line bg-paper-soft">
        <div className="mx-auto grid max-w-wrap gap-x-10 gap-y-6 px-4 py-8 text-sm md:grid-cols-3 lg:px-8">
          <TrustBullet title="Tikai IAUI licencēti operatori">
            Mēs pārskatām vienīgi operatorus ar derīgu Latvijas valsts licenci.
          </TrustBullet>
          <TrustBullet title="Caurspīdīga metodoloģija">
            Pieci kritēriji, vienots svars visiem operatoriem — publiski pieejams.
          </TrustBullet>
          <TrustBullet title="Atbildīga spēle pirmajā vietā">
            18+ marķējums, limitu rīki un Pašatteikušos personu reģistrs katrā lapā.
          </TrustBullet>
        </div>
      </section>

      {/* Top operators -------------------------------------------------- */}
      <section
        id="top-operatori"
        className="mx-auto max-w-wrap px-4 py-16 lg:px-8 lg:py-24 scroll-mt-24"
      >
        <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Rangs</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-5xl">
              Top operatoru saraksts
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Sakārtots pēc kopējā vērtējuma, kas balstīts uz piecu kritēriju
              testēšanu — drošība, spēļu klāsts, bonusi, klientu atbalsts un
              izņemšanas ātrumi.
            </p>
          </div>
          <Link
            href="/kazino/"
            className="text-sm font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
          >
            Visi pārskati →
          </Link>
        </header>

        <div className="mt-10 space-y-3.5">
          {operators.length === 0 && (
            <p className="text-ink-mute">Pārskati tiek atjaunināti.</p>
          )}
          {operators.map((op, i) => (
            <OperatorRow key={op.slug} operator={op} position={i + 1} />
          ))}
        </div>
      </section>

      {/* Topical hubs --------------------------------------------------- */}
      <section className="border-y border-line bg-paper-soft">
        <div className="mx-auto max-w-wrap px-4 py-16 lg:px-8 lg:py-24">
          <header className="max-w-2xl">
            <p className="eyebrow">Tēmas</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-5xl">
              Tematiskie ceļveži
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Padziļināts saturs par bonusiem, maksājumiem, spēlēm un atbildīgu
              spēli — tieši tas, kas jāzina pirms reģistrēšanās.
            </p>
          </header>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-3">
            {HUBS.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="group flex flex-col gap-3 bg-bone p-7 transition hover:bg-paper lg:p-8"
              >
                <span className="font-mono text-xs tracking-wider2 text-carmine-600">
                  / {h.eyebrow}
                </span>
                <h3 className="font-serif text-2xl font-semibold tracking-tightish text-ink group-hover:text-carmine-700">
                  {h.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{h.copy}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-2xs font-semibold uppercase tracking-widest2 text-carmine-600">
                  Atvērt
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles ------------------------------------------------ */}
      <section className="mx-auto max-w-wrap px-4 py-16 lg:px-8 lg:py-24">
        <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Žurnāls</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-5xl">
              Jaunākie raksti
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Stratēģijas, regulējumi un vietējais konteksts no Anna Jansons un
              Aldis Skuja redakcijas.
            </p>
          </div>
          <Link
            href="/raksti/"
            className="text-sm font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
          >
            Visi raksti →
          </Link>
        </header>

        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {recent.map((a, i) => (
            <article key={a.slug} className={i === 0 ? 'md:col-span-2 md:row-span-1' : ''}>
              <span className="eyebrow">
                {a.categories[0]?.label ?? 'Raksti'}
              </span>
              <h3 className={`mt-3 font-serif font-semibold tracking-tightish text-ink ${i === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                <Link
                  href={`/raksti/${a.slug}/`}
                  className="hover:text-carmine-700"
                >
                  {a.title}
                </Link>
              </h3>
              <p className={`mt-3 text-ink-soft ${i === 0 ? 'text-base leading-relaxed line-clamp-4' : 'text-sm leading-snug line-clamp-3'}`}>
                {a.excerpt}
              </p>
              <p className="mt-4 text-2xs uppercase tracking-widest2 text-ink-mute">
                {a.author === 'annab' ? 'Anna Jansons' : 'Aldis Skuja'}
                {a.publishedAt && (
                  <>
                    <span aria-hidden> · </span>
                    {formatDate(a.publishedAt)}
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Editorial pull-quote ------------------------------------------ */}
      <section className="border-y border-line bg-bone">
        <div className="mx-auto max-w-narrow px-4 py-16 lg:px-8 lg:py-24">
          <p className="eyebrow text-center">Mūsu pieeja</p>
          <blockquote className="mt-6 text-center font-serif text-2xl leading-snug tracking-tightish text-ink md:text-4xl">
            <span className="text-carmine-500">“</span>
            Mēs nerakstām pārdošanas tekstus. Mēs reģistrējamies, iemaksājam,
            spēlējam, izņemam — un tikai tad rakstām, kas patiešām notika.
            <span className="text-carmine-500">”</span>
          </blockquote>
          <p className="mt-6 text-center text-2xs uppercase tracking-widest2 text-ink-mute">
            Aldis Skuja, galvenais redaktors
          </p>
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------ */}
      <section className="mx-auto max-w-narrow px-4 py-16 lg:px-8 lg:py-24">
        <Faq items={HOMEPAGE_FAQ} />
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="font-serif text-3xl font-semibold tracking-tightish text-carmine-600 md:text-4xl">
        {n}
      </dt>
      <dd className="mt-1 text-xs leading-snug text-ink-mute">{label}</dd>
    </div>
  );
}

function TrustBullet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-carmine-300 bg-paper text-[0.6rem] font-bold text-carmine-600">
        ✓
      </span>
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-ink-soft">{children}</p>
      </div>
    </div>
  );
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('lv-LV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}
