/**
 * Numeric rating with accessible star representation. Brass stars on cream —
 * deliberately restrained (no oversaturated yellow). Pure CSS, zero JS.
 */
interface Props {
  value: number;          // 0..5
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
}

export function RatingStars({
  value,
  max = 5,
  size = 'md',
  showValue = true,
  label,
}: Props) {
  const safe = Math.max(0, Math.min(max, value));
  const pct = (safe / max) * 100;

  const dim = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-2 ${dim}`}
      role="img"
      aria-label={label ?? `Vērtējums ${safe.toFixed(2)} no ${max}`}
    >
      <span className="relative inline-block leading-none">
        <span aria-hidden className="text-line">
          {'★'.repeat(max)}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden text-brass-500"
          style={{ width: `${pct}%` }}
        >
          {'★'.repeat(max)}
        </span>
      </span>
      {showValue && (
        <span className="font-mono text-sm font-semibold tabular-nums text-ink">
          {safe.toFixed(2)}
        </span>
      )}
    </span>
  );
}
