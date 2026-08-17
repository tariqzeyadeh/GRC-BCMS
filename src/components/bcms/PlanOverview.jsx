import { CalendarClock, Link2, Timer, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { planHeader } from '../../data/mockBcp';

export default function PlanOverview() {
  const { t } = useTranslation('bcms');

  const summaryItems = [
    { label: t('Linked BIA'), value: planHeader.linkedBiaId, icon: Link2 },
    { label: t('Plan Owner'), value: planHeader.owner, icon: User },
    { label: t('Last Updated'), value: planHeader.lastUpdated, icon: CalendarClock },
    { label: t('Next Review'), value: planHeader.nextReview, icon: Timer },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map(item => (
          <div key={item.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <item.icon className="size-4" size={16} aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{t(item.value)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-foreground m-0">{t('Scope & Objective')}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground m-0">{t(planHeader.scope)}</p>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{t('Department')}</span>
            <span className="text-sm font-medium text-foreground">{t(planHeader.department)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{t('Plan Version')}</span>
            <span className="font-mono text-sm font-medium text-foreground">{planHeader.version}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{t('Target RTO')}</span>
            <span className="font-mono text-sm font-medium text-foreground">{planHeader.rto}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{t('Target RPO')}</span>
            <span className="font-mono text-sm font-medium text-foreground">{planHeader.rpo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
