import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const statusStyles = {
  Draft: 'bg-surface text-muted-foreground border-border',
  'In Review': 'bg-warning/15 text-warning border-warning/30',
  Published: 'bg-success/15 text-success border-success/30',
  Active: 'bg-success/15 text-success border-success/30',
  Expired: 'bg-danger/15 text-danger border-danger/30',
};

const statusDot = {
  Draft: 'bg-muted-foreground',
  'In Review': 'bg-warning',
  Published: 'bg-success',
  Active: 'bg-success',
  Expired: 'bg-danger',
};

export default function PolicyStatusBadge({ status, className = '' }) {
  const { t } = useTranslation('grc');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status] || statusStyles.Draft,
        className
      )}
    >
      <span className={cn('size-1.5 rounded-full', statusDot[status] || statusDot.Draft)} aria-hidden="true" />
      {t(status)}
    </span>
  );
}
