import type { Metadata, Viewport } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';

import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ResponsibleGamblingBanner } from '@/components/ResponsibleGamblingBanner';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF7F0',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [
    { name: 'Aldis Skuja', url: `${SITE.url}/autori/aldis-skuja/` },
    { name: 'Anna Jansons', url: `${SITE.url}/autori/anna-jansons/` },
  ],
  creator: SITE.organization.legalName,
  publisher: SITE.organization.legalName,
  alternates: {
    canonical: SITE.url,
    languages: { 'lv-LV': SITE.url },
    types: { 'application/rss+xml': `${SITE.url}/rss.xml` },
  },
  category: 'gambling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv-LV" className={`${inter.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-carmine-500 focus:px-3 focus:py-2 focus:font-medium focus:text-paper"
        >
          Pāriet uz galveno saturu
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <ResponsibleGamblingBanner />
        <Footer />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
