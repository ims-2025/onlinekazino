import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Latvijas kazino ceļvedis ārvalstu tūristiem 2026',
  description: trimDescription(
    'Latvijas kazino ārvalstu viesiem — ID prasības, valūta, valodas, dress code, transports un labākās vietas Rīgā, Jūrmalā un Latvijas reģionos.',
  ),
  path: '/sauszemes-kazino/turistiem/',
  type: 'article',
  og: { eyebrow: 'Tūristiem' },
});

export default function TouristsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Sauszemes kazino', href: '/sauszemes-kazino/' },
          { name: 'Tūristiem', href: '/sauszemes-kazino/turistiem/' },
        ])}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/sauszemes-kazino/', label: 'Sauszemes kazino' },
            { href: '/sauszemes-kazino/turistiem/', label: 'Tūristiem' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Ārvalstu viesu ceļvedis</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            Latvijas kazino ārvalstu tūristiem
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            Latvija nav Las Vegas vai Monte Karlo — bet Rīgā, Jūrmalā un
            lielākajās reģionālajās pilsētās darbojas vairāk nekā divdesmit
            IAUI licencētu kazino, kuri labprāt uzņem ārvalstu viesus.
            Šeit ir viss, ko jums vajadzētu zināt pirms apmeklējuma.
          </p>
        </header>

        <section className="prose-editorial mt-10 max-w-prose">
          <h2>Vecuma cenzs un ID prasības</h2>
          <p>
            Latvijas likumdošana prasa vismaz 18 gadu vecumu visās IAUI
            licencētajās azartspēļu vietās. Pie ieejas obligāti uzrāda
            personu apliecinošu dokumentu. Pieņemamie dokumenti ārvalstu
            viesiem: pase, ES vai EEZ valstu eID karte, dažās vietās arī
            ārvalstu vadītāja apliecība, ja tā satur foto un dzimšanas datumu.
            Studenta ID, kreditkartes vai jebkurš cita veida apliecība — nē.
          </p>
          <p>
            Eiropas Savienības pilsoņi ar derīgu eID karti parasti izietu
            pārbaudi ātri. Ārpus ES viesiem (ASV, Apvienotā Karaliste,
            Krievija, Baltkrievija u.c.) jāuzrāda pase. Ja jūs uzturaties
            Latvijā kā tūrists ar īstermiņa vīzu, pase jāņem līdzi —
            apmešanās vietas adrese netiek prasīta.
          </p>
          <p>
            KYC (klienta identifikācijas) procedūra ir pastiprināta, ja vienā
            apmeklējumā veicat depozītu virs €2000 vai izņemat naudu virs šī
            sliekšņa. Šādā gadījumā kazino veiks padziļinātu identitātes
            pārbaudi — papildu dokuments un dažās vietās arī finanšu izcelsmes
            apliecinājums.
          </p>

          <h2>Valūta un maksāšana</h2>
          <p>
            Oficiālā valūta — Eiro (EUR). Visi kazino pieņem skaidru naudu
            eiro banknotēs. Lielākajos Rīgas kazino var izmantot Visa un
            Mastercard kartes; American Express tiek pieņemta retāk. Skaidras
            naudas izmaksa pēc laimes ir pieejama tūlītēji eiro banknotēs.
          </p>
          <p>
            Ārvalstu valūtas — USD, GBP, RUB — oficiāli netiek pieņemtas.
            Praksē dažas vietas piedāvā maiņas iespējas, bet kursi nav
            optimāli. Iesakām samainīt valūtu pirms ieiešanas — Rīgā ir
            daudzas atļautas valūtas maiņas vietas, ieskaitot Rīgas
            starptautisko lidostu. Vislabākie kursi parasti centra bankās un
            Marika maiņas tīklā.
          </p>
          <p>
            Ja jūs nevēlaties nēsāt skaidru naudu līdzi, alternatīva ir IAUI
            licencēts{' '}
            <Link href="/" className="underline decoration-line hover:decoration-carmine-500">
              online kazino
            </Link>{' '}
            ar starptautisku karšu atbalstu — Optibet, OlyBet, Tonybet visi
            pieņem ārvalstu izsniegtas Visa/Mastercard kartes.
          </p>

          <h2>Valodas atbalsts</h2>
          <p>
            Latviešu valoda — obligāta visās IAUI licencētajās vietās. Bet
            personāla daudzvalodība atšķiras pa pilsētām un atrašanās
            vietām:
          </p>
          <ul>
            <li>
              <strong>Rīga (Olympic Park, Olympic Voyage, Klondaika):</strong>{' '}
              latviešu, krievu, angļu, dažās vietās — vācu, somu.
            </li>
            <li>
              <strong>Jūrmala (Olympic Voyage):</strong> sezonāli pastiprināts
              angļu, krievu, vācu atbalsts vasaras tūrisma sezonā.
            </li>
            <li>
              <strong>Daugavpils, Rēzekne:</strong> latviešu un krievu — angļu
              atbalsts ierobežots.
            </li>
            <li>
              <strong>Liepāja, Ventspils:</strong> latviešu, krievu, angļu
              pieņemamā līmenī.
            </li>
            <li>
              <strong>Mazākas spēļu zāles:</strong> galvenokārt latviešu un
              krievu.
            </li>
          </ul>

          <h2>Apģērba kodekss</h2>
          <p>
            Latvijas kazino apģērba prasības ir vidēji liberālas — smart
            casual ir pietiekams visās vietās. Daži uzsvari pa līmeņiem:
          </p>
          <ul>
            <li>
              <strong>Olympic Park Rīga (premium):</strong> klasiski džinsi,
              krekls vai polo, slēgti apavi. Sporta apavi parasti pieņemti.
              Šorti — ne vakara stundās.
            </li>
            <li>
              <strong>Olympic Voyage Jūrmala:</strong> vasarā mīkstāks, bet
              pludmales apģērbs (peldkostīms, šļūceniski) nav pieņemams.
            </li>
            <li>
              <strong>Klondaika Rīga un reģioni:</strong> tradicionāls smart
              casual.
            </li>
            <li>
              <strong>VIP zāles:</strong> krekls ar apkakli vai eleganta blūze;
              dažās vietās — žakete vakara stundās.
            </li>
            <li>
              <strong>Spēļu zāles:</strong> bez stingras kodeksa.
            </li>
          </ul>

          <h2>Transports un sasniedzamība no Rīgas lidostas</h2>
          <p>
            Rīgas starptautiskā lidosta atrodas aptuveni 10 km no pilsētas
            centra. Taksometrs — €15–€20 līdz Vecrīgai vai centra kazino.
            Bolt vai Yandex Go aplikācijas darbojas. Sabiedriskais
            transports — 22. autobuss — kursē uz centrālo staciju (€2). No
            centrālās stacijas līdz Olympic Park vai Klondaika — gājiena
            attālumā.
          </p>
          <p>
            Uz Jūrmalu no Rīgas centra — vilciens (€2, ~35 min) vai taksometrs
            (€25–€35). Vasarā jārēķinās ar Jūrmalas iebraukšanas atļaujas
            maksu, ja braucat ar auto. Uz reģionālajām pilsētām (Liepāja,
            Daugavpils, Ventspils) — autobusi no Rīgas autoostas, biļetes
            €10–€20.
          </p>

          <h2>Praktiski padomi un nerakstītie noteikumi</h2>
          <p>
            Dzeramnauda nav obligāta, bet ir izplatīta — dīleru vai personālu
            par labu apkalpošanu novērtē ar €5–€20 atkarībā no sesijas
            izmēra. Telefoni pie galda — neformāli atturēti, dažās vietās
            stingri aizliegti. Fotografēšana — gandrīz visās vietās aizliegta
            bez iepriekšējas atļaujas; tas attiecas gan uz personālu, gan uz
            citiem spēlētājiem.
          </p>
          <p>
            Skaidrā naudā par dzērieniem — Olympic un Klondaika tīklos VIP
            klienti bieži saņem dzērienus bez maksas spēles laikā. Standarta
            klientiem alkohols ir maksas, bet pieejams.
          </p>

          <h2>Labākās tūristu kazino vietas Latvijā</h2>
          <ol>
            <li>
              <strong>Olympic Park Casino Rīga</strong> — lielākais un
              elegantākais kazino Latvijā, augstas klases VIP zāles, plašs
              live dīleru klāsts.
            </li>
            <li>
              <strong>Olympic Voyage Casino Jūrmala</strong> — kurorta
              atmosfēra, ideāls vasaras nedēļas nogales kombinācijai ar SPA.
            </li>
            <li>
              <strong>Klondaika Rīga</strong> — tradicionāls latviešu zīmols ar
              zelta drudža estētiku.
            </li>
            <li>
              <strong>Olympic Casino Daugavpils</strong> — labākā opcija
              austrumu Latvijas viesiem, krievu valodas atbalsts.
            </li>
            <li>
              <strong>Olympic Casino Liepāja</strong> — Kurzemes piekrastes
              opcija, mierīgāka atmosfēra.
            </li>
          </ol>

          <h2>Drošības un finanšu padomi ārvalstu viesiem</h2>
          <p>
            Lieli skaidras naudas darījumi piesaista uzmanību — gan kazino
            personāla, gan dažkārt no malas. Iesakām neiet uz kazino ar
            visu naudu kabatā; izmantojiet viesnīcas seifu lielākajām summām
            un nesiet sev līdzi tikai plānoto sesijas budžetu plus mēreno
            rezervi. KYC procedūra no €2000 viena depozīta nozīmē, ka kazino
            tehniski reģistrēs jūsu identitāti un summu — tas ir IAUI prasība
            pret naudas atmazgāšanas riskiem, nevis kazino izvēle.
          </p>
          <p>
            Skaidras naudas izmaksa pēc laimes tiek veikta tūlītēji eiro
            banknotēs lielākajām summām (līdz €5000) vai ar bankas pārskaitījumu
            uz norādīto kontu lielākiem laimestiem. Eksportējot lielas naudas
            summas no Latvijas (virs €10 000), Eiropas Savienības robežu
            kontrolē ir obligāti deklarēt summu — tas attiecas uz visiem
            ES iekšējiem un ārējiem robežu šķērsojumiem.
          </p>
          <p>
            Kartes apmaksas — Visa un Mastercard tiek pieņemtas lielākajos
            Rīgas kazino. American Express — retāk. Skaidras naudas
            izņemšana no automātiem Latvijā ir vidēja maksa €3–€5 par
            transakciju, plus jūsu bankas konvertēšanas maksa. Lielāko
            ASV un Apvienotās Karalistes banku karšu lietotājiem ir vērts
            iepriekš pārbaudīt savas bankas ārvalstu darījumu maksas.
          </p>

          <h2>Sezonālas atšķirības un labākais apmeklējuma laiks</h2>
          <p>
            Latvijas kazino aina nav lineāra visa gada garumā. Vasaras sezona
            (jūnijs–augusts) — Jūrmala ir kulminācijā, Rīgas kazino noslodze
            palielinās ar Vecrīgas tūristu plūsmu, festivālu nedēļas nogales
            rada periodiski augstu pieprasījumu. Šajā periodā labākās VIP
            zonas iepriekšēja rezervēšana ir ieteicama, un dažas augstas
            klases vakara programmas ir pilnas.
          </p>
          <p>
            Rudens (septembris–novembris) — kazino kalendāra augstākais
            punkts pokera turnīriem. Olympic Park Rīgā un Klondaika periodiski
            organizē reģionāla mēroga Texas Hold&apos;em turnīrus, kuros
            piedalās dalībnieki no visas Baltijas. Ja jūs interesē turnīra
            spēle, septembris–novembris ir vislabākais laiks.
          </p>
          <p>
            Ziema (decembris–februāris) — mērenāka plūsma, mierīgāka
            atmosfēra. Klusākas VIP zāles, lielāka iespēja iegūt personīgu
            apkalpošanu. Ziemas svētku periodā (decembra trešā un ceturtā
            nedēļa) daudzas Rīgas kazino piedāvā tematiskus vakarus.
          </p>
          <p>
            Pavasaris (marts–maijs) — līdzīgi mērena. Aprīlis un maijs ir
            vasaras sezonas sākums Jūrmalā, bet Rīga vēl darbojas
            ārpussezonā. Tas padara šo periodu par labu kompromisu.
          </p>

          <h2>Online alternatīva tūristiem</h2>
          <p>
            Ja jūsu apmeklējums ir īss vai grafiks neļauj klātienes
            apmeklējumu, IAUI licencēti online operatori pieņem ārvalstu
            viesus ar derīgu ES adresi vai bankas konts ar SEPA atbalstu.{' '}
            <Link href="/kazino/olybet/" className="underline decoration-line hover:decoration-carmine-500">
              OlyBet
            </Link>{' '}
            ir Olympic Entertainment Group online produkts un atbalsta
            angļu, latviešu, krievu un dažas Baltijas valodas. Citi populāri
            varianti —{' '}
            <Link href="/kazino/optibet/" className="underline decoration-line hover:decoration-carmine-500">
              Optibet
            </Link>{' '}
            un{' '}
            <Link href="/kazino/tonybet/" className="underline decoration-line hover:decoration-carmine-500">
              Tonybet
            </Link>
            .
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Saistīts</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/sauszemes-kazino/riga/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Sauszemes kazino Rīgā — pilns ceļvedis
              </Link>
            </li>
            <li>
              <Link href="/sauszemes-kazino/jurmala/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Olympic Voyage un Jūrmalas kazino aina
              </Link>
            </li>
            <li>
              <Link href="/sauszemes-kazino/etikete/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Kazino etiķete Latvijā
              </Link>
            </li>
          </ul>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-mute">
          Spēlējiet atbildīgi. 18+.{' '}
          <Link href="/atbildiga-spele/" className="underline decoration-line hover:decoration-carmine-500">
            Atbildīgas spēles ceļvedis
          </Link>
          .
        </p>
      </article>
    </>
  );
}
