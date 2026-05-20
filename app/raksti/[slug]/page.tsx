import Link from 'next/link';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorBio } from '@/components/AuthorBio';
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from '@/lib/data';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

const AUTHOR_SLUGS: Record<string, string> = {
  annab: 'anna-jansons',
  dt_admin: 'aldis-skuja',
};

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = getArticleBySlug(params.slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title,
    description: trimDescription(a.excerpt),
    path: `/raksti/${a.slug}/`,
    type: 'article',
    publishedTime: a.publishedAt,
    modifiedTime: a.modifiedAt,
    authors: [
      AUTHOR_SLUGS[a.author] === 'anna-jansons' ? 'Anna Jansons' : 'Aldis Skuja',
    ],
    og: {
      eyebrow: a.categories[0]?.label ?? 'Raksts',
      meta: AUTHOR_SLUGS[a.author] === 'anna-jansons' ? 'Anna Jansons' : 'Aldis Skuja',
    },
  });
}

export default function ArticlePage({ params }: Props) {
  const a = getArticleBySlug(params.slug);
  if (!a) notFound();

  const authorSlug = AUTHOR_SLUGS[a.author];
  const breadcrumb = breadcrumbSchema([
    { name: 'Sākums', href: '/' },
    { name: 'Raksti', href: '/raksti/' },
    { name: a.title, href: `/raksti/${a.slug}/` },
  ]);
  const article = articleSchema(a, authorSlug);

  const related = getArticles()
    .filter(
      (other) =>
        other.slug !== a.slug &&
        other.categories.some((c) =>
          a.categories.some((ac) => ac.slug === c.slug),
        ),
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd data={[breadcrumb, article]} />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/raksti/', label: 'Raksti' },
            { href: `/raksti/${a.slug}/`, label: a.title },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          {a.categories[0] && (
            <Link
              href={`/raksti/kategorija/${a.categories[0].slug}/`}
              className="eyebrow hover:text-carmine-700"
            >
              {a.categories[0].label}
            </Link>
          )}
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
            {a.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {a.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-mute">
            <span>
              {a.author === 'annab' ? 'Anna Jansons' : 'Aldis Skuja'}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
            {a.modifiedAt && a.modifiedAt !== a.publishedAt && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Atjaunināts <time dateTime={a.modifiedAt}>{formatDate(a.modifiedAt)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{Math.max(2, Math.round(a.wordCount / 200))} min lasīšanas</span>
          </div>
        </header>

        {authorSlug && (
          <div className="mt-10">
            <AuthorBio slug={authorSlug} />
          </div>
        )}

        <div
          className="prose-editorial mt-10"
          dangerouslySetInnerHTML={{ __html: a.content }}
        />

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-12">
            <p className="eyebrow">Lasīt vēl</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
              Saistīti raksti
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/raksti/${r.slug}/`}
                    className="font-serif text-base font-semibold text-ink hover:text-carmine-700"
                  >
                    {r.title}
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-soft">
                    {r.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
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
