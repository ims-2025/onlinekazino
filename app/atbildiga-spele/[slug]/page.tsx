import { notFound } from 'next/navigation';

import { TopicPage } from '@/components/TopicPage';
import { getTopic, getTopicSlugs } from '@/lib/topics';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getTopicSlugs('atbildiga-spele').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = getTopic('atbildiga-spele', params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title}`,
    description: trimDescription(t.lede),
    path: `/atbildiga-spele/${params.slug}/`,
  });
}

export default function RGTopicPage({ params }: Props) {
  const t = getTopic('atbildiga-spele', params.slug);
  if (!t) notFound();
  return (
    <TopicPage
      hubLabel="Atbildīga spēle"
      hubHref="/atbildiga-spele/"
      slug={params.slug}
      topic={t}
    />
  );
}
