import type { FaqItem } from '@/lib/schema';

/**
 * Native <details>/<summary> accordion — zero JS, fully accessible.
 */
export function Faq({ items, title = 'Bieži uzdotie jautājumi' }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="not-prose">
      <p className="eyebrow">FAQ</p>
      <h2
        id="faq-heading"
        className="mt-2 font-serif text-3xl font-semibold tracking-tightish text-ink md:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-bone">
        {items.map((it, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-5 text-base font-medium text-ink marker:hidden md:px-6">
              <span>{it.q}</span>
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink-mute transition group-open:rotate-45 group-open:border-carmine-300 group-open:text-carmine-600"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-6 text-sm leading-relaxed text-ink-soft md:px-6">
              <p>{it.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
