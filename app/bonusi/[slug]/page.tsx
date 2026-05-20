import { notFound } from 'next/navigation';

import { TopicPage } from '@/components/TopicPage';
import { getTopic, getTopicSlugs } from '@/lib/topics';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getTopicSlugs('bonusi').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = getTopic('bonusi', params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title} — Salīdzinājums 2026`,
    description: trimDescription(t.lede),
    path: `/bonusi/${params.slug}/`,
  });
}

export default function BonusTopicPage({ params }: Props) {
  const t = getTopic('bonusi', params.slug);
  if (!t) notFound();
  return (
    <TopicPage
      hubLabel="Bonusi"
      hubHref="/bonusi/"
      slug={params.slug}
      topic={t}
      relatedHref="/bonusi/"
      relatedLabel="Visi aktuālie welcome bonusi LV operatoros."
    />
  );
}
