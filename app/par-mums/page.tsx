import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, personSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Par mums — OnlineKazino.com redakcija',
  description: trimDescription(
    'Iepazīstieties ar OnlineKazino.com komandu, mūsu misiju un redakcionālajiem standartiem. Neatkarīgs Latvijas online kazino ceļvedis.',
  ),
  path: '/par-mums/',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Par mums', href: '/par-mums/' },
          ]),
          personSchema('aldis-skuja'),
          personSchema('anna-jansons'),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/par-mums/', label: 'Par mums' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Par mums</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Par OnlineKazino.com
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            OnlineKazino.com ir neatkarīgs Latvijas online kazino ceļvedis,
            dibināts ar mērķi sniegt godīgu, izpētes balstītu informāciju par
            IAUI licencētiem operatoriem un atbildīgu spēli.
          </p>
        </header>

        <section className="prose-editorial mt-12">
          <h2>Mūsu misija</h2>
          <p>
            Mēs uzskatām, ka Latvijas spēlētājiem ir jāsaņem skaidra, godīga
            informācija pirms reģistrēšanās jebkurā online kazino. Daudzi
            ceļveži tirgū priekšroku dod operatoriem, kuri maksā vislielāko
            komisiju, nevis tiem, kuri patiešām piedāvā labāko pieredzi. Mēs
            esam apņēmušies darīt pretēji.
          </p>

          <h2>Kā mēs strādājam</h2>
          <ul>
            <li>
              <strong>Pārskatām tikai IAUI licencētus operatorus.</strong>{' '}
              Operatori, kas darbojas Latvijā bez derīgas licences, mūsu
              ceļvedī neparādās.
            </li>
            <li>
              <strong>Vienota vērtēšanas metodoloģija.</strong> Visi operatori
              tiek vērtēti pēc vienādiem kritērijiem — skat.{' '}
              <a href="/metodologija/">vērtēšanas metodoloģiju</a>.
            </li>
            <li>
              <strong>Personīgi testēšana.</strong> Mūsu redaktori reģistrējas
              katrā operatorā, veic depozītu, spēlē un izņem laimestus, lai
              novērtētu pieredzi no spēlētāja viedokļa.
            </li>
            <li>
              <strong>Caurspīdīga monetizācija.</strong> Mēs saņemam komisiju
              par reģistrācijām caur mūsu saitēm, taču tas neietekmē
              vērtējumus. Skat.{' '}
              <a href="/redakcionala-politika/">redakcionālo politiku</a>.
            </li>
          </ul>

          <h2>Komanda</h2>
          <h3>Aldis Skuja, galvenais redaktors</h3>
          <p>
            Aldis ir azartspēļu industrijas analītiķis ar vairāk nekā 12 gadu
            pieredzi Baltijas tirgū. Viņš atbild par redakcionālajiem
            standartiem, faktu pārbaudi un partneru attiecībām.
          </p>

          <h3>Anna Jansons, vecākā satura autore</h3>
          <p>
            Anna raksta par online kazino, bonusiem un spēļu stratēģijām kopš
            2018. gada. Viņas specializācija ir maksājumu metodes Latvijas
            kontekstā un atbildīgas spēles ceļveži.
          </p>

          <h2>Sazinieties ar mums</h2>
          <p>
            E-pasts:{' '}
            <a href="mailto:redakcija@onlinekazino.com">
              redakcija@onlinekazino.com
            </a>
            <br />
            Drošības pārkāpumiem un atbildīgas spēles jautājumiem:{' '}
            <a href="mailto:atbildigaspele@onlinekazino.com">
              atbildigaspele@onlinekazino.com
            </a>
          </p>
        </section>
      </article>
    </>
  );
}
