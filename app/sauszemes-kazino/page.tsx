import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getCities, getCitiesMeta } from '@/lib/cities';

export const metadata = buildMetadata({
  title: 'Sauszemes kazino Latvijā 2026 — IAUI licencētu vietu ceļvedis',
  description: trimDescription(
    'Sauszemes kazino un spēļu zāles visā Latvijā — Rīgā, Liepājā, Daugavpilī, Jūrmalā, Ventspilī un citur. IAUI licencēts piedāvājums pa pilsētām, salīdzinājumi ar online opcijām.',
  ),
  path: '/sauszemes-kazino/',
  og: { eyebrow: 'Sauszemes kazino' },
});

const HUB_FAQ = [
  {
    question: 'Cik pilsētās Latvijā darbojas sauszemes kazino?',
    answer:
      'Pilnvērtīgi sauszemes kazino ar dzīvajiem dīleriem darbojas galvenokārt sešās lielākajās pilsētās — Rīgā, Liepājā, Daugavpilī, Jūrmalā, Ventspilī un Jelgavā. IAUI licencētas spēļu zāles ar automātiem ir izvietotas vēl vismaz divdesmit citās Latvijas pilsētās un lielākos miestos.',
  },
  {
    question: 'Kāds ir vecuma cenzs Latvijas sauszemes kazino?',
    answer:
      'Visā Latvijā vecuma cenzs ir 18 gadu. Pie ieejas kazino vai spēļu zāli obligāti uzrāda derīgu personu apliecinošu dokumentu — pasi, eID karti vai vadītāja apliecību. Studenta ID vai cita veida apliecības netiek pieņemtas.',
  },
  {
    question: 'Vai online kazino piedāvājums Latvijā ir lielāks par klātienes?',
    answer:
      'Jā, ievērojami. Lielākie Latvijas sauszemes kazino piedāvā 60–150 automātu spēļu, savukārt IAUI licencēti online operatori uztur 1500+ spēļu katalogus, plašākas live kazino studijas un 24/7 pieejamību bez ceļošanas.',
  },
  {
    question: 'Vai sauszemes kazino apmeklējumu reģistrē IAUI Pašatteikušos personu reģistrā?',
    answer:
      'Jā. Pašatteikušos personu reģistrs (PPR) ir vienots gan online, gan sauszemes operatoriem. Ja persona ir reģistrējusies PPR, viņai aizliegta iekļuve visos IAUI licencētajos kazino un spēļu zālēs visā Latvijā uz reģistrācijas periodu (12 mēneši vai uz nenoteiktu laiku).',
  },
  {
    question: 'Kāpēc Olympic Casino dominē Latvijas sauszemes tirgū?',
    answer:
      'Olympic Casino zīmols pieder Odyssey Europe AS (līdz 2018. gadam — Olympic Entertainment Group), kas savu klātbūtni Latvijā veidoja kopš 2000. gadu sākuma. Centralizēta operāciju vadība, mērogs un Olympic lojalitātes programma ir radījuši dabisku tirgus līderību. Vietējais konkurents Klondaika uztur stabilu otro pozīciju, savukārt mazākie operatori specializējas spēļu zāļu segmentā.',
  },
];

export default function LandBasedHubPage() {
  const cities = getCities();
  const meta = getCitiesMeta();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Sauszemes kazino', href: '/sauszemes-kazino/' },
          ]),
          itemListSchema(
            cities.map((c) => ({
              name: `Sauszemes kazino ${c.nameLocative}`,
              url: `/sauszemes-kazino/${c.slug}/`,
            })),
          ),
          faqSchema(HUB_FAQ),
        ]}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/sauszemes-kazino/', label: 'Sauszemes kazino' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Latvijas sauszemes kazino karte</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Sauszemes kazino un spēļu zāles Latvijā
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              IAUI licencētu sauszemes kazino un spēļu zāļu ceļvedis pa
              Latvijas pilsētām. Olympic Casino, Klondaika un citi operatori —
              kur tie atrodas, kā piekļūt, kāpēc dažās pilsētās izvēle ir
              plašāka nekā citās.
            </p>
          </div>
        </div>
      </section>

      {/* Intro essay */}
      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8">
        <div className="prose-editorial max-w-prose">
          <p>
            Latvijas sauszemes kazino tirgus ir koncentrēts un mērens izmērs —
            ar aptuveni 20–25 pilnvērtīgiem IAUI licencētiem kazino visā valstī
            un vairākiem simtiem spēļu zāļu. Lielākā daļa darbības koncentrēta
            sešās lielākajās pilsētās: Rīgā, Liepājā, Daugavpilī, Jūrmalā,
            Ventspilī un Jelgavā. Pārējās Latvijas pilsētās un mazākajos
            miestos sastopamas galvenokārt spēļu zāles ar automātiem, nevis
            pilnvērtīgi kazino ar dzīvajiem dīleriem.
          </p>
          <p>
            Dominējošais zīmols ir Olympic Casino — Odyssey Europe AS īpašumā
            esošais Baltijas mēroga operators, kura tīkls Latvijā ietver
            vairākas atrašanās vietas Rīgā un pilnu klātbūtni visās lielākajās
            pilsētās. Vietējais konkurents Klondaika uztur ietekmīgu klātbūtni
            Rīgā un selektīvi citur. Mazākie operatori — galvenokārt SIA Joker
            LTD, Alfor un dažas neatkarīgas spēļu zāles — specializējas
            mazākās vietās.
          </p>
          <p>
            Visi sauszemes operatori darbojas pēc Azartspēļu un izložu likuma,
            kuru uzrauga Izložu un azartspēļu uzraudzības inspekcija (IAUI).
            Vecuma cenzs — 18 gadi. KYC pārbaude no €2000 viena depozīta.
            Pašatteikušos personu reģistrs (PPR) ir saistošs gan online, gan
            klātienē. Apmeklētāju identitāti pie ieejas pārbauda obligāti.
          </p>
        </div>
      </section>

      {/* City grid */}
      <section className="border-t border-line bg-paper-soft">
        <div className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">12 pilsētas</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl">
              Pilsētu ceļvedis
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              Katra pilsētas lapa apraksta sauszemes kazino un spēļu zāļu ainu,
              dominējošo operatoru, sasniedzamību un labākās online
              alternatīvas, ja klātienes apmeklējums nav iespējams.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c, i) => (
              <Link
                key={c.slug}
                href={`/sauszemes-kazino/${c.slug}/`}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-bone p-6 shadow-soft transition hover:border-carmine-200 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-mono uppercase tracking-widest2 text-ink-mute">
                    / {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-2xs uppercase tracking-widest2 text-ink-mute">
                    {c.regionLabel}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold tracking-tightish text-ink group-hover:text-carmine-700">
                  {c.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft line-clamp-3">
                  {c.lede}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-ink-mute">
                  <span>{c.venueOverview.casinoCount} kazino</span>
                  <span>{c.venueOverview.slotHallCount} spēļu zāles</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link essays */}
      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Padziļināti raksti</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl">
            Konteksts un izvēle
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <EssayCard
            href="/sauszemes-kazino/online-vs-sauszemes/"
            eyebrow="Salīdzinājums"
            title="Sauszemes vs online kazino — kuru izvēlēties?"
            blurb="Klātienes pieredze, spēļu izvēle, bonusi, ātrums, sociālā dinamika — kad katra opcija ir pārāka."
          />
          <EssayCard
            href="/sauszemes-kazino/turistiem/"
            eyebrow="Tūristiem"
            title="Ārvalstu viesu ceļvedis Latvijas kazino"
            blurb="Identitātes prasības, valūta, valodas atbalsts, dress code — viss, ko zināt pirms apmeklējuma."
          />
          <EssayCard
            href="/sauszemes-kazino/etikete/"
            eyebrow="Etiķete"
            title="Latvijas kazino etiķete un nerakstītie noteikumi"
            blurb="Apģērbs, žetonu apiešanās, dzeramnauda, klusums pie galda — kā uzvesties premium klubu vidē."
          />
          <EssayCard
            href="/sauszemes-kazino/spelu-zales/"
            eyebrow="Atšķirības"
            title="Kazino vs spēļu zāle — kāpēc atšķirība ir svarīga"
            blurb="Licences kategorijas, piedāvājuma plašums, klientūra un cenu līmenis: kas tieši atšķiras Latvijas regulējumā."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-paper-soft">
        <div className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
          <div className="max-w-prose">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl">
              Bieži uzdotie jautājumi
            </h2>
            <div className="mt-6">
              <Faq items={HUB_FAQ} />
            </div>
          </div>
        </div>
      </section>

      {/* Source */}
      <section className="mx-auto max-w-wrap px-4 py-10 lg:px-8">
        <div className="rounded-xl border border-line bg-paper-soft p-6 text-xs leading-relaxed text-ink-mute md:p-7">
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
            (pēdējoreiz pārbaudīts: {meta.lastVerified}). Operatori savas
            atrašanās vietas un darba laikus var mainīt — pārbaudīt pirms
            apmeklējuma.
          </p>
          <p className="mt-3">
            18+. Azartspēles var izraisīt atkarību. Spēlējiet atbildīgi.{' '}
            <Link href="/atbildiga-spele/" className="underline decoration-line hover:decoration-carmine-500">
              Atbildīgas spēles ceļvedis
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function EssayCard({
  href,
  eyebrow,
  title,
  blurb,
}: {
  href: string;
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-line bg-bone p-7 shadow-soft transition hover:border-carmine-200 hover:shadow-lift"
    >
      <p className="text-2xs font-semibold uppercase tracking-widest2 text-carmine-700">
        {eyebrow}
      </p>
      <h3 className="font-serif text-2xl font-semibold leading-snug tracking-tightish text-ink group-hover:text-carmine-700">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-soft">{blurb}</p>
      <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-carmine-600">
        Lasīt
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
