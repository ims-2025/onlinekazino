import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import {
  getGlossaryTopic,
  getGlossarySlugs,
  getAllGlossaryTopics,
} from '@/lib/glossary';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getGlossarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = getGlossaryTopic(params.slug);
  if (!t) return {};
  return buildMetadata({
    title: t.title,
    description: trimDescription(t.metaDescription),
    path: `/glosarijs/${params.slug}/`,
    type: 'article',
    og: { eyebrow: 'Glosārijs' },
  });
}

export default function GlossaryTopicPage({ params }: Props) {
  const t = getGlossaryTopic(params.slug);
  if (!t) notFound();
  const others = getAllGlossaryTopics().filter((x) => x.slug !== params.slug);

  // DefinedTermSet schema — helps Google understand this as a glossary
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: t.title,
    hasDefinedTerm: t.terms.map((tr) => ({
      '@type': 'DefinedTerm',
      name: tr.term,
      description: tr.definition,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Glosārijs', href: '/glosarijs/' },
            { name: t.title, href: `/glosarijs/${params.slug}/` },
          ]),
          definedTermSetSchema,
        ]}
      />

      <article className="mx-auto max-w-wrap px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/glosarijs/', label: 'Glosārijs' },
            { href: `/glosarijs/${params.slug}/`, label: t.title },
          ]}
        />

        <header className="mt-8 flag-rule pt-5 max-w-4xl">
          <p className="eyebrow">Glosārijs · {t.terms.length} termini</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {t.lede}
          </p>
        </header>

        <section className="mt-12">
          <dl className="space-y-8 max-w-prose">
            {t.terms.map((tr, i) => (
              <div
                key={i}
                className="border-l-2 border-carmine-200 pl-5"
                id={tr.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              >
                <dt className="font-serif text-xl font-semibold text-ink md:text-2xl">
                  {tr.term}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-ink-soft">
                  {tr.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 rounded-2xl border border-line bg-paper-soft p-7 md:p-10">
          <p className="eyebrow">Citi glosārija segmenti</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
            Citi terminoloģijas segmenti
          </h2>
          <ul className="mt-5 space-y-2 text-sm">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/glosarijs/${o.slug}/`}
                  className="text-carmine-700 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500"
                >
                  {o.topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-ink-mute">
          18+. Spēlējiet atbildīgi.{' '}
          <Link
            href="/atbildiga-spele/"
            className="underline decoration-line hover:decoration-carmine-500"
          >
            Atbildīgas spēles ceļvedis
          </Link>
          .
        </p>
      </article>
    </>
  );
}
