import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-4 py-24 lg:px-8">
      <span className="font-mono text-sm font-semibold uppercase tracking-widest2 text-carmine-600">
        404
      </span>
      <h1 className="font-serif text-4xl font-semibold tracking-tightish text-ink md:text-5xl">
        Lapa nav atrasta
      </h1>
      <p className="text-lg text-ink-soft">
        Diemžēl meklētā lapa nav pieejama. Iespējams, tā ir pārvietota vai
        izņemta. Šeit ir daži populāri sākumpunkti:
      </p>
      <ul className="space-y-2 text-base">
        <li>
          <Link href="/" className="text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
            → Sākumlapa
          </Link>
        </li>
        <li>
          <Link href="/kazino/" className="text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
            → Visi pārskatītie operatori
          </Link>
        </li>
        <li>
          <Link href="/bonusi/" className="text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
            → Aktuālie bonusi
          </Link>
        </li>
        <li>
          <Link href="/raksti/" className="text-carmine-600 underline decoration-carmine-300 underline-offset-4 hover:decoration-carmine-500">
            → Raksti un ceļveži
          </Link>
        </li>
      </ul>
    </section>
  );
}
