import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { OperatorLogo } from '@/components/OperatorLogo';
import { RatingStars } from '@/components/RatingStars';
import { breadcrumbSchema, operatorReviewSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getComparison, getComparisonSlugs } from '@/lib/comparisons';
import { getOperatorBySlug } from '@/lib/data';
import type { Operator } from '@/lib/types';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const c = getComparison(params.slug);
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: trimDescription(c.intro),
    path: `/salidzinajumi/${params.slug}/`,
    type: 'article',
    og: { eyebrow: 'Tiešais salīdzinājums' },
  });
}

export default function ComparisonPage({ params }: Props) {
  const c = getComparison(params.slug);
  if (!c) notFound();

  const left = getOperatorBySlug(c.left);
  const right = getOperatorBySlug(c.right);
  if (!left || !right) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Salīdzinājumi', href: '/salidzinajumi/' },
            { name: c.title, href: `/salidzinajumi/${params.slug}/` },
          ]),
          operatorReviewSchema(left, 'aldis-skuja'),
          operatorReviewSchema(right, 'aldis-skuja'),
        ]}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/salidzinajumi/', label: 'Salīdzinājumi' },
            { href: `/salidzinajumi/${params.slug}/`, label: `${left.name} vs ${right.name}` },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Tiešais salīdzinājums</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {c.intro}
          </p>
        </header>

        {/* Side-by-side header --------------------------------------- */}
        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <OperatorCard operator={left} highlighted={c.winner === c.left} />
          <OperatorCard operator={right} highlighted={c.winner === c.right} />
        </section>

        {/* Comparison table ------------------------------------------ */}
        <section className="mt-14 overflow-hidden rounded-2xl border border-line bg-bone shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-soft text-left">
                <th className="w-[28%] px-5 py-4 text-2xs font-semibold uppercase tracking-widest2 text-ink-mute">
                  Kritērijs
                </th>
                <th className="px-5 py-4 font-serif text-base font-semibold text-ink">{left.name}</th>
                <th className="px-5 py-4 font-serif text-base font-semibold text-ink">{right.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <Row label="Kopējais vērtējums">
                <RatingCell value={left.ratings.overall} />
                <RatingCell value={right.ratings.overall} />
              </Row>
              <Row label="Drošība un licence">
                <span>{left.ratings.trust?.toFixed(1) ?? '—'} / 5</span>
                <span>{right.ratings.trust?.toFixed(1) ?? '—'} / 5</span>
              </Row>
              <Row label="Spēļu klāsts">
                <span>{left.ratings.games?.toFixed(1) ?? '—'} / 5</span>
                <span>{right.ratings.games?.toFixed(1) ?? '—'} / 5</span>
              </Row>
              <Row label="Bonusi">
                <span>{left.ratings.bonus?.toFixed(1) ?? '—'} / 5</span>
                <span>{right.ratings.bonus?.toFixed(1) ?? '—'} / 5</span>
              </Row>
              <Row label="Klientu atbalsts">
                <span>{left.ratings.customer?.toFixed(1) ?? '—'} / 5</span>
                <span>{right.ratings.customer?.toFixed(1) ?? '—'} / 5</span>
              </Row>
              <Row label="Licence">
                <span>{left.facets.licences.join(', ') || '—'}</span>
                <span>{right.facets.licences.join(', ') || '—'}</span>
              </Row>
              <Row label="Dibināts">
                <span>{left.facets.established ?? '—'}</span>
                <span>{right.facets.established ?? '—'}</span>
              </Row>
              <Row label="Īpašnieks">
                <span>{left.facets.owner ?? '—'}</span>
                <span>{right.facets.owner ?? '—'}</span>
              </Row>
              <Row label="Welcome bonuss">
                <span dangerouslySetInnerHTML={{ __html: left.bonus.shortDesc || '—' }} />
                <span dangerouslySetInnerHTML={{ __html: right.bonus.shortDesc || '—' }} />
              </Row>
              <Row label="Valodas">
                <FacetList items={left.facets.languages} />
                <FacetList items={right.facets.languages} />
              </Row>
              <Row label="Iemaksu metodes">
                <FacetList items={left.facets.depositMethods} />
                <FacetList items={right.facets.depositMethods} />
              </Row>
              <Row label="Izņemšanas metodes">
                <FacetList items={left.facets.withdrawalMethods} />
                <FacetList items={right.facets.withdrawalMethods} />
              </Row>
              <Row label="Spēļu izstrādātāji">
                <FacetList items={left.facets.software} />
                <FacetList items={right.facets.software} />
              </Row>
              <Row label="Ierīces">
                <FacetList items={left.facets.devices} />
                <FacetList items={right.facets.devices} />
              </Row>
            </tbody>
          </table>
        </section>

        {/* Verdict --------------------------------------------------- */}
        <section className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Redakcijas verdikts</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
            Ko mēs iesakām?
          </h2>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-soft">
            {c.verdict}
          </p>

          {c.winner !== 'tie' && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {[left, right].map((op) => {
                const isWinner = c.winner === op.slug;
                return (
                  <Link
                    key={op.slug}
                    href={`/go/${op.slug}/`}
                    rel="sponsored nofollow"
                    className={
                      isWinner
                        ? 'inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-carmine-500 px-6 py-3 text-base font-semibold text-paper hover:bg-carmine-600'
                        : 'inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-line bg-bone px-6 py-3 text-base font-medium text-ink-soft hover:text-ink'
                    }
                  >
                    {isWinner ? `Apmeklēt ${op.name} →` : `Apmeklēt ${op.name}`}
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Disclosure ----------------------------------------------- */}
        <section className="mt-14 rounded-xl border border-line bg-paper-soft p-6 text-xs leading-relaxed text-ink-mute md:p-7">
          <p>
            <strong className="text-ink">Caurspīdības atruna:</strong>{' '}
            OnlineKazino.com saņem komisiju, kad lasītāji reģistrējas operatoros
            caur mūsu saitēm. Komisija neietekmē vērtējumu — visi vērtējumi
            balstīti uz vienotu metodoloģiju. 18+. Spēlējiet atbildīgi.{' '}
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

function OperatorCard({ operator, highlighted }: { operator: Operator; highlighted: boolean }) {
  return (
    <article
      className={
        highlighted
          ? 'relative flex flex-col gap-4 rounded-2xl border-2 border-carmine-500 bg-bone p-7 shadow-lift'
          : 'flex flex-col gap-4 rounded-2xl border border-line bg-bone p-7 shadow-soft'
      }
    >
      {highlighted && (
        <span className="absolute -top-3 left-7 rounded-full bg-carmine-500 px-3 py-1 text-2xs font-bold uppercase tracking-widest2 text-paper">
          Mūsu izvēle
        </span>
      )}
      <div className="flex items-center gap-4">
        <OperatorLogo operator={operator} size={64} />
        <div>
          <Link
            href={`/kazino/${operator.slug}/`}
            className="font-serif text-2xl font-semibold tracking-tightish text-ink hover:text-carmine-700"
          >
            {operator.name}
          </Link>
          <div className="mt-1">
            <RatingStars value={operator.ratings.overall ?? 0} />
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft line-clamp-3">{operator.excerpt}</p>
      <div className="mt-auto flex items-center gap-3">
        <Link
          href={`/go/${operator.slug}/`}
          rel="sponsored nofollow"
          className="inline-flex items-center justify-center rounded-md bg-carmine-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-carmine-600"
        >
          Apmeklēt
        </Link>
        <Link
          href={`/kazino/${operator.slug}/`}
          className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:decoration-carmine-500"
        >
          Pilns apskats →
        </Link>
      </div>
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  const [a, b] = Array.isArray(children) ? children : [children, null];
  return (
    <tr className="align-top">
      <th
        scope="row"
        className="px-5 py-3.5 text-left text-2xs font-semibold uppercase tracking-widest2 text-ink-mute"
      >
        {label}
      </th>
      <td className="px-5 py-3.5 text-ink">{a}</td>
      <td className="px-5 py-3.5 text-ink">{b}</td>
    </tr>
  );
}

function RatingCell({ value }: { value: number | undefined }) {
  if (value === undefined) return <span>—</span>;
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-serif text-2xl font-semibold text-carmine-600">{value.toFixed(2)}</span>
      <span className="text-xs text-ink-mute">/ 5</span>
    </span>
  );
}

function FacetList({ items }: { items: string[] }) {
  if (!items || items.length === 0) return <span className="text-ink-mute">—</span>;
  return (
    <ul className="flex flex-wrap gap-1.5 text-xs">
      {items.slice(0, 8).map((it) => (
        <li key={it} className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-ink-soft">
          {it}
        </li>
      ))}
    </ul>
  );
}
