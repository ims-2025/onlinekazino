/**
 * /go/[slug] — affiliate redirect handler.
 *
 * Why server-side: keeps tracking/UTM concerns off the public HTML and avoids
 * client-side trackers that hurt Core Web Vitals. We append source UTMs and
 * 302-redirect to the operator's affiliate URL.
 *
 * The redirect is intentionally a 302 (not 301) — affiliate destinations may
 * change frequently and we want intermediaries to re-resolve.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { getAffiliateByOperatorSlug, getOperatorBySlug } from '@/lib/data';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  // Generate one route per known operator with an affiliate URL.
  const slugs = (await import('@/data/affiliates.json')).default as Array<{
    operatorSlug: string;
  }>;
  return slugs.map((s) => ({ slug: s.operatorSlug }));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const aff = getAffiliateByOperatorSlug(params.slug);
  const op = getOperatorBySlug(params.slug);

  if (!aff || !op || !aff.sourceUrl) {
    return NextResponse.redirect(new URL('/kazino/', _req.url), 302);
  }

  // Append our standard UTM parameters so the operator side can attribute the
  // click. We treat anything in the source URL as authoritative — only set the
  // UTMs that aren't already there.
  const target = new URL(aff.sourceUrl);
  if (!target.searchParams.has('utm_source')) {
    target.searchParams.set('utm_source', 'onlinekazino.com');
  }
  if (!target.searchParams.has('utm_medium')) {
    target.searchParams.set('utm_medium', 'affiliate');
  }
  if (!target.searchParams.has('utm_campaign')) {
    target.searchParams.set('utm_campaign', 'review');
  }
  if (!target.searchParams.has('utm_content')) {
    target.searchParams.set('utm_content', op.slug);
  }

  return NextResponse.redirect(target.toString(), 302);
}
