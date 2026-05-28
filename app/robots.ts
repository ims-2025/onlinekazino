import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/go/',
          // Legacy WordPress paths — the old CMS is gone but Ahrefs (and
          // Google) still occasionally try to crawl these via stale
          // backlinks. Block them so we stop accumulating 4XX errors in
          // the audit. Real redirects for any landing-page paths are still
          // handled in next.config.mjs.
          '/wp-content/',
          '/wp-includes/',
          '/wp-admin/',
          '/wp-login.php',
          '/xmlrpc.php',
          '/apskati/',
          '/category/',
          '/labakie-kazino/',
          '/zinas/',
          '/game/',
          '/feed/',
          '/*?p=*',
          '/*?paged=*',
          '/*?replytocom=*',
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
