import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privātuma politika — OnlineKazino.com',
  description: trimDescription(
    'OnlineKazino.com privātuma politika. Kādus datus apkopojam, kā tos izmantojam, jūsu tiesības saskaņā ar VDAR (GDPR).',
  ),
  path: '/privatuma-politika/',
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Privātuma politika', href: '/privatuma-politika/' },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/privatuma-politika/', label: 'Privātuma politika' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">VDAR (GDPR) atbilstība</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Privātuma politika
          </h1>
          <p className="mt-3 text-xs text-ink-mute">
            Spēkā no: 2026. gada 20. maijs
          </p>
        </header>

        <section className="prose-editorial mt-12">
          <h2>1. Pārzinis</h2>
          <p>
            Šī privātuma politika apraksta, kā OnlineKazino SIA (turpmāk —
            "mēs") apkopo, izmanto un aizsargā informāciju, ko jūs sniedzat,
            apmeklējot mājaslapu <strong>onlinekazino.com</strong>.
          </p>

          <h2>2. Kādus datus mēs apkopojam</h2>
          <ul>
            <li>
              <strong>Apmeklējuma analītika:</strong> anonimizēti dati par
              apmeklētajām lapām, sesijas ilgumu, ierīces tipu un aptuvenu
              ģeogrāfisko atrašanās vietu (valsts līmenī). Nesekojam
              individuālos lietotājus starp mājaslapām.
            </li>
            <li>
              <strong>Saziņas dati:</strong> ja jūs sazināties ar mums caur
              e-pastu, mēs saglabājam jūsu ziņojumu un kontaktinformāciju, lai
              atbildētu.
            </li>
            <li>
              <strong>Sīkdatnes:</strong> izmantojam tikai funkcionālās un
              analītiskās sīkdatnes — skat.{' '}
              <a href="/sikdatnes/">sīkdatņu politiku</a>.
            </li>
          </ul>

          <h2>3. Kā mēs izmantojam datus</h2>
          <ul>
            <li>Lai uzlabotu vietnes saturu un veiktspēju</li>
            <li>Lai atbildētu uz jūsu jautājumiem</li>
            <li>Lai izpildītu juridiskās prasības</li>
          </ul>
          <p>
            <strong>Mēs nepārdodam datus trešajām pusēm.</strong> Mēs
            neizmantojam jūsu datus reklāmas mērķiem.
          </p>

          <h2>4. Affiliate saites</h2>
          <p>
            Kad jūs noklikšķiniet uz saites uz operatoru (piem., "Apmeklēt
            kazino"), jūsu pārlūks tiek novirzīts uz operatora mājaslapu.
            Operators var izmantot savas sīkdatnes, lai sekotu, vai jūs
            reģistrējaties — uz tām attiecas attiecīgā operatora privātuma
            politika, nevis mūsu.
          </p>

          <h2>5. Jūsu tiesības (VDAR / GDPR)</h2>
          <ul>
            <li>Piekļuves tiesības — uzzināt, kādus datus glabājam</li>
            <li>Labošanas tiesības — labot neprecīzus datus</li>
            <li>Dzēšanas tiesības ("right to be forgotten")</li>
            <li>Pārnešanas tiesības</li>
            <li>Iebilstības tiesības pret datu apstrādi</li>
          </ul>
          <p>
            Lai izmantotu jebkuru no šīm tiesībām, rakstiet uz{' '}
            <a href="mailto:privatums@onlinekazino.com">
              privatums@onlinekazino.com
            </a>
            . Mēs atbildēsim 30 dienu laikā.
          </p>

          <h2>6. Datu drošība</h2>
          <p>
            Visa saziņa ar vietni notiek caur HTTPS šifrētu savienojumu.
            Glabājam datus tikai tik ilgi, cik nepieciešams to mērķim. Datu
            apstrādātāji ir tikai uzticami partneri, kuri atbilst VDAR
            prasībām.
          </p>

          <h2>7. Sūdzības</h2>
          <p>
            Ja uzskatāt, ka jūsu datu privātums ir pārkāpts, varat iesniegt
            sūdzību Datu valsts inspekcijā (
            <a href="https://www.dvi.gov.lv" target="_blank" rel="noopener noreferrer">
              www.dvi.gov.lv
            </a>
            ).
          </p>

          <h2>8. Politikas izmaiņas</h2>
          <p>
            Mēs varam atjaunināt šo politiku — visas izmaiņas tiks publicētas
            šajā lapā ar atjaunināto spēkā stāšanās datumu.
          </p>
        </section>
      </article>
    </>
  );
}
