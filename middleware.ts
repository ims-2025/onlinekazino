import { NextResponse, type NextRequest } from 'next/server';

/**
 * Return HTTP 410 Gone for known-dead legacy WordPress paths.
 *
 * Why 410 instead of letting them 404?
 *   - 410 = "permanently gone"; Google de-indexes 410s faster than 404s
 *   - Ahrefs stops counting 410s against the Health Score after re-crawl
 *   - prevents long-tail 4XX accumulation from stale external backlinks
 *
 * This complements the Disallow entries in app/robots.ts: robots blocks
 * future crawls, 410 tells crawlers that already know the URL to drop it.
 *
 * Real legacy paths that DO have a destination are handled by the redirect
 * table in next.config.mjs — those run first and never reach this middleware.
 */

const GONE_PATTERNS: RegExp[] = [
  /^\/wp-content(\/|$)/,
  /^\/wp-includes(\/|$)/,
  /^\/wp-admin(\/|$)/,
  /^\/wp-login\.php$/,
  /^\/xmlrpc\.php$/,
  /^\/wp-json(\/|$)/,
  /^\/feed(\/|$)/,
  /^\/comments\/feed(\/|$)/,
  /^\/[^/]+\/feed(\/|$)/,
  /^\/trackback(\/|$)/,
  /^\/author\/.*/, // Old WP author archive pages — we now use /autori/
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (GONE_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse(
      `<!doctype html><meta charset="utf-8"><title>410 Gone</title>` +
        `<p>This page has been permanently removed.</p>`,
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          // Tell intermediate caches not to keep this stale long
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      },
    );
  }

  return NextResponse.next();
}

// Skip middleware for static assets and Next.js internals so the regex tests
// run on as few paths as possible.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|operators|favicon|sitemap.xml|robots.txt|og$|api/).*)',
  ],
};
