/**
 * Renders one or more JSON-LD blocks. Accepts a single object or an array;
 * filters out null/undefined so callers can compose conditionally.
 */
import type { JsonLd as JsonLdValue } from '@/lib/schema';

interface Props {
  data: JsonLdValue | JsonLdValue[] | null | (JsonLdValue | null)[];
}

export function JsonLd({ data }: Props) {
  const list = (Array.isArray(data) ? data : [data]).filter(
    (x): x is JsonLdValue => Boolean(x),
  );
  if (list.length === 0) return null;
  return (
    <>
      {list.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is server-rendered, so dangerouslySetInnerHTML is safe here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
