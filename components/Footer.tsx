import Link from 'next/link';
import { NAV_FOOTER, SITE } from '@/lib/site';

/**
 * Footer uses a deep midnight surface with cream type to anchor the page —
 * gives weight to the bottom without making the whole site feel dark.
 */
export function Footer() {
  return (
    <footer className="bg-midnight text-paper/80">
      <div className="h-1 w-full bg-carmine-500" aria-hidden />
      <div className="mx-auto max-w-wrap px-4 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-serif text-2xl font-semibold tracking-tightish text-paper">
              {SITE.name}
            </span>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/70">
              {SITE.description}
            </p>
            <p className="mt-5 text-xs leading-relaxed text-paper/55">
              Tikai personām vecumā no <strong className="text-paper/80">18 gadiem</strong>.
              Azartspēles var izraisīt atkarību. Spēlējiet atbildīgi. Latvijā azartspēles
              uzrauga{' '}
              <a
                href="https://www.iaui.gov.lv/lv"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-carmine-300/60 underline-offset-2 hover:text-paper"
              >
                Izložu un azartspēļu uzraudzības inspekcija
              </a>
              .
            </p>
          </div>

          <div className="md:col-span-2">
            <FooterColumn title="Uzņēmums" items={NAV_FOOTER.company} />
          </div>
          <div className="md:col-span-3">
            <FooterColumn title="Spēlētājiem" items={NAV_FOOTER.player} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Juridiski" items={NAV_FOOTER.legal} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-6 text-xs text-paper/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {SITE.organization.legalName}. Visas tiesības aizsargātas.</p>
          <p>
            Atbalsts spēlmaņiem (Skalbes, 24/7):{' '}
            <a href="tel:+37167222922" className="text-paper/85 underline-offset-2 hover:underline">
              +371 67 222 922
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h2 className="text-2xs font-semibold uppercase tracking-widest2 text-paper">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-paper/70 hover:text-paper">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
