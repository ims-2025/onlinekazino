import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Faq } from '@/components/Faq';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Atbildīga spēle Latvijā — Limiti, Pašatteikšanās, Atbalsts',
  description: trimDescription(
    'Atbildīgas spēles ceļvedis Latvijas spēlētājiem. Kā iestatīt limitus, pieteikties Pašatteikušos personu reģistrā un saņemt palīdzību azartspēļu atkarības gadījumā.',
  ),
  path: '/atbildiga-spele/',
});

const FAQ = [
  {
    q: 'Kas ir Pašatteikušos personu reģistrs?',
    a: 'Pašatteikušos personu reģistrs (PPR) ir Izložu un azartspēļu uzraudzības inspekcijas uzturēts valsts reģistrs, kurā persona var brīvprātīgi pieteikt sevi izslēgšanai no azartspēlēm uz noteiktu vai nenoteiktu termiņu. Iekļaušana ir bez maksas un attiecas uz visiem operatoriem, kas darbojas Latvijā.',
  },
  {
    q: 'Kā pieteikties Pašatteikušos personu reģistrā?',
    a: 'Pieteikšanās notiek elektroniski caur portālu Latvija.lv ar elektronisko parakstu vai bankas autorizāciju. Pēc pieteikuma iesniegšanas dati tiek pievienoti reģistram 24 stundu laikā.',
  },
  {
    q: 'Kā atpazīt azartspēļu atkarību?',
    a: 'Galvenās pazīmes: spēlēšana ar lielākām summām, lai panāktu to pašu emocionālo efektu; mēģinājumi atgūt zaudētos līdzekļus ("chasing"); slēpšana no ģimenes; finansiālas grūtības spēlēšanas dēļ; nespēja pārstāt, neskatoties uz vēlmi to darīt.',
  },
  {
    q: 'Kur saņemt palīdzību Latvijā?',
    a: 'Anonīmie azartspēlnieki (AA Latvijā) piedāvā tikšanās un atbalstu. Marta sociālo pakalpojumu centrs sniedz konsultācijas. Krīzes un konsultāciju centrs Skalbes (tālr. 67222922) — bezmaksas anonīma palīdzība krīzes situācijās. Ģimenes ārsts var izsniegt nosūtījumu pie psihiatra vai psihoterapeita.',
  },
];

export default function ResponsibleGamblingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Atbildīga spēle', href: '/atbildiga-spele/' },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/atbildiga-spele/', label: 'Atbildīga spēle' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Atbalsta resursi</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Atbildīga spēle
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Azartspēles ir izklaide, nevis veids, kā nopelnīt naudu. Atbildīga
            spēle nozīmē apzinātu izvēli un kontroli — laika, naudas, emociju.
            Šajā lapā atradīsiet praktiskus rīkus un Latvijā pieejamus atbalsta
            resursus.
          </p>
        </header>

        <section className="prose-editorial mt-12">
          <h2>Soļi atbildīgai spēlei</h2>
          <ol>
            <li>
              <strong>Iestatiet finansiālos limitus.</strong> Visi licencētie
              operatori ļauj iestatīt iemaksas, zaudējumu un sesijas limitus.
              Iestatiet tos pirms pirmās spēles, nevis pēc problēmas.
            </li>
            <li>
              <strong>Iestatiet laika limitus.</strong> Sesijas ilguma
              ierobežojums palīdz izvairīties no impulsīvas spēlēšanas.
            </li>
            <li>
              <strong>Nedzeniet zaudējumus.</strong> "Vēl viena likme, lai
              atgūtu" ir klasiskākā azartspēļu atkarības pazīme.
            </li>
            <li>
              <strong>Spēlējiet tikai ar naudu, ko varat atļauties zaudēt.</strong>{' '}
              Nekad neizmantojiet aizņemtu naudu vai nepieciešamus līdzekļus.
            </li>
            <li>
              <strong>Apsveriet pašatteikšanos.</strong> Ja jūtat, ka kontrole
              zūd, Pašatteikušos personu reģistrs ir konkrēts solis prom no
              spēles.
            </li>
          </ol>

          <h2>Atbalsta organizācijas Latvijā</h2>
          <ul>
            <li>
              <strong>Anonīmie azartspēlnieki Latvijā</strong> — bezmaksas
              tikšanās un savstarpējais atbalsts. Anonimitāte garantēta.
            </li>
            <li>
              <strong>Skalbes — krīzes un konsultāciju centrs</strong>:{' '}
              <a href="tel:+37167222922">+371 67 222 922</a> (24/7, anonīmi, bezmaksas).
            </li>
            <li>
              <strong>Marta sociālo pakalpojumu centrs</strong> — konsultācijas
              ģimenei un cilvēkiem ar atkarību.
            </li>
            <li>
              <strong>Ģimenes ārsts</strong> — pirmais kontaktpunkts
              medicīniskai palīdzībai un nosūtījumam.
            </li>
          </ul>

          <h2>Limitu iestatīšana operatoros</h2>
          <p>
            Visi IAUI licencētie operatori, par kuriem mēs rakstām, piedāvā
            sekojošus rīkus klienta profilā:
          </p>
          <ul>
            <li>Iemaksas limits — diennakts, nedēļas, mēneša</li>
            <li>Zaudējumu limits — diennakts, nedēļas, mēneša</li>
            <li>Sesijas ilguma limits</li>
            <li>"Reality check" — atgādinājumi par patērēto laiku</li>
            <li>Pašizslēgšanās uz noteiktu termiņu vai pastāvīgi</li>
          </ul>
          <p>
            Šie rīki ir bezmaksas. Limita samazināšana stājas spēkā nekavējoties,
            bet limita palielināšanai ir noteikts atvēsināšanas periods (parasti
            24 stundas) — tas ir tīši ieprogrammēts, lai pasargātu jūs no
            impulsīviem lēmumiem.
          </p>

          <h2>Pašatteikušos personu reģistrs (PPR)</h2>
          <p>
            PPR ir centralizēts reģistrs, kurā iekļaušanās uzliek visiem IAUI
            licencētajiem operatoriem juridisku pienākumu jūs neapkalpot.
            Pieteikums tiek iesniegts elektroniski un stājas spēkā 24 stundu
            laikā.
          </p>
          <p>
            Skat. detalizēto ceļvedi:{' '}
            <Link href="/atbildiga-spele/pasatteikuso-registrs/">
              Kā pieteikties Pašatteikušos personu reģistrā
            </Link>
            .
          </p>

          <h2>Nepilngadīgo aizsardzība</h2>
          <p>
            Latvijā azartspēles ir aizliegtas personām, kas jaunākas par{' '}
            <strong>18 gadiem</strong>. Operatori obligāti veic vecuma pārbaudi
            reģistrācijas brīdī. Vecākiem iesakām aktivizēt vecāku kontroles
            ierīcēs un pārrunāt azartspēļu riskus ar pusaudžiem.
          </p>
        </section>

        <section className="mt-16">
          <Faq items={FAQ} />
        </section>
      </article>
    </>
  );
}
