import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Kazino etiķete Latvijā — nerakstītie noteikumi 2026',
  description: trimDescription(
    'Latvijas sauszemes kazino etiķete — apģērba kods, žetonu apiešanās, dzeramnauda, telefoni, žesti pie galda. Kā uzvesties premium klubu vidē.',
  ),
  path: '/sauszemes-kazino/etikete/',
  type: 'article',
  og: { eyebrow: 'Etiķete' },
});

export default function EtiquettePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Sauszemes kazino', href: '/sauszemes-kazino/' },
          { name: 'Etiķete', href: '/sauszemes-kazino/etikete/' },
        ])}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/sauszemes-kazino/', label: 'Sauszemes kazino' },
            { href: '/sauszemes-kazino/etikete/', label: 'Etiķete' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Nerakstītie noteikumi</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            Latvijas kazino etiķete
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            Latvijas sauszemes kazino nav stingri formāli kā Monte Karlo, bet
            tiem ir savs etiķetes kodekss — daļa rakstīta noteikumos pie
            ieejas, daļa skaidri tikai pieredzējušiem viesiem. Šeit ir
            praktiskais ceļvedis, kā uzvesties no ieiešanas līdz pat skaidras
            naudas izmaksai.
          </p>
        </header>

        <section className="prose-editorial mt-10 max-w-prose">
          <h2>Apģērbs</h2>
          <p>
            Lielākie Rīgas Olympic Park un Klondaika kazino vakara stundās
            sagaida smart casual standartu. Tas nozīmē: krekls ar apkakli vai
            polo, klasiski džinsi vai bikses, slēgti apavi. Vasarā šorti ir
            pieņemami līdz pat plkst. 20:00, pēc tam — biezāk noraidīti.
            Sieviešu apģērbs prasības ir mīkstākas — kleita, blūze ar
            biksēm vai svārkiem, slēgti apavi vai elegantas sandales.
          </p>
          <p>
            VIP zāles vakara stundās prasa augstāku — krekls ar apkakli
            (nevis polo) vai blūze, dažās vietās žakete. Sporta apavi VIP
            zonā pārsvarā nav pieņemti. Olympic Voyage Casino Jūrmalā vasaras
            sezonā uztur mīkstākas prasības gan vakara klubu, gan VIP
            piekļuvei.
          </p>
          <p>
            Spēļu zāles ārpus pilnvērtīgiem kazino ir bez stingra apģērba
            kodeksa — strādājošā apģērba apmeklējums ir pieņemts. Pludmales
            apģērbs (peldkostīms, pludmales sandales) tomēr aizliegts visās
            vietās.
          </p>

          <h2>Žetonu apiešanās un naudas darījumi</h2>
          <p>
            Pirms sēšanās pie galda iemainiet skaidru naudu kasiera vai pie
            paša galda — dīleris pieņems banknotes, izsauks kapteini
            apstiprināšanai un pārvērtīs naudu žetonos. Nekad neceliet naudu
            virs galda — nolieciet to lēnām uz norobežotā laukuma. Žetonus
            saudzīgi izvietojiet sev priekšā, neaizskariet tos pēc tam, kad
            dīleris ir paziņojis „Jokers&apos;ies neliek”.
          </p>
          <p>
            Pārmaiņas (vienkāršoti žetoni mazākiem nomināliem) prasiet
            mierīgi, izmantojot žestu — divus pirkstus, kas pārvietoti pār
            žetona kaudzi. Žetonus starp spēlētājiem nedod tieši — vienmēr
            ietur tirdzniecību caur dīleri.
          </p>
          <p>
            Pēc spēles beigām pārvērtiet visus žetonus kasiera vai dīlera
            (lielākās vietās — atsevišķā kasieres logā). Skaidrā nauda tiek
            izmaksāta eiro banknotēs. Lielāki laimesti (virs €2000) pieprasa
            identitātes pārbaudi un dažās vietās arī ienākumu izcelsmes
            apliecinājumu — sk.{' '}
            <Link href="/raksti/vai-laimesti-kazino-tiek-aplikti-ar-nodokliem-likumi-latvija/" className="underline decoration-line hover:decoration-carmine-500">
              kazino laimestu aplikšanu ar nodokļiem
            </Link>
            .
          </p>

          <h2>Dzeramnauda</h2>
          <p>
            Dzeramnauda nav obligāta Latvijā — gan likumdošanā, gan kultūrā.
            Bet tā ir praktizēta un labi pieņemta. Standarta jēdzieni:
          </p>
          <ul>
            <li>
              <strong>Dīlerim pēc lielas laimes:</strong> €5–€20 atkarībā no
              sesijas izmēra. Var dot tieši kā žetonu vai novietot kā
              „toke” likmi.
            </li>
            <li>
              <strong>Koktelu apkalpotājam:</strong> €1–€2 par dzērienu.
            </li>
            <li>
              <strong>VIP zonas konsjeržam:</strong> €10–€50 par labu
              apkalpošanu.
            </li>
            <li>
              <strong>Kapteinim, kurš jūs uzaicinājis VIP zonā:</strong>{' '}
              regulāriem viesiem — €20–€100 reizi mēnesī ar paliekošu
              attiecībām.
            </li>
          </ul>
          <p>
            Spēļu zāles personālam dzeramnaudu nedod — automātos viss process
            ir automatizēts, un personāls strādā kā uzraudzība, ne kā
            apkalpošana.
          </p>

          <h2>Pie galda — žesti un valoda</h2>
          <p>
            Visu klasisko galda spēļu (ruletes, blackjack, baccarat) žesti
            ir standartizēti starptautiski, bet Latvijas dīleri parasti
            sapratīs arī verbālas instrukcijas latviešu, krievu vai angļu
            valodā.
          </p>
          <p>
            <strong>Blackjack:</strong> „hit” (paņemt karti) — viegls saumīšanas
            žests pirkstgalā uz galda virsmas; „stand” (apstāties) — plakanas
            plaukstas malām pār kartēm; „double down” — papildu žetona
            novietošana blakus likmei; „split” — divu žetonu kaudzes blakus.
          </p>
          <p>
            <strong>Rulete:</strong> liek likmes mierīgi, kad dīleris ir
            paziņojis „Place your bets”. Kad dīleris saka „No more bets”,
            visas žetonu kustības ir aizliegtas — tas tiek uzraudzīts ar
            kamerām.
          </p>
          <p>
            <strong>Baccarat:</strong> minimāla iesaistīšanās — likmes uz
            Player, Banker vai Tie pirms partijas; spēlē tikai dīleris.
          </p>

          <h2>Telefoni un fotografēšana</h2>
          <p>
            Telefoni pie galda — neformāli, bet stingri atturēti. Lielākajos
            kazino zvanīšana pie galda ir aizliegta; SMS vai tīmekļa skatīšana
            mēdz tikt atļauta, bet tas ir vislabāk darīt soli atstāj no galda.
          </p>
          <p>
            Fotografēšana — gandrīz vienmēr aizliegta. Tas attiecas gan uz
            personālu, gan uz citiem spēlētājiem, gan pat uz pašu kazino
            interjeru bez iepriekšējas mārketinga atļaujas. Šo noteikumu
            ievēro stingri kā privātuma, tā arī drošības iemeslu dēļ.
          </p>

          <h2>Alkohola lietošana</h2>
          <p>
            Alkohola lietošana sauszemes kazino ir atļauta un izplatīta.
            Olympic un Klondaika lojalitātes klientiem dažus dzērienus piedāvā
            bez maksas spēles laikā. Bet pievērsiet uzmanību — alkohols
            samazina spriedumu, un visiem licencētajiem operatoriem ir
            tiesības atteikt apkalpošanu, ja apmeklētājs ir nepārprotami
            apreibinājies.
          </p>
          <p>
            Iesakām: vienu dzērienu uz vakaru, ūdens starpā, nekad nesāciet
            spēli dzēruma stāvoklī. Tas ir gan etiķetes, gan{' '}
            <Link href="/atbildiga-spele/" className="underline decoration-line hover:decoration-carmine-500">
              atbildīgas spēles
            </Link>{' '}
            pamatprincips.
          </p>

          <h2>Klusums un cita spēlētāja telpas respektēšana</h2>
          <p>
            Latvijas kazino kultūra ir pārsvarā klusa — pat lielu laimestu
            laikā uzvedība ir kontrolēta. Klani spēlētāji un komentārs par
            citu likmēm ir uzskatāmi par sliktu manieri. Citu spēlētāju
            žetonu pieskaršana — striktais aizliegums.
          </p>
          <p>
            Ja jūs vēlaties pievienoties galdam, kur jau notiek spēle,
            uzgaidiet pēc kārtējās partijas un palūdziet dīlerim ļaut
            iekārtoties. Nekad nepārtrauciet partiju pusceļā.
          </p>

          <h2>Kad iziet — beigu etiķete</h2>
          <p>
            Pēc spēles beigām dodiet dīlerim iespēju pateikt „Good game” vai
            ekvivalentu žestu. Ja vinnējāt — atstājiet dīlerim simbolisku
            žetonu (€2–€5 viņa „toke” kannā). Žetonus paši pārvērtiet kasiera
            vai dodiet kasierim ar dīlera signālu.
          </p>
          <p>
            Olympic Latvia Club kartes lietotāji atcerieties skenēt karti
            pirms iziešanas — tas reģistrē sesiju lojalitātes punktiem.
            Klondaika līdzīga programma.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Saistīts</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/sauszemes-kazino/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Pilsētu ceļvedis
              </Link>
            </li>
            <li>
              <Link href="/sauszemes-kazino/turistiem/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Tūristu ceļvedis
              </Link>
            </li>
            <li>
              <Link href="/sauszemes-kazino/spelu-zales/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Kazino vs spēļu zāles atšķirības
              </Link>
            </li>
            <li>
              <Link href="/speles/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Spēļu noteikumi un stratēģijas
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
