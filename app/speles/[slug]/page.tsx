import { notFound } from 'next/navigation';

import { TopicPage } from '@/components/TopicPage';
import { getTopic, getTopicSlugs } from '@/lib/topics';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getTopicSlugs('speles').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = getTopic('speles', params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title} — Ceļvedis Latvijas spēlētājiem 2026`,
    description: trimDescription(t.lede),
    path: `/speles/${params.slug}/`,
  });
}

export default function GameTopicPage({ params }: Props) {
  const t = getTopic('speles', params.slug);
  if (!t) notFound();
  return (
    <TopicPage
      hubLabel="Spēles"
      hubHref="/speles/"
      slug={params.slug}
      topic={t}
      relatedHref="/kazino/"
      relatedLabel="IAUI licencēti operatori, kuros varat spēlēt šo spēli."
    />
  );
}
