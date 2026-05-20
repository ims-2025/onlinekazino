import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Faq } from '@/components/Faq';
import type { Topic } from '@/lib/topics';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { FaqItem } from '@/lib/schema';

interface Props {
  hubLabel: string;
  hubHref: string;
  slug: string;
  topic: Topic;
  faq?: FaqItem[];
  relatedHref?: string;
  relatedLabel?: string;
}

/**
 * Shared template used by /speles/[slug], /maksajumi/[slug], /bonusi/[slug],
 * /atbildiga-spele/[slug], /spelu-izstradataji/[slug]. Keeps every topic
 * sub-page consistent (typography, breadcrumb, schema, RG disclosure) without
 * duplicating layout across 25+ files.
 */
export function TopicPage({
  hubLabel,
  hubHref,
  slug,
  topic,
  faq,
  relatedHref,
  relatedLabel,
}: Props) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Sākums', href: '/' },
            { name: hubLabel, href: hubHref },
            { name: topic.title, href: `${hubHref}${slug}/` },
          ]),
          faq ? faqSchema(faq) : null,
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Sākums' },
            { href: hubHref, label: hubLabel },
            { href: `${hubHref}${slug}/`, label: topic.title },
          ]}
        />

        <header className="mt-8 flag-rule pt-5">
          <p className="eyebrow">{hubLabel}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
            {topic.title}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
            {topic.lede}
          </p>
        </header>

        {topic.sections && topic.sections.length > 0 && (
          <section className="prose-editorial mt-12">
            {topic.sections.map((s, i) => (
              <div key={i}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </section>
        )}

        {faq && faq.length > 0 && (
          <section className="mt-16">
            <Faq items={faq} />
          </section>
        )}

        {relatedHref && (
          <section className="mt-16 rounded-2xl border border-line bg-paper-soft p-7">
            <p className="eyebrow">Saistīts</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tightish text-ink">
              Apskatiet operatoru sarakstu
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {relatedLabel ?? 'Atrast IAUI licencētus operatorus, kas piedāvā šo iespēju.'}
            </p>
            <Link
              href={relatedHref}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-carmine-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-carmine-600"
            >
              Skatīt operatorus
              <span aria-hidden>→</span>
            </Link>
          </section>
        )}
      </article>
    </>
  );
}
