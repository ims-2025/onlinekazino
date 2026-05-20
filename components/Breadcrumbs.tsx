import Link from 'next/link';

interface Crumb {
  href: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Drupakas (breadcrumbs)" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-mute">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink-soft">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="hover:text-carmine-600">
                    {c.label}
                  </Link>
                  <span aria-hidden className="text-ink-faint">
                    ·
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
