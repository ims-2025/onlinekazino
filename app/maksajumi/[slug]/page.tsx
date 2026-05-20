import { notFound } from 'next/navigation';

import { TopicPage } from '@/components/TopicPage';
import { getTopic, getTopicSlugs } from '@/lib/topics';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getTopicSlugs('maksajumi').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = getTopic('maksajumi', params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title} — Iemaksas un izņemšanas 2026`,
    description: trimDescription(t.lede),
    path: `/maksajumi/${params.slug}/`,
  });
}

export default function PaymentTopicPage({ params }: Props) {
  const t = getTopic('maksajumi', params.slug);
  if (!t) notFound();
  return (
    <TopicPage
      hubLabel="Maksājumi"
      hubHref="/maksajumi/"
      slug={params.slug}
      topic={t}
      relatedHref="/kazino/"
      relatedLabel="IAUI licencēti operatori, kuros šī maksājumu metode pieejama."
    />
  );
}
