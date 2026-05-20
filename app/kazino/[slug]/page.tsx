import Link from 'next/link';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd';
import { Faq } from '@/components/Faq';
import { AuthorBio } from '@/components/AuthorBio';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RatingStars } from '@/components/RatingStars';
import { OperatorLogo } from '@/components/OperatorLogo';
import {
  getOperatorBySlug,
  getOperatorSlugs,
  getOperators,
} from '@/lib/data';
import {
  breadcrumbSchema,
  faqSchema,
  operatorReviewSchema,
} from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import type { Operator } from '@/lib/types';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getOperatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const op = getOperatorBySlug(params.slug);
  if (!op) return {};
  return buildMetadata({
    title: `${op.name} apskats 2026 — bonusi, spēles, atsauksmes`,
    description: trimDescription(
      op.excerpt ||
        `${op.name} pilns apskats: licence, welcome bonuss, spēļu klāsts, maksājumu metodes, mobilais kazino un klientu atbalsts. Vai šis ir labs operators Latvijas spēlētājiem?`,
    ),
    path: `/kazino/${op.slug}/`,
    type: 'article',
    publishedTime: op.publishedAt,
    modifiedTime: op.modifiedAt,
    authors: ['Anna Jansons'],
  });
}

function operatorFaq(op: Operator) {
  return [
    {
      q: `Vai ${op.name} ir licencēts Latvijā?`,
      a: `${op.name} ${op.facets.licences.length ? `darbojas ar šādām licencēm: ${op.facets.licences.join(', ')}.` : 'darbojas ar IAUI licenci Latvijas tirgū.'} Licences pārbaudi vienmēr varat veikt Izložu un azartspēļu uzraudzības inspekcijas oficiālajā mājaslapā iaui.gov.lv.`,
    },
    {
      q: `Kāds ir ${op.name} welcome bonuss?`,
      a: op.bonus.shortDesc
        ? stripTags(op.bonus.shortDesc)
        : `Aktuālais ${op.name} welcome bonuss tiek atjaunināts katru mēnesi — pārbaudiet tabulu šī apskata sākumā.`,
    },
    {
      q: `Kādas maksājumu metodes piedāvā ${op.name}?`,
      a:
        op.facets.depositMethods.length > 0
          ? `${op.name} pieņem šādas iemaksas metodes: ${op.facets.depositMethods.join(', ')}.`
          : `${op.name} pieņem populārākās Latvijas spēlētājiem pieejamās metodes — Swedbank Link, SEB, Trustly, Visa un MasterCard.`,
    },
    {
      q: `Cik ātri ${op.name} apstrādā izņemšanas?`,
      a: `Standarta izņemšanas pie ${op.name} parasti tiek apstrādātas 24-48 stundu laikā. Tūlītējās izņemšanas pieejamas konkrētām maksājumu metodēm pēc identitātes apstiprināšanas (KYC).`,
    },
    {
      q: `Vai ${op.name} ir mobilā lietotne?`,
      a:
        op.facets.devices.includes('Mobile') || op.facets.devices.length === 0
          ? `Jā, ${op.name} pilnībā darbojas mobilajās ierīcēs (Android un iOS), kā arī piedāvā responsīvu mājaslapu — atsevišķa lietotne nav obligāta.`
          : `${op.name} galvenokārt darbojas datorā; pārbaudiet ierīču saderību oficiālajā mājaslapā.`,
    },
  ];
}

export default function OperatorPage({ params }: Props) {
  const op = getOperatorBySlug(params.slug);
  if (!op) notFound();

  const faqItems = operatorFaq(op);
  const breadcrumb = breadcrumbSchema([
    { name: 'Sākums', href: '/' },
    { name: 'Kazino', href: '/kazino/' },
    { name: op.name, href: `/kazino/${op.slug}/` },
  ]);
  const review = operatorReviewSchema(op, 'anna-jansons');
  const faq = faqSchema(faqItems);

  const others = getOperators()
    .filter((o) => o.slug !== op.slug)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={[breadcrumb, review, faq]} />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/kazino/', label: 'Kazino' },
            { href: `/kazino/${op.slug}/`, label: op.name },
          ]}
        />

        <header className="mt-8 grid gap-10 md:grid-cols-[1.4fr,1fr] md:gap-12">
          <div className="flag-rule pt-5">
            <p className="eyebrow">Operatora apskats</p>
            <div className="mt-3 flex items-center gap-5">
              <OperatorLogo operator={op} size={72} className="hidden sm:inline-block" />
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tightish text-ink md:text-6xl">
                {op.name}
              </h1>
            </div>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
              {op.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <RatingStars value={op.ratings.overall ?? 0} size="lg" />
              <span className="text-xs text-ink-mute">
                Pēdējoreiz pārbaudīts:{' '}
                <time dateTime={op.modifiedAt ?? op.publishedAt}>
                  {formatDate(op.modifiedAt ?? op.publishedAt)}
                </time>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/go/${op.slug}/`}
                rel="sponsored nofollow"
                className="inline-flex items-center gap-2 rounded-md bg-carmine-500 px-6 py-3 text-base font-semibold text-paper transition hover:bg-carmine-600"
              >
                Apmeklēt {op.name}
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#apskats"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-bone px-5 py-3 text-sm font-medium text-ink-soft hover:text-ink"
              >
                Lasīt detalizēto apskatu
              </a>
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              Tikai pilngadīgiem spēlētājiem 18+ · Spēlējiet atbildīgi · Bonusam
              piemērojami T&amp;C
            </p>
          </div>

          {/* Sidebar fact card ------------------------------------------ */}
          <aside className="rounded-2xl border border-line bg-bone p-6 shadow-soft md:p-7">
            <p className="eyebrow">Operatora fakti</p>
            <h2 className="mt-2 font-serif text-lg font-semibold tracking-tightish text-ink">
              Vērtējuma sadalījums
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 text-sm">
              <Fact label="Kopējais vērtējums" value={op.ratings.overall?.toFixed(2) ?? '—'} accent />
              <Fact label="Drošība" value={op.ratings.trust?.toFixed(1) ?? '—'} />
              <Fact label="Spēļu klāsts" value={op.ratings.games?.toFixed(1) ?? '—'} />
              <Fact label="Bonusi" value={op.ratings.bonus?.toFixed(1) ?? '—'} />
              <Fact label="Klientu atbalsts" value={op.ratings.customer?.toFixed(1) ?? '—'} />
              <Fact label="Dibināts" value={op.facets.established ?? '—'} />
              {op.facets.licences.length > 0 && (
                <Fact
                  label="Licences"
                  value={op.facets.licences.slice(0, 2).join(', ')}
                  full
                />
              )}
              {op.facets.currencies.length > 0 && (
                <Fact
                  label="Valūtas"
                  value={op.facets.currencies.slice(0, 4).join(', ')}
                  full
                />
              )}
              {op.facets.languages.length > 0 && (
                <Fact
                  label="Valodas"
                  value={op.facets.languages.slice(0, 4).join(', ')}
                  full
                />
              )}
            </dl>
          </aside>
        </header>

        {/* Bonus highlight -------------------------------------------- */}
        {op.bonus.shortDesc && (
          <section
            aria-label="Welcome bonuss"
            className="mt-12 grid items-center gap-6 rounded-2xl border border-line bg-paper-soft p-7 md:grid-cols-[1fr,auto] md:p-8"
          >
            <div>
              <p className="eyebrow">Welcome bonuss</p>
              <p
                className="mt-2 font-serif text-2xl tracking-tightish text-ink md:text-3xl"
                dangerouslySetInnerHTML={{ __html: op.bonus.shortDesc }}
              />
              {op.bonus.termsDesc && (
                <p
                  className="mt-3 text-xs leading-relaxed text-ink-mute"
                  dangerouslySetInnerHTML={{ __html: op.bonus.termsDesc }}
                />
              )}
            </div>
            <Link
              href={`/go/${op.slug}/`}
              rel="sponsored nofollow"
              className="inline-flex items-center justify-center rounded-md bg-carmine-500 px-6 py-3 text-base font-semibold text-paper hover:bg-carmine-600"
            >
              Saņemt bonusu
            </Link>
          </section>
        )}

        {/* Body ------------------------------------------------------- */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[2fr,1fr]">
          <section id="apskats" className="prose-editorial">
            <AuthorBio slug="anna-jansons" />
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: op.content }}
            />
          </section>

          <aside className="space-y-5">
            <FacetCard title="Iemaksu metodes" items={op.facets.depositMethods} />
            <FacetCard title="Izņemšanas metodes" items={op.facets.withdrawalMethods} />
            <FacetCard title="Programmatūra" items={op.facets.software} />
            <FacetCard title="Ierīces" items={op.facets.devices} />
          </aside>
        </div>

        {/* FAQ ------------------------------------------------------- */}
        <section className="mt-20">
          <Faq items={faqItems} />
        </section>

        {/* Other operators ------------------------------------------ */}
        {others.length > 0 && (
          <section className="mt-20">
            <p className="eyebrow">Salīdzini ar</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl">
              Citi licencētie operatori
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/kazino/${o.slug}/`}
                    className="flex flex-col gap-1.5 rounded-xl border border-line bg-bone p-5 transition hover:border-carmine-200 hover:shadow-soft"
                  >
                    <span className="font-serif text-lg font-semibold text-ink">
                      {o.name}
                    </span>
                    <RatingStars
                      value={o.ratings.overall ?? 0}
                      size="sm"
                      showValue
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Disclosure ------------------------------------------------ */}
        <section className="mt-20 rounded-xl border border-line bg-paper-soft p-6 text-xs leading-relaxed text-ink-mute md:p-7">
          <p>
            <strong className="text-ink">Caurspīdības atruna:</strong>{' '}
            OnlineKazino.com saņem komisiju, kad jūs reģistrējaties{' '}
            {op.name} caur saiti šajā lapā. Komisija neietekmē mūsu vērtējumu —
            visus pārskatu novērtējumus piešķir mūsu redaktori, izmantojot
            vienotu metodoloģiju (skat.{' '}
            <Link href="/metodologija/" className="underline decoration-line hover:decoration-carmine-500">
              vērtēšanas metodoloģiju
            </Link>
            ).
          </p>
          <p className="mt-3">
            Bonusu piedāvājumi un nosacījumi var mainīties bez paziņojuma.
            Vienmēr pārbaudiet operatora oficiālos lietošanas noteikumus pirms
            depozīta veikšanas. Azartspēles var izraisīt atkarību. Spēlējiet
            atbildīgi.{' '}
            <Link href="/atbildiga-spele/" className="underline decoration-line hover:decoration-carmine-500">
              Atbildīgas spēles ceļvedis
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}

function Fact({
  label,
  value,
  full,
  accent,
}: {
  label: string;
  value: string;
  full?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <dt className="text-2xs uppercase tracking-widest2 text-ink-mute">
        {label}
      </dt>
      <dd className={`mt-1 font-medium ${accent ? 'font-serif text-2xl tracking-tightish text-carmine-600' : 'text-ink'}`}>
        {value}
      </dd>
    </div>
  );
}

function FacetCard({ title, items }: { title: string; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-xl border border-line bg-bone p-5 shadow-soft">
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs">
        {items.slice(0, 14).map((it) => (
          <li
            key={it}
            className="rounded-full border border-line bg-paper px-3 py-1 text-ink-soft"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('lv-LV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}
