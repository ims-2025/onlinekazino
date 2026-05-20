import Link from 'next/link';

/**
 * Mandatory 18+ / responsible-gambling strip. Sits *above* the footer so it's
 * the last commercial-context element the reader sees; light cream tone with
 * a carmine left rule rather than a heavy color block.
 */
export function ResponsibleGamblingBanner() {
  return (
    <aside
      role="note"
      aria-label="Atbildīga spēle"
      className="border-t border-line bg-paper-soft"
    >
      <div className="mx-auto flex max-w-wrap flex-col items-start gap-3 px-4 py-5 md:flex-row md:items-center md:gap-6 lg:px-8">
        <span className="inline-flex shrink-0 items-center gap-2.5 text-sm font-semibold text-ink">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-carmine-500 text-[0.65rem] font-bold tracking-wider text-paper">
            18+
          </span>
          Tikai pilngadīgiem spēlētājiem
        </span>
        <span className="text-sm leading-snug text-ink-soft">
          Azartspēles var izraisīt atkarību. Spēlējiet atbildīgi un saglabājiet
          kontroli pār laiku un budžetu.{' '}
          <Link
            href="/atbildiga-spele/"
            className="font-medium text-carmine-600 underline decoration-carmine-300 underline-offset-2 hover:decoration-carmine-500"
          >
            Atbildīgas spēles ceļvedis →
          </Link>
        </span>
      </div>
    </aside>
  );
}
