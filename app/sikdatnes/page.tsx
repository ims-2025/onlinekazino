import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sīkdatņu politika — OnlineKazino.com',
  description: trimDescription(
    'Kādas sīkdatnes mēs izmantojam un kāpēc. Pārvaldiet sīkdatņu preferences savā pārlūkprogrammā.',
  ),
  path: '/sikdatnes/',
});

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Sīkdatnes', href: '/sikdatnes/' },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/sikdatnes/', label: 'Sīkdatnes' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Sīkdatnes</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Sīkdatņu politika
          </h1>
        </header>

        <section className="prose-editorial mt-12">
          <h2>Kas ir sīkdatnes?</h2>
          <p>
            Sīkdatnes (angļu val. — <em>cookies</em>) ir nelieli teksta faili,
            ko vietne saglabā jūsu pārlūkprogrammā. Tās ļauj vietnei atcerēties
            jūsu preferences un sniegt labāku pieredzi.
          </p>

          <h2>Kādas sīkdatnes mēs izmantojam</h2>

          <h3>Stingri nepieciešamās sīkdatnes</h3>
          <p>
            Šīs sīkdatnes ir nepieciešamas vietnes pamatfunkcionalitātei
            (piem., saturas ielādei). Tās nesatur personīgi identificējamu
            informāciju un nevar tikt atspējotas.
          </p>

          <h3>Analītiskās sīkdatnes</h3>
          <p>
            Mēs izmantojam privātumu cienošu analītiku (Plausible vai Vercel
            Web Analytics), kas nesaglabā personīgi identificējamus datus un
            neseko lietotājus starp mājaslapām. Mēs neizmantojam Google
            Analytics, Facebook Pixel vai citus reklāmas trackera rīkus.
          </p>

          <h3>Affiliate sekošanas sīkdatnes</h3>
          <p>
            Kad jūs noklikšķiniet uz "Apmeklēt kazino" saites, operators var
            iestatīt savu sīkdatni jūsu pārlūkprogrammā, lai noteiktu, ka jūs
            atnācāt no mūsu vietnes. Šīs sīkdatnes pārvalda operators, nevis
            mēs.
          </p>

          <h2>Kā pārvaldīt sīkdatnes</h2>
          <p>
            Lielākā daļa pārlūkprogrammu ļauj kontrolēt sīkdatnes
            iestatījumos:
          </p>
          <ul>
            <li>
              <strong>Chrome:</strong> Iestatījumi → Privātums un drošība → Sīkdatnes
            </li>
            <li>
              <strong>Firefox:</strong> Iestatījumi → Privātums un drošība
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privātums
            </li>
            <li>
              <strong>Edge:</strong> Iestatījumi → Sīkdatnes un vietnes atļaujas
            </li>
          </ul>
          <p>
            Sīkdatņu atspējošana var ietekmēt vietnes funkcionalitāti, taču
            tā nepārtrauks saturas pieejamību.
          </p>

          <h2>Saziņa</h2>
          <p>
            Jautājumus par sīkdatnēm sūtiet uz{' '}
            <a href="mailto:privatums@onlinekazino.com">
              privatums@onlinekazino.com
            </a>
            .
          </p>
        </section>
      </article>
    </>
  );
}
