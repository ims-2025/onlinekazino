import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Kontakti — OnlineKazino.com redakcija',
  description: trimDescription(
    'Sazinieties ar OnlineKazino.com redakciju. E-pasts, atbildīgas spēles ziņojumi, partnerības pieprasījumi.',
  ),
  path: '/kontakti/',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Kontakti', href: '/kontakti/' },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/kontakti/', label: 'Kontakti' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Kontaktinformācija</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Sazinieties ar mums
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Redakcijai, partnerības pieprasījumiem un atbildīgas spēles
            jautājumiem mēs atsaucamies parasti 1-2 darbdienu laikā.
          </p>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-bone p-7 shadow-soft">
            <p className="eyebrow">Redakcija</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
              Vispārīgi jautājumi un satura ieteikumi
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Faktu kļūdas, ieteikumi rakstu tēmām, sadarbības iespējas.
            </p>
            <a
              href="mailto:redakcija@onlinekazino.com"
              className="mt-5 inline-block font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
            >
              redakcija@onlinekazino.com
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-bone p-7 shadow-soft">
            <p className="eyebrow">Atbildīga spēle</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
              Spēlmaņu drošības ziņojumi
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Ja jūs vai jūsu tuvinieks ir atkarīgs vai operators nav rīkojies
              atbilstoši — paziņojiet mums.
            </p>
            <a
              href="mailto:atbildigaspele@onlinekazino.com"
              className="mt-5 inline-block font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
            >
              atbildigaspele@onlinekazino.com
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-bone p-7 shadow-soft">
            <p className="eyebrow">Operatori un partneri</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
              Komerciālā komanda
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Operatoriem, kuri vēlas pārskatīt pārskatu, iesniegt jaunu bonusu
              vai apspriest partnerību.
            </p>
            <a
              href="mailto:partneri@onlinekazino.com"
              className="mt-5 inline-block font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
            >
              partneri@onlinekazino.com
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-bone p-7 shadow-soft">
            <p className="eyebrow">Krīzes palīdzība</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
              Tūlītēja palīdzība
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Skalbes krīzes un konsultāciju centrs — 24/7, anonīmi, bezmaksas.
            </p>
            <a
              href="tel:+37167222922"
              className="mt-5 inline-block font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
            >
              +371 67 222 922
            </a>
          </div>
        </section>

        <section className="prose-editorial mt-12">
          <h2>Juridiskie rekvizīti</h2>
          <p>
            OnlineKazino SIA<br />
            Reģistrācijas Nr.: [reģistrācijas numurs]<br />
            Adrese: [Rīga, Latvija]<br />
            E-pasts: <a href="mailto:info@onlinekazino.com">info@onlinekazino.com</a>
          </p>
        </section>
      </article>
    </>
  );
}
