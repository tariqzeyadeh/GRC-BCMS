import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const statusStyles = {
  Open: 'bg-danger/15 text-danger border-danger/30',
  Mitigating: 'bg-warning/15 text-warning border-warning/30',
  Monitoring: 'bg-warning/15 text-warning border-warning/30',
  Mitigated: 'bg-brand/15 text-brand border-brand/30',
  Accepted: 'bg-brand/15 text-brand border-brand/30',
  Closed: 'bg-surface text-muted-foreground border-border',
};

export default function RiskStatusBadge({ status, className = '' }) {
  const { t } = useTranslation('grc');
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status] || statusStyles.Open,
        className
      )}
    >
      {t(status)}
    </span>
  );
}
