import Link from 'next/link';
import { NAV_PRIMARY, SITE } from '@/lib/site';

/**
 * Editorial-style header. Light cream background with a hairline border,
 * a small carmine accent under the wordmark, and refined nav typography.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-6 px-4 py-4 lg:px-8 lg:py-5">
        <Link href="/" className="group flex items-baseline gap-3">
          <span aria-hidden className="hidden h-3 w-3 shrink-0 rounded-sm bg-carmine-500 sm:block" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-semibold tracking-tightish text-ink">
              {SITE.name}
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-widest2 text-ink-mute">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Galvenā navigācija" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-carmine-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/atbildiga-spele/"
          className="hidden items-center gap-2 rounded-full border border-line bg-bone px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-carmine-300 hover:text-carmine-700 sm:inline-flex"
          title="Tikai 18+. Spēlējiet atbildīgi."
        >
          <span aria-hidden className="grid h-4 w-4 place-items-center rounded-full bg-carmine-500 text-[0.55rem] font-bold text-paper">
            18+
          </span>
          Atbildīga spēle
        </Link>
      </div>

      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <nav
      aria-label="Galvenā navigācija (mobilā)"
      className="lg:hidden border-t border-line-soft bg-paper-soft/60"
    >
      <ul className="flex overflow-x-auto px-4 py-2 text-sm">
        {NAV_PRIMARY.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              className="block rounded-md px-3 py-2 text-ink-soft hover:text-carmine-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
