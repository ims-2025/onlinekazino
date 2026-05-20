import Image from 'next/image';
import type { Operator } from '@/lib/types';

/**
 * Operator logo. Uses next/image for AVIF/WebP delivery, but only if the
 * featuredImage URL is on an allowed remote host (configured in
 * next.config.mjs). Falls back to a typographic monogram if the operator
 * has no logo yet — keeps the layout stable.
 */
interface Props {
  operator: Pick<Operator, 'name' | 'featuredImage'>;
  size?: number;
  className?: string;
}

export function OperatorLogo({ operator, size = 56, className = '' }: Props) {
  const initials = operator.name
    .replace(/\b(kazino|casino)\b/gi, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('') || operator.name[0]?.toUpperCase() || '?';

  if (!operator.featuredImage) {
    return (
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center rounded-md border border-line bg-paper-soft font-serif font-semibold text-carmine-700 ${className}`}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      >
        {initials}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-md border border-line bg-bone ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={operator.featuredImage}
        alt={`${operator.name} logotips`}
        width={size}
        height={size}
        className="h-full w-full object-contain p-1"
        unoptimized
      />
    </span>
  );
}
