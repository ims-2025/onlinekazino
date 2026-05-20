import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, personSchema } from '@/lib/schema';
import { buildMetadata, trimDescription } from '@/lib/seo';
import { getArticles } from '@/lib/data';

interface Props {
  params: { slug: string };
}

// Reverse map: our slug → WP author ID
const SLUG_TO_WP: Record<string, string> = {
  'aldis-skuja': 'dt_admin',
  'anna-jansons': 'annab',
};

export async function generateStaticParams() {
  return Object.keys(SITE.authors).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const author = SITE.authors[params.slug as keyof typeof SITE.authors];
  if (!author) return {};
  return buildMetadata({
    title: `${author.name} — ${author.role} | OnlineKazino.com`,
    description: trimDescription(author.bio),
    path: `/autori/${params.slug}/`,
    type: 'profile',
    authors: [author.name],
    og: { eyebrow: author.role, meta: `${author.role_yearsExperience}+ gadu pieredze` },
  });
}

export default function AuthorPage({ params }: Props) {
  const author = SITE.authors[params.slug as keyof typeof SITE.authors];
  if (!author) notFound();

  const wpId = SLUG_TO_WP[params.slug];
  const articles = wpId
    ? getArticles().filter((a) => a.author === wpId)
    : [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: 'Autori', href: '/autori/' },
            { name: author.name, href: `/autori/${params.slug}/` },
          ]),
          personSchema(params.slug),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: '/autori/', label: 'Autori' },
            { href: `/autori/${params.slug}/`, label: author.name },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">{author.role}</p>
          <div className="mt-4 flex items-center gap-6">
            <span
              aria-hidden
              className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-carmine-500/10 font-serif text-3xl font-semibold text-carmine-600"
            >
              {initials(author.name)}
            </span>
            <div>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tightish text-ink md:text-5xl">
                {author.name}
              </h1>
              <p className="mt-2 text-sm text-ink-mute">
                <strong className="text-ink">{author.role_yearsExperience}+ gadu pieredze</strong>{' '}
                · {author.specialties.length} specializāciju jomas ·{' '}
                {articles.length} {articles.length === 1 ? 'publicēts raksts' : 'publicēti raksti'}
              </p>
            </div>
          </div>
        </header>

        <section className="prose-editorial mt-10">
          <p className="text-lg leading-relaxed text-ink-soft">{author.bio}</p>
          <p>{author.longBio}</p>
        </section>

        <section className="mt-12 not-prose">
          <p className="eyebrow">Specializācija</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {author.specialties.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line bg-bone px-4 py-1.5 text-ink-soft"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 not-prose">
          <p className="eyebrow">Kontakti</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            E-pasts redakcijas jautājumiem un faktu labojumiem:{' '}
            <a
              href={`mailto:${author.email}`}
              className="font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-2 hover:decoration-carmine-500"
            >
              {author.email}
            </a>
          </p>
        </section>

        {articles.length > 0 && (
          <section className="mt-16 border-t border-line pt-12">
            <p className="eyebrow">Pēdējie raksti</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink md:text-3xl">
              {author.name.split(' ')[0]} raksta par
            </h2>
            <ul className="mt-8 space-y-8">
              {articles.slice(0, 12).map((a) => (
                <li key={a.slug}>
                  <span className="eyebrow">
                    {a.categories[0]?.label ?? 'Raksts'}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug tracking-tightish text-ink">
                    <Link href={`/raksti/${a.slug}/`} className="hover:text-carmine-700">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-2">
                    {a.excerpt}
                  </p>
                </li>
              ))}
            </ul>
            {articles.length > 12 && (
              <p className="mt-8 text-sm text-ink-mute">
                Rāda 12 no {articles.length} rakstiem.
              </p>
            )}
          </section>
        )}
      </article>
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
