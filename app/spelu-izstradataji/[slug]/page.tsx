import { notFound } from 'next/navigation';

import { TopicPage } from '@/components/TopicPage';
import { getTopic, getTopicSlugs } from '@/lib/topics';
import { buildMetadata, trimDescription } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getTopicSlugs('spelu-izstradataji').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = getTopic('spelu-izstradataji', params.slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title} — Spēļu izstrādātāja profils`,
    description: trimDescription(t.lede),
    path: `/spelu-izstradataji/${params.slug}/`,
  });
}

export default function ProviderPage({ params }: Props) {
  const t = getTopic('spelu-izstradataji', params.slug);
  if (!t) notFound();
  return (
    <TopicPage
      hubLabel="Spēļu izstrādātāji"
      hubHref="/spelu-izstradataji/"
      slug={params.slug}
      topic={t}
      relatedHref="/kazino/"
      relatedLabel="LV operatori, kuros šī izstrādātāja spēles ir pieejamas."
    />
  );
}
