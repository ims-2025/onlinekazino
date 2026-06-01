import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import {
  getRegulationPage,
  getRegulationSlugs,
  getRegulationsMeta,
} from '@/lib/regulations';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getRegulationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getRegulationPage(params.slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: trimDescription(p.metaDescription),
    path: `/regulejumi/${params.slug}/`,
    type: 'article',
    og: { eyebrow: 'Regulējumi' },
  });
}

export default function RegulationPage({ params }: Props) {
  const p = getRegulationPage(params.slug);
  if (!p) notFound();
  const meta = getRegulationsMeta();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Regulējumi', href: '/regulejumi/' },
            { name: p.title, href: `/regulejumi/${params.slug}/` },
          ]),
          faqSchema(p.faq),
        ]}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/regulejumi/', label: 'Regulējumi' },
            { href: `/regulejumi/${params.slug}/`, label: p.title },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Regulējumi un likumdošana</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            {p.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {p.lede}
          </p>
        </header>

        {p.sections.map((s, i) => (
          <section key={i} className="mt-12 max-w-prose">
            <h2 className="font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
              {s.heading}
            </h2>
            <div className="prose-editorial mt-4">
              {s.body.split('\n\n').map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-14 max-w-prose">
          <Faq items={p.faq} />
        </section>

        <section className="mt-14 rounded-xl border border-line bg-paper-soft p-6 text-xs leading-relaxed text-ink-mute md:p-7">
          <p>
            <strong className="text-ink">Avoti un atruna:</strong> Šī lapa
            sniedz vispārīgu informāciju par Latvijas azartspēļu regulējumu
            balstītu uz publiski pieejamiem IAUI dokumentiem un Latvijas
            Tiesību aktu portāla saturu. Pēdējoreiz pārbaudīts:{' '}
            {meta.lastVerified}. Informācija nav juridiska konsultācija —
            specifiskos jautājumos sazinieties ar IAUI vai kvalificētu
            juristu.{' '}
            <a
              href={meta.primarySource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line hover:decoration-carmine-500"
            >
              IAUI oficiālā mājaslapa
            </a>
            .
          </p>
          <p className="mt-3">
            18+. Spēlējiet atbildīgi.{' '}
            <Link
              href="/atbildiga-spele/"
              className="underline decoration-line hover:decoration-carmine-500"
            >
              Atbildīgas spēles ceļvedis
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}
