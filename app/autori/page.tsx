import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, personSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getArticles } from '@/lib/data';

export const metadata = buildMetadata({
  title: 'Autori — OnlineKazino.com redakcija',
  description: trimDescription(
    'Iepazīstieties ar OnlineKazino.com redakcijas autoriem un viņu specializāciju. Visi pārskati un raksti tiek parakstīti.',
  ),
  path: '/autori/',
  og: { eyebrow: 'Redakcija' },
});

// WP author IDs → our author slugs (used to count articles per author)
const WP_TO_SLUG: Record<string, string> = {
  dt_admin: 'aldis-skuja',
  annab: 'anna-jansons',
};

export default function AuthorsIndexPage() {
  const articles = getArticles();
  const articleCounts = new Map<string, number>();
  for (const a of articles) {
    const slug = WP_TO_SLUG[a.author];
    if (slug) articleCounts.set(slug, (articleCounts.get(slug) ?? 0) + 1);
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Autori', href: '/autori/' },
          ]),
          personSchema('aldis-skuja'),
          personSchema('anna-jansons'),
        ]}
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-wrap px-4 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Sākums' },
              { href: '/autori/', label: 'Autori' },
            ]}
          />
          <div className="mt-8 flag-rule pt-5 max-w-3xl">
            <p className="eyebrow">Redakcija</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-6xl">
              Mūsu autori
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Katrs pārskats un raksts OnlineKazino.com ir parakstīts. Mūsu
              redakcijas komanda apvieno gandrīz divdesmit gadu pieredzi
              azartspēļu nozarē un Latvijas tirgus padziļinātu pārzināšanu.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(SITE.authors).map(([slug, author]) => {
            const count = articleCounts.get(slug) ?? 0;
            return (
              <article
                key={slug}
                className="flex flex-col gap-5 rounded-2xl border border-line bg-bone p-7 shadow-soft md:p-8"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-carmine-500/10 font-serif text-2xl font-semibold text-carmine-600"
                  >
                    {initials(author.name)}
                  </span>
                  <div>
                    <Link
                      href={`/autori/${slug}/`}
                      className="font-serif text-2xl font-semibold tracking-tightish text-ink hover:text-carmine-700"
                    >
                      {author.name}
                    </Link>
                    <p className="text-2xs uppercase tracking-widest2 text-ink-mute">
                      {author.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-ink-soft">
                  {author.bio}
                </p>

                <ul className="flex flex-wrap gap-2 text-xs">
                  {author.specialties.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-paper px-3 py-1 text-ink-soft"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="text-ink-mute">
                    {count} {count === 1 ? 'raksts' : 'raksti'}
                  </span>
                  <Link
                    href={`/autori/${slug}/`}
                    className="font-medium text-carmine-600 hover:text-carmine-700"
                  >
                    Skatīt profilu →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}
