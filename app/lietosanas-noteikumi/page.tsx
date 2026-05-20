import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Lietošanas noteikumi — OnlineKazino.com',
  description: trimDescription(
    'OnlineKazino.com lietošanas noteikumi. Vecuma ierobežojumi, saturas izmantošana, atbildības ierobežojumi un piemērojamais likums.',
  ),
  path: '/lietosanas-noteikumi/',
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Lietošanas noteikumi', href: '/lietosanas-noteikumi/' },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/lietosanas-noteikumi/', label: 'Lietošanas noteikumi' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Juridisks</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Lietošanas noteikumi
          </h1>
          <p className="mt-3 text-xs text-ink-mute">
            Spēkā no: 2026. gada 20. maijs
          </p>
        </header>

        <section className="prose-editorial mt-12">
          <h2>1. Saturas mērķis</h2>
          <p>
            OnlineKazino.com (turpmāk — "vietne") ir informatīvs ceļvedis par
            tiešsaistes kazino operatoriem, kas darbojas Latvijā. Vietnes
            saturs ir paredzēts izklaidei un izglītībai. Vietne nepiedāvā
            azartspēles tieši.
          </p>

          <h2>2. Vecuma ierobežojums</h2>
          <p>
            Vietne ir paredzēta tikai personām vecumā no <strong>18
            gadiem</strong>. Lietojot vietni, jūs apstiprināt, ka jums ir
            vismaz 18 gadu. Latvijā azartspēles personām, kuras nav
            sasniegušas šo vecumu, ir likumpārkāpums.
          </p>

          <h2>3. Atbildības ierobežojums</h2>
          <p>
            Vietnes saturs ir paredzēts vispārējai informācijai un nav
            uzskatāms par finanšu vai juridisku konsultāciju. Mēs
            cenšamies nodrošināt informācijas precizitāti, taču operatori var
            mainīt bonusus, noteikumus un pakalpojumus bez paziņojuma. Pirms
            reģistrēšanās jebkurā operatorā pārbaudiet aktuālos noteikumus
            tieši operatora mājaslapā.
          </p>
          <p>
            Mēs neuzņemamies atbildību par finanšu zaudējumiem, kas radušies
            no azartspēlēm. Spēlējiet tikai par naudu, ko varat atļauties
            zaudēt.
          </p>

          <h2>4. Affiliate attiecības</h2>
          <p>
            Mēs saņemam komisiju, kad lasītāji reģistrējas operatoros caur
            mūsu saitēm. Komisija neietekmē mūsu vērtējumus — visas pārskatu
            novērtējumus piešķir mūsu redaktori pirms partnerības līgumu
            noslēgšanas. Skat.{' '}
            <a href="/redakcionala-politika/">redakcionālo politiku</a>.
          </p>

          <h2>5. Intelektuālais īpašums</h2>
          <p>
            Vietnes saturs (raksti, dizains, logotips) ir OnlineKazino SIA
            īpašums vai tiek izmantots ar atbilstošu atļauju. Atļauta tikai
            personīga, nekomerciāla lietošana. Pārpublicēšanai nepieciešama
            rakstiska piekrišana.
          </p>

          <h2>6. Atbildīga spēle</h2>
          <p>
            Lietojot vietni, jūs apstiprināt, ka esat lasījis un piekrītat
            mūsu{' '}
            <a href="/atbildiga-spele/">atbildīgas spēles ceļvedim</a>. Ja jūs
            vai jūsu tuvinieks cīnās ar azartspēļu atkarību, sazinieties ar
            Skalbes krīzes centru: +371 67 222 922.
          </p>

          <h2>7. Piemērojamais likums</h2>
          <p>
            Šie noteikumi tiek interpretēti saskaņā ar Latvijas Republikas
            likumiem. Visus strīdus risinās Latvijas Republikas tiesas.
          </p>

          <h2>8. Saziņa</h2>
          <p>
            Jautājumus par šiem noteikumiem sūtiet uz{' '}
            <a href="mailto:redakcija@onlinekazino.com">
              redakcija@onlinekazino.com
            </a>
            .
          </p>
        </section>
      </article>
    </>
  );
}
