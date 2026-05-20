import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Redakcionālā politika — OnlineKazino.com',
  description: trimDescription(
    'Mūsu redakcionālie standarti, faktu pārbaudes process, partnerattiecību caurspīdība un kļūdu labošanas politika.',
  ),
  path: '/redakcionala-politika/',
});

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Redakcionālā politika', href: '/redakcionala-politika/' },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/redakcionala-politika/', label: 'Redakcionālā politika' },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">Standarti</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            Redakcionālā politika
          </h1>
        </header>

        <section className="prose-editorial mt-12">
          <h2>1. Neatkarība</h2>
          <p>
            Redakcionālie lēmumi un vērtējumi ir pilnīgi neatkarīgi no
            komerciālajām attiecībām. Operatori, ar kuriem mums ir partnerības
            līgumi, nevar pieprasīt vērtējuma izmaiņas vai labvēlīgāku
            atspoguļojumu.
          </p>

          <h2>2. Caurspīdīgums par komisijām</h2>
          <p>
            OnlineKazino.com saņem komisiju, kad lasītāji reģistrējas operatoros
            caur mūsu saitēm (mēs to saucam par "affiliate" ienākumu modeli).
            Šī komisija ir mūsu galvenais ienākumu avots un ļauj mums uzturēt
            vietni bez maksas lasītājiem. Visas komercsaites ir marķētas ar
            atribūtu <code>rel="sponsored nofollow"</code> atbilstoši Google
            vadlīnijām.
          </p>

          <h2>3. Faktu pārbaude</h2>
          <ol>
            <li>
              Visi pārskati un raksti tiek pārbaudīti pret operatoru oficiālo
              dokumentāciju un IAUI publiskajiem datiem.
            </li>
            <li>
              Skaitliskā informācija (RTP, bonusu summas, wagering) tiek
              salīdzināta ar vairākiem avotiem un atjaunināta vismaz reizi
              kvartālā.
            </li>
            <li>
              Juridisko un regulējumu informāciju pārskata mūsu galvenais
              redaktors pirms publicēšanas.
            </li>
          </ol>

          <h2>4. Kļūdu labošana</h2>
          <p>
            Ja jūs atklājat faktu kļūdu mūsu saturā, lūdzu, rakstiet uz{' '}
            <a href="mailto:redakcija@onlinekazino.com">
              redakcija@onlinekazino.com
            </a>
            . Mēs apņemamies pārbaudīt iesniegto informāciju 5 darbdienu laikā
            un, ja tā ir pareiza, labot rakstu un publicēt redakcionālo
            piezīmi.
          </p>

          <h2>5. Atbildīgas spēles standarts</h2>
          <p>
            Visās lapās redzam 18+ marķējumu un saites uz atbildīgas spēles
            resursiem. Mēs nepiedāvājam saturu, kas mudina spēlēt par naudu,
            ko nevarat atļauties zaudēt. Bonusu salīdzinājumos vienmēr
            izceļam wagering nosacījumus un citus T&amp;C, kas spēlētājiem ir
            jāzina pirms reģistrēšanās.
          </p>

          <h2>6. Mākslīgais intelekts</h2>
          <p>
            Mēs izmantojam AI rīkus kā palīglīdzekļus (gramatikas pārbaudei,
            tulkošanai, sākotnējiem rakstiem), bet visu galaverziju saturu
            pārskata cilvēks-redaktors. Pārskati un faktu apgalvojumi tiek
            balstīti uz redakcijas testēšanu, nevis ģenerētu saturu.
          </p>

          <h2>7. Komentāri un atsauksmes</h2>
          <p>
            Lasītāju iesniegtās atsauksmes par operatoriem tiek pārbaudītas
            pirms publicēšanas, lai novērstu spam un nepatiesas atsauksmes.
          </p>
        </section>
      </article>
    </>
  );
}
