import type { Config } from 'tailwindcss';

/**
 * Design system — OnlineKazino.com (light editorial)
 *
 * Reference points: The Economist, FT Weekend, Aesop, Mr Porter Journal,
 * Hodinkee. Warm cream paper, deep ink typography, a single saturated
 * accent (Latvian carmine — the official #9D2235 flag red) and a restrained
 * brass tone for star ratings. The result reads "premium guide" rather
 * than "online casino."
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — warm neutrals, not pure white
        paper: '#FAF7F0',          // primary background
        'paper-soft': '#F4EEDF',   // section bands, callouts
        'paper-deep': '#ECE3CD',   // dividers / panel emphasis
        bone: '#FFFEFA',           // cards on top of paper
        line: '#E1D8BE',           // subtle borders on cream
        'line-soft': '#EFE7CF',    // very subtle hairline

        // Type
        ink: {
          DEFAULT: '#14172A',      // headlines, primary
          soft: '#2A2E45',         // body
          mute: '#5C617A',         // secondary
          faint: '#8B8FA6',        // captions, timestamps
        },

        // Accent — Latvian carmine (official flag red, #9D2235)
        carmine: {
          50:  '#FCEEF0',
          100: '#F8DBE0',
          200: '#EFB5BF',
          300: '#E08C9C',
          400: '#C25A6F',
          500: '#9D2235',           // ← signature
          600: '#811A2B',
          700: '#641322',
          800: '#480D19',
          900: '#2D0810',
        },

        // Restrained brass — for ratings, fine details
        brass: {
          50:  '#FAF4E5',
          100: '#F1E3BC',
          300: '#C9A35B',
          500: '#9A7727',
          700: '#6E5217',
        },

        // Deep contrast surface (footer, callouts)
        midnight: {
          DEFAULT: '#14172A',
          soft: '#1F2238',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        xs:   ['0.75rem',   { lineHeight: '1.125rem' }],
        sm:   ['0.875rem',  { lineHeight: '1.375rem' }],
        base: ['1rem',      { lineHeight: '1.7rem' }],
        lg:   ['1.125rem',  { lineHeight: '1.85rem' }],
        xl:   ['1.25rem',   { lineHeight: '1.95rem' }],
        '2xl':['1.5rem',    { lineHeight: '2.1rem' }],
        '3xl':['1.875rem',  { lineHeight: '2.4rem' }],
        '4xl':['2.5rem',    { lineHeight: '2.85rem', letterSpacing: '-0.015em' }],
        '5xl':['3.25rem',   { lineHeight: '3.55rem', letterSpacing: '-0.02em' }],
        '6xl':['4.25rem',   { lineHeight: '4.5rem',  letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        tightish: '-0.012em',
        wider2: '0.06em',
        widest2: '0.18em',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,23,42,0.04), 0 4px 14px rgba(20,23,42,0.04)',
        lift: '0 6px 20px rgba(20,23,42,0.06), 0 14px 40px rgba(20,23,42,0.07)',
        ring: 'inset 0 0 0 1px rgba(20,23,42,0.06)',
      },
      maxWidth: {
        prose: '68ch',
        wrap: '78rem',
        narrow: '64rem',
      },
    },
  },
  plugins: [],
};

export default config;
