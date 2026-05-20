import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import {
  getArticleCategories,
  getArticlesByCategory,
} from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getArticleCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const cat = getArticleCategories().find((c) => c.slug === params.slug);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.label} — Raksti par ${cat.label.toLowerCase()}`,
    description: trimDescription(
      `Visi mūsu raksti kategorijā "${cat.label}". ${cat.count} raksti par šo tēmu.`,
    ),
    path: `/raksti/kategorija/${cat.slug}/`,
  });
}

export default function CategoryPage({ params }: Props) {
  const cat = getArticleCategories().find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const articles = getArticlesByCategory(params.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Raksti', href: '/raksti/' },
          { name: cat.label, href: `/raksti/kategorija/${cat.slug}/` },
        ])}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/raksti/', label: 'Raksti' },
              { href: `/raksti/kategorija/${cat.slug}/`, label: cat.label },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Kategorija</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
              {cat.label}
            </h1>
            <p className="mt-4 text-ink-mute">
              {cat.count} {cat.count === 1 ? 'raksts' : 'raksti'} šajā kategorijā.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.slug}>
              <h2 className="font-serif text-xl font-semibold leading-snug tracking-tightish text-ink">
                <Link href={`/raksti/${a.slug}/`} className="hover:text-carmine-700">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
