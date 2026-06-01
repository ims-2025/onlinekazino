import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Kazino vs spēļu zāle Latvijā — atšķirības 2026',
  description: trimDescription(
    'Pilnvērtīgs kazino, spēļu zāle, totalizators — kā atšķiras IAUI licences kategorijas Latvijā. Piedāvājums, likmes, klientūra, regulējumi un kur ko atrast.',
  ),
  path: '/sauszemes-kazino/spelu-zales/',
  type: 'article',
  og: { eyebrow: 'Atšķirības' },
});

export default function CasinoVsSlotHallPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Sauszemes kazino', href: '/sauszemes-kazino/' },
          { name: 'Kazino vs spēļu zāles', href: '/sauszemes-kazino/spelu-zales/' },
        ])}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/sauszemes-kazino/', label: 'Sauszemes kazino' },
            { href: '/sauszemes-kazino/spelu-zales/', label: 'Kazino vs spēļu zāles' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Atšķirības Latvijas regulējumā</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            Kazino vs spēļu zāle — kāpēc atšķirība ir svarīga
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            Latvijas Azartspēļu un izložu likums izšķir vairākas IAUI licences
            kategorijas. „Kazino” un „spēļu zāle” praksē izskatās līdzīgi
            iesācēja acīm, bet juridiski un piedāvājuma ziņā tās ir
            atšķirīgas — un izvēle starp tām maina jūsu vakara pieredzi.
          </p>
        </header>

        <section className="prose-editorial mt-10 max-w-prose">
          <h2>Licences kategorijas Latvijā</h2>
          <p>
            IAUI izsniedz vairāku veidu azartspēļu organizēšanas licences:
            kazino licence, spēļu zāles licence, totalizatora un derību
            licence, loteriju licence un interaktīvo (online) azartspēļu
            licence. Šajā rakstā fokusējamies uz pirmajām divām, jo tās
            attiecas uz klātienes apmeklējumu.
          </p>
          <p>
            Kazino licence atļauj piedāvāt visu klātienes azartspēļu klāstu:
            spēļu automātus, dzīvo dīleru galdu spēles (ruletes, blackjack,
            baccarat, pokeris), elektroniskos galdus un dažās konfigurācijās
            arī derību termināls. Spēļu zāles licence atļauj tikai automātus
            un dažās konfigurācijās — elektroniskos galda spēļu termināls
            (e-rulete, e-blackjack), bet bez dzīviem dīleriem.
          </p>

          <h2>Praktiskās atšķirības</h2>
          <p>
            <strong>Spēļu klāsts:</strong> Pilnvērtīgi kazino piedāvā ļoti
            plašu izvēli — 80–150 automāti, 5–15 dzīvi galdi, dažās vietās
            arī live pokers ar turnīriem. Spēļu zāles fokusētas uz automātiem
            — parasti 20–80 vienības — un dažās lielākās vietās ir
            elektroniskie galdi.
          </p>
          <p>
            <strong>Likmes:</strong> Kazino vidējās minimālās likmes
            automātos sākas no €0,05–€0,10, galda spēlēs no €2–€5 par numuru
            vai €5–€10 par roku. Spēļu zāles pieņem zemākas likmes — bieži no
            €0,01 par grieziena rindu — un kopumā piesaista budžeta
            apzinīgāku klientūru.
          </p>
          <p>
            <strong>Atmosfēra:</strong> Kazino ieguldīts apdarē — eleganta
            apgaismojums, dīlera uniforma, koktelu bāri, dažās vietās dzīvā
            mūzika vai izklaides programma. Spēļu zāles — funkcionālas, ar
            mazāku apdari, koncentrētas uz spēles efektivitāti.
          </p>
          <p>
            <strong>Klientūra:</strong> Kazino piesaista jauktu klientūru —
            tūristi, vakara izklaides meklētāji, augstas likmes spēlētāji,
            VIP klienti. Spēļu zāles bieži apkalpo regulārus vietējos
            spēlētājus, kuri ierodas īsākiem apmeklējumiem.
          </p>
          <p>
            <strong>Darba laiki:</strong> Lielākie kazino strādā 24 stundas
            diennaktī septiņas dienas nedēļā. Spēļu zāles — parasti no rīta
            līdz vēlam vakaram vai pusnaktij, dažas līdz pat 06:00.
          </p>
          <p>
            <strong>Apģērba kodekss:</strong> Kazino — smart casual vakara
            stundās. Spēļu zāles — bez stingra kodeksa.
          </p>

          <h2>Kur Latvijā ko meklēt</h2>
          <p>
            Pilnvērtīgi kazino koncentrēti sešās lielākajās pilsētās:{' '}
            <Link href="/sauszemes-kazino/riga/" className="underline decoration-line hover:decoration-carmine-500">
              Rīgā
            </Link>{' '}
            (12+ atrašanās vietas),{' '}
            <Link href="/sauszemes-kazino/liepaja/" className="underline decoration-line hover:decoration-carmine-500">
              Liepājā
            </Link>
            ,{' '}
            <Link href="/sauszemes-kazino/daugavpils/" className="underline decoration-line hover:decoration-carmine-500">
              Daugavpilī
            </Link>
            ,{' '}
            <Link href="/sauszemes-kazino/jurmala/" className="underline decoration-line hover:decoration-carmine-500">
              Jūrmalā
            </Link>
            ,{' '}
            <Link href="/sauszemes-kazino/ventspils/" className="underline decoration-line hover:decoration-carmine-500">
              Ventspilī
            </Link>{' '}
            un{' '}
            <Link href="/sauszemes-kazino/jelgava/" className="underline decoration-line hover:decoration-carmine-500">
              Jelgavā
            </Link>
            . Spēļu zāles ir izkliedētas pa visu Latviju — vairākos
            simtos vietu, ieskaitot mazākās pilsētas, dažus pierobežas
            ciematus un lielo tirdzniecības centru telpas.
          </p>

          <h2>Regulējumu specifika</h2>
          <p>
            Abas kategorijas IAUI uzrauga vienlīdz stingri — vecuma cenzs
            18+, PPR atbilstība, KYC procedūras, atbildīgas spēles
            instrumenti. Bet ir dažas atšķirības:
          </p>
          <ul>
            <li>
              <strong>Atrašanās vieta:</strong> kazino licences izsniegtas
              ar stingrākiem teritoriālajiem nosacījumiem — nedrīkst būt
              tieši pie skolām, baznīcām vai sociālajiem dienestiem.
              Spēļu zāles licencētas ar mazāk stingriem ierobežojumiem,
              bet ne tieši dzīvojamos rajonos.
            </li>
            <li>
              <strong>Audita pārbaudes:</strong> kazino RTP atbilstība
              tiek pārbaudīta biežāk — parasti reizi sešos mēnešos, dažās
              vietās biežāk. Spēļu zāles automāti — reizi gadā vai pēc
              IAUI iniciatīvas.
            </li>
            <li>
              <strong>Darbinieku sertifikācija:</strong> dīleri pilnvērtīgos
              kazino jāiziet specializētu apmācību un IAUI eksāmenu. Spēļu
              zāļu personāls — bāzes apmācība bez specializētas
              sertifikācijas.
            </li>
          </ul>

          <h2>Kura opcija jums piemērota?</h2>
          <p>
            <strong>Izvēlieties kazino</strong>, ja vēlaties pilnu pieredzi ar
            dzīviem dīleriem un galda spēlēm, ja meklējat vakara izklaidi un
            atmosfēru, ja plānojat lielākas likmes vai vēlaties izmēģināt VIP
            piedāvājumu, vai ja apmeklējat Latviju kā tūrists.
          </p>
          <p>
            <strong>Izvēlieties spēļu zāli</strong>, ja jums interesē tikai
            automāti, ja vēlaties zemākas likmes un budžeta apzinīgāku spēli,
            ja meklējat ātru īsu apmeklējumu (15–30 min) bez sociāla
            konteksta, vai ja dzīvojat mazākā pilsētā, kur pilnvērtīgs
            kazino nav pieejams.
          </p>

          <h2>Trešā opcija: online</h2>
          <p>
            Ja ne kazino, ne spēļu zāle nešķiet pilnvērtīga atbilde — vai ja
            attālums nav saprātīgs — IAUI licencēts online kazino apvieno abu
            opciju priekšrocības: pilnu galda spēļu klāstu kā kazino, automātu
            piedāvājuma plašumu daudz lielāku nekā jebkura sauszemes vieta,
            un pieejamību no jebkuras vietas Latvijā.
          </p>
          <p>
            Sk.{' '}
            <Link href="/sauszemes-kazino/online-vs-sauszemes/" className="underline decoration-line hover:decoration-carmine-500">
              Sauszemes vs online salīdzinājumu
            </Link>{' '}
            par detalizētu lēmuma pieņemšanas ceļvedi.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Saistīts</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/sauszemes-kazino/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Sauszemes kazino pilsētu ceļvedis
              </Link>
            </li>
            <li>
              <Link href="/sauszemes-kazino/online-vs-sauszemes/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Sauszemes vs online salīdzinājums
              </Link>
            </li>
            <li>
              <Link href="/metodologija/" className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
                Mūsu vērtēšanas metodoloģija
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
