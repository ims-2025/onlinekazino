import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Vērtēšanas metodoloģija — Kā mēs vērtējam online kazino',
  description: trimDescription(
    'Detalizēts skaidrojums, kā OnlineKazino.com vērtē operatorus. Vienoti kritēriji visiem — drošība, spēļu klāsts, bonusi, klientu atbalsts, izņemšanas.',
  ),
  path: '/metodologija/',
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Metodoloģija', href: '/metodologija/' },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/metodologija/', label: 'Vērtēšanas metodoloģija' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Caurspīdīgums</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Vērtēšanas metodoloģija
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Mēs piemērojam vienotu, caurspīdīgu vērtēšanas sistēmu visiem
            operatoriem. Šī lapa apraksta, kas tieši ietilpst katrā vērtējuma
            kritērijā un kā mēs aprēķinām kopējo vērtējumu.
          </p>
        </header>

        <section className="prose-editorial mt-12">
          <h2>Pieci galvenie kritēriji (katrs 1-5 punkti)</h2>

          <h3>1. Drošība un licencēšana (svars 25 %)</h3>
          <ul>
            <li>Vai operators ir saņēmis IAUI licenci? (obligāts priekšnoteikums)</li>
            <li>Vai mājaslapa izmanto SSL/TLS šifrēšanu?</li>
            <li>Vai pieejama divfaktoru autentifikācija?</li>
            <li>Vai T&amp;C ir caurspīdīgi un saprotami latviešu valodā?</li>
            <li>Vai operatoram ir publicētas atbildīgas spēles politikas?</li>
          </ul>

          <h3>2. Spēļu klāsts (svars 20 %)</h3>
          <ul>
            <li>Spēļu skaits (sloti, galda spēles, live kazino)</li>
            <li>Spēļu izstrādātāju daudzveidība (NetEnt, Pragmatic Play, Synot, Microgaming, Evolution u.c.)</li>
            <li>Augsta RTP slotu pieejamība</li>
            <li>Live kazino piedāvājums (Evolution, Pragmatic Play Live)</li>
            <li>Demo režīma pieejamība bez reģistrēšanās</li>
          </ul>

          <h3>3. Bonusu kvalitāte (svars 20 %)</h3>
          <ul>
            <li>Welcome bonusa lielums un struktūra</li>
            <li>Wagering nosacījumi (zem 35x = labi, virs 50x = slikti)</li>
            <li>Maksimālais bet ar bonusu</li>
            <li>Spēļu kontribūcija wagering izpildē</li>
            <li>Bonusu derīguma termiņš</li>
            <li>Pastāvīgo spēlētāju lojalitātes programma</li>
          </ul>

          <h3>4. Klientu atbalsts (svars 15 %)</h3>
          <ul>
            <li>Tiešraides čats — pieejamība un atbildes laiks</li>
            <li>Atbalsts latviešu valodā</li>
            <li>Darba laiki (24/7 ir labākais)</li>
            <li>FAQ kvalitāte un pilnīgums</li>
            <li>E-pasta atbilžu ātrums (testēts)</li>
          </ul>

          <h3>5. Izņemšanas un maksājumi (svars 20 %)</h3>
          <ul>
            <li>Izņemšanas ātrums (testēts mūsu redakcijas)</li>
            <li>Maksājumu metožu daudzveidība (Swedbank Link, SEB, Trustly, kartes, kriptovalūta)</li>
            <li>Minimālā un maksimālā izņemšana</li>
            <li>KYC procesa skaidrība un ātrums</li>
            <li>Izņemšanas komisijas (vai bez tām)</li>
          </ul>

          <h2>Kopējā vērtējuma aprēķins</h2>
          <p>
            Katrs no pieciem kritērijiem tiek vērtēts skalā no 1 līdz 5
            punktiem. Galīgo vērtējumu aprēķinām kā svērto vidējo, izmantojot
            iepriekš norādītos svarus.
          </p>

          <h2>Pārskatu atjaunināšana</h2>
          <p>
            Operatoru pārskatus pārbaudām reizi 2-3 mēnešos vai pēc nozīmīgām
            izmaiņām (jauni bonusi, jauna spēļu izstrādātāja partnerība,
            licences statuss). Pēdējās pārbaudes datums ir redzams katra
            pārskata sākumā.
          </p>

          <h2>Kā mēs novēršam aizspriedumus</h2>
          <p>
            Vērtējumus piešķir mūsu redaktori pirms partnerības līgumu
            noslēgšanas. Komercijas komandai nav iespējas ietekmēt vērtējumus,
            un komercijas attiecības tiek izveidotas tikai tad, kad operators
            jau ir izgājis mūsu vērtēšanas procesu.
          </p>
        </section>
      </article>
    </>
  );
}
