import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

function scoreToLevel(score) {
  if (score <= 6) return 'Low';
  if (score <= 12) return 'Medium';
  return 'High';
}

const levelStyles = {
  Low: 'bg-success/15 text-success border-success/30',
  Medium: 'bg-warning/15 text-warning border-warning/30',
  High: 'bg-danger/15 text-danger border-danger/30',
};

const levelDot = {
  Low: 'bg-success',
  Medium: 'bg-warning',
  High: 'bg-danger',
};

export default function RiskLevelBadge({ score, size = 'default', className = '' }) {
  const { t } = useTranslation('grc');
  const level = scoreToLevel(Number(score) || 0);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap',
        levelStyles[level],
        size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs',
        className
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', levelDot[level])} aria-hidden="true" />
      <span>
        {t(level)}
        <span className="mx-1 opacity-60" aria-hidden="true">
          ·
        </span>
        <span className="font-mono tabular-nums" dir="ltr">
          {score}
        </span>
      </span>
    </span>
  );
}

export { scoreToLevel };
