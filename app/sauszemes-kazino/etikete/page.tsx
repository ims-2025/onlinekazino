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

          <h2>VIP zonas etiķete — papildu noteikumi</h2>
          <p>
            Olympic Park un Klondaika VIP zonu piekļuve nāk ar paaugstinātām
            etiķetes prasībām. Apģērba kodekss ir striktākais — vīriešiem
            krekls ar apkakli vai dažās konfigurācijās žakete obligāta vakara
            stundās; sieviešu ekvivalents ir eleganta kleita vai biznesa
            stila ansamblis. Sporta apavi nav pieņemami. Klubu apavi ar
            mīkstu zoles materiālu ir piemērotākais izvēles veids.
          </p>
          <p>
            VIP zonu sociālā dinamika ir mērenāka un mierīgāka — mazāk
            spēlētāju pie galda, vairāk individuālas dīlera uzmanības.
            Tas nozīmē, ka etiķetes pārkāpumi ir redzamāki. Telefoni VIP
            zonā praktiski aizliegti — pat klusi ziņojumi var pievērst
            personālo uzmanību. Dzeramnauda mērenāka, bet personālāka —
            VIP klients, kurš regulāri atgriežas, bieži piedāvā fiksētu
            mēneša dzeramnaudu „savam” konsjeržam vai kapteinim, atkarīgi
            no ieguldījuma.
          </p>
          <p>
            Privātās VIP zāles — dažās lielākajās Olympic atrašanās vietās
            ir pieejamas pilnīgi privātas zāles ar dīleru, kuras klients var
            rezervēt iepriekš. Šādu vietu rezervācijas process notiek caur
            konsjeržu, parasti 24–48 stundas iepriekš. Apģērba un etiķetes
            prasības privātā zālē pielāgojas klienta vēlmēm, bet alkohola
            apkalpošana un fotografēšanas aizliegums saglabājas standarts.
          </p>

          <h2>Skaidras naudas un žetonu maiņas dinamika</h2>
          <p>
            Tipisks Olympic vai Klondaika kazino apmeklējums sākas ar
            skaidras naudas vai bankas kartes nodošanu kasieres logā, kur
            klients saņem žetonus. Pirmā transakcija parasti notiek viegli;
            arodu klienti zina, ka KYC pārbaude sākas pie €2000 viena
            depozīta. Ja jūs plānojat lielāku sesiju (€3000+), iesakām
            jau iepriekš noskaidrot KYC prasības tās konkrētā kazino —
            personu apliecinošs dokuments un dažās konfigurācijās arī
            finanšu izcelsmes apliecinājums tiek prasīts.
          </p>
          <p>
            Žetonu kategorijas — vienāds krāsu shēmas standarts visā Olympic
            tīklā: balti €1, sarkani €5, zaļi €25, melni €100, violeti €500,
            oranži €1000. Lielāku nomināla žetoni VIP zonās uzturēti zaļi-zelta
            tonalitātē. Klondaika izmanto līdzīgu, bet ne identisku shēmu.
            Vienmēr pārbaudiet žetonus pirms pirmās likmes — kasiere kļūdas
            ir retas, bet ne neeksistējošas.
          </p>
          <p>
            Žetonu izmaksa pēc sesijas — kasieres logā vai dažās lielākās
            vietās pie galda, ja dīleris ir apstiprinājis. Lielāku summu
            (€2000+) izmaksu parasti veic atsevišķā kasieres logā ar
            papildu identitātes pārbaudi. Mājām nesiet sev līdzi izziņu —
            tas var būt noderīgi nodokļu deklarācijas mērķiem, ja gada
            laimesti pārsniedz €3000 (Latvijas nodokļu likumdošanas
            slieksnis).
          </p>

          <h2>Sociālā dinamika pie galda — kā uzvesties profesionāli</h2>
          <p>
            Sauszemes kazino vide ir kolektīva — pie galda parasti spēlē
            5–8 cilvēki, un katra spēlētāja uzvedība ietekmē citu pieredzi.
            Pamatprincipi: nepieskarieties saviem žetoniem pēc dīlera „Nē
            vairāk likmju” paziņojuma; nekomentējiet citu spēlētāju izvēles
            (pat ja jūs uzskatāt, ka stratēģija ir neoptimāla); nedalieties
            ar savām likmju prognozēm vai sapņiem skaļi; klusi reaģējiet uz
            laimi vai zaudējumu.
          </p>
          <p>
            Blackjack galdā ir īpaši svarīgi neaiznest citu spēlētāju
            stratēģiju — daudzi vēsturiski uzskata, ka cita spēlētāja
            „nepareizs” gājiens (piemēram, hit ar 16 pret dīlera 10) maina
            visas tabulas izredzes. Matemātiski tas nav patiess: katra
            spēlētāja gājiens ietekmē tikai viņa pašu rezultātu. Bet
            sociāli šis mīts dzīvs un izpaužas sūdzībās, ja kāds spēlē
            ārpus „pamata stratēģijas”. Iesakām: ja jūs nepārzināt blackjack
            pamata stratēģiju, vai nu izvēlieties zemākas slodzes galdu, vai
            mācieties iepriekš online.
          </p>
          <p>
            Ruletes galdā sociālā dinamika ir mērenāka — katrs spēlētājs
            liek savas likmes, un cita spēlētāja izvēle tehniski nevar
            ietekmēt rezultātu. Bet etiķete saglabā: nepārklājiet savu
            likmju vietu virs cita spēlētāja žetoniem, un, ja likmju lauks
            ir blīvs, palūdziet dīlerim ievietot likmi.
          </p>

          <h2>Reakcija uz laimi vai zaudējumu</h2>
          <p>
            Latvijas kazino kultūra — atšķirībā no Las Vegas vai dažām
            Vidusjūras vietām — pārsvarā ir mierīga. Lielas laimes svētku
            izpaušana skaļi vai paceltu rokām nav pieņemta. Tas neizskatās
            netaktiski tikai dīlerim, bet arī citiem spēlētājiem, kuri var
            spēlēt zem laimes vai pat zaudēt blakus. Vidējais Latvijas
            kazino apmeklētājs reaģē uz lielu laimi ar mierīgu pasmaidi un
            varbūt dīlera apsveikuma toke. Tas ir kultūras parocīgums.
          </p>
          <p>
            Zaudējumi — vēl jo svarīgāka mierīga reakcija. Sasituma vai
            naidīgs verbāls izpaužums pret dīleri vai galda apkārtni var
            izraisīt brīdinājumu vai pat izdošanu ārā no kazino. Atcerieties
            — dīleris nesankcionē rezultātus, viņš tikai vada galda spēli.
            Ja jūs jūtaties emocionāli neapmierināti, atstājiet galda
            spēli, paejiet pastaigāties un pārtraucat sesiju.
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
