import { CalendarClock, ClipboardList, Tag, User2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RiskStatusBadge from './RiskStatusBadge';

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-border py-3 last:border-0">
      <Icon className="size-4 shrink-0 text-muted-foreground" size={16} aria-hidden="true" />
      <span className="w-32 shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function RiskDetailsTab({ risk, details }) {
  const { t } = useTranslation('grc');
  const d = details || risk;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground m-0">
        {t(d.description || risk.description)}
      </p>

      {(d.cause || d.effect) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {d.cause && (
            <div className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="text-xs text-muted-foreground m-0 mb-1">{t('Cause')}</p>
              <p className="text-sm text-foreground m-0">{t(d.cause)}</p>
            </div>
          )}
          {d.effect && (
            <div className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="text-xs text-muted-foreground m-0 mb-1">{t('Effect')}</p>
              <p className="text-sm text-foreground m-0">{t(d.effect)}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col rounded-lg border border-border bg-card px-4">
        <DetailRow icon={User2} label={t('Risk owner')} value={d.owner || risk.owner} />
        <DetailRow icon={Tag} label={t('Category')} value={t(d.category || risk.category)} />
        <DetailRow icon={ClipboardList} label={t('Status')} value={<RiskStatusBadge status={risk.status} />} />
        <DetailRow icon={CalendarClock} label={t('Identified On')} value={d.identifiedOn || risk.identifiedOn || '—'} />
        <DetailRow icon={CalendarClock} label={t('Next Review')} value={d.nextReview || risk.nextReview || '—'} />
        {d.department && <DetailRow icon={Tag} label={t('Department')} value={t(d.department)} />}
      </div>
    </div>
  );
}
