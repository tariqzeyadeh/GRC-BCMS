import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const tierStyles = {
  'Tier 1 Critical': 'bg-danger/10 text-danger',
  'Tier 2 Important': 'bg-warning/15 text-warning',
  'Tier 3 Normal': 'bg-chart-2/15 text-foreground',
};

const tierDot = {
  'Tier 1 Critical': 'bg-danger',
  'Tier 2 Important': 'bg-warning',
  'Tier 3 Normal': 'bg-chart-2',
};

export default function TierBadge({ tier }) {
  const { t } = useTranslation('bcms');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        tierStyles[tier]
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', tierDot[tier])} aria-hidden="true" />
      {t(tier)}
    </span>
  );
}
