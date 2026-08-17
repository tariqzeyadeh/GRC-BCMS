import { cn } from '../../lib/utils';

export function Progress({ value = 0, className = '', ...props }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-surface border border-border', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
