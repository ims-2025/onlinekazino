import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { getArticles, getArticleCategories } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Raksti par online kazino — Padomi, Stratēģijas, Ceļveži',
  description: trimDescription(
    'Padziļināti raksti par online kazino spēlēm, bonusiem, maksājumu metodēm un atbildīgu spēli. Latvijas spēlētājiem rakstīts saturs.',
  ),
  path: '/raksti/',
});

export default function ArticlesIndexPage() {
  const articles = getArticles();
  const featured = articles[0];
  const rest = articles.slice(1);
  const categories = getArticleCategories().slice(0, 8);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Sākums', href: '/' },
          { name: 'Raksti', href: '/raksti/' },
        ])}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/raksti/', label: 'Raksti' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Žurnāls</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Raksti
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Latvijas spēlētājiem domāti ceļveži par bonusiem, maksājumiem,
              spēļu stratēģijām un atbildīgu spēli — rakstīti pieredzējušu autoru
              komandas.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 text-xs">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/raksti/kategorija/${c.slug}/`}
                  className="rounded-full border border-line bg-bone px-3 py-1.5 text-ink-soft transition hover:border-carmine-300 hover:text-carmine-700"
                >
                  {c.label} <span className="text-ink-faint">({c.count})</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        {featured && (
          <article className="mb-16 grid gap-8 border-b border-line pb-12 md:grid-cols-2 md:gap-12">
            <div>
              <span className="eyebrow">
                {featured.categories[0]?.label ?? 'Raksti'}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-5xl">
                <Link href={`/raksti/${featured.slug}/`} className="hover:text-carmine-700">
                  {featured.title}
                </Link>
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-ink-soft">
                {featured.excerpt}
              </p>
              <p className="mt-5 text-2xs uppercase tracking-widest2 text-ink-mute">
                {featured.author === 'annab' ? 'Anna Jansons' : 'Aldis Skuja'}
              </p>
            </div>
          </article>
        )}

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <article key={a.slug}>
              <span className="eyebrow">
                {a.categories[0]?.label ?? 'Raksti'}
              </span>
              <h2 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tightish text-ink">
                <Link href={`/raksti/${a.slug}/`} className="hover:text-carmine-700">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">
                {a.excerpt}
              </p>
              <p className="mt-4 text-2xs uppercase tracking-widest2 text-ink-mute">
                {a.author === 'annab' ? 'Anna Jansons' : 'Aldis Skuja'}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
