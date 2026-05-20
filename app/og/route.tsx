/**
 * Dynamic Open Graph image — single route handles every page.
 *
 * Renders a 1200×630 PNG using @vercel/og (built into Next.js 14 as
 * `next/og`). Query params shape the output so every page can request its
 * own variant:
 *
 *   /og?title=Optibet+Kazino&eyebrow=Operatora+apskats&rating=4.75
 *
 * Wired into pages via lib/seo.ts → buildMetadata({ image }). Falls back to
 * a sensible default for the site root.
 *
 * The rendering uses inline styles (Satori subset) — no Tailwind, no CSS
 * variables.
 */

import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';
export const dynamic = 'force-static';
// Note: ImageResponse sets the Content-Type header itself; a `contentType`
// export on a regular route handler is rejected by Next 14's type checker.

const PALETTE = {
  paper: '#FAF7F0',
  paperSoft: '#F4EEDF',
  ink: '#14172A',
  inkSoft: '#2A2E45',
  inkMute: '#5C617A',
  carmine: '#9D2235',
  line: '#E1D8BE',
};

// Truncate so a runaway title doesn't push layout off the canvas
function clamp(s: string, max = 110): string {
  return s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = clamp(searchParams.get('title') ?? `${SITE.name} — ${SITE.tagline}`);
  const eyebrow = (searchParams.get('eyebrow') ?? 'Latvijas premium kazino ceļvedis').toUpperCase();
  const rating = searchParams.get('rating'); // optional, e.g. "4.75"
  const meta = searchParams.get('meta');     // optional small label, e.g. "Atjaunināts 2026-05"

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: PALETTE.paper,
          padding: '80px',
          position: 'relative',
          fontFamily:
            'Helvetica Neue, Arial, sans-serif',
        }}
      >
        {/* Top carmine strip (the "flag rule") */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '160px',
            height: '8px',
            background: PALETTE.carmine,
          }}
        />

        {/* Top-right wordmark */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: PALETTE.ink,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: PALETTE.carmine,
              borderRadius: 3,
            }}
          />
          {SITE.name}
        </div>

        {/* Main editorial block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: PALETTE.carmine,
              marginBottom: 28,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 64 : title.length > 35 ? 78 : 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: PALETTE.ink,
              maxWidth: '90%',
              fontFamily: 'Georgia, serif',
            }}
          >
            {title}
          </div>

          {/* Footer row: optional rating + meta + tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 48,
              borderTop: `1px solid ${PALETTE.line}`,
              paddingTop: 28,
              fontSize: 22,
              color: PALETTE.inkSoft,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {rating && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 10,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  <span style={{ fontSize: 44, fontWeight: 700, color: PALETTE.carmine }}>
                    {rating}
                  </span>
                  <span style={{ fontSize: 18, color: PALETTE.inkMute }}>/ 5</span>
                </div>
              )}
              {meta && (
                <div
                  style={{
                    fontSize: 18,
                    color: PALETTE.inkMute,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {meta}
                </div>
              )}
            </div>
            <div style={{ fontSize: 20, color: PALETTE.inkMute }}>
              {SITE.tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
