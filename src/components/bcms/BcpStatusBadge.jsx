import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const statusStyles = {
  Draft: 'bg-surface text-muted-foreground border-border',
  Active: 'bg-success/15 text-success border-success/30',
};

const statusDot = {
  Draft: 'bg-muted-foreground',
  Active: 'bg-success',
};

export default function BcpStatusBadge({ status }) {
  const { t } = useTranslation('bcms');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status]
      )}
    >
      <span className={cn('size-1.5 rounded-full', statusDot[status])} aria-hidden="true" />
      {t(status)}
    </span>
  );
}
