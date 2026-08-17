import { Check, CircleDashed, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

/**
 * Vertical workflow timeline — from executive-grc-dashboard.
 * @param {{ steps: Array<{ label: string, actor: string, date?: string|null, status: 'complete'|'current'|'upcoming', note?: string }> }} props
 */
export default function WorkflowStepper({ steps = [] }) {
  const { t } = useTranslation('grc');

  return (
    <ol className="flex flex-col m-0 p-0 list-none">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute start-[15px] top-8 h-[calc(100%-1.75rem)] w-px',
                  step.status === 'complete' ? 'bg-success/50' : 'bg-border'
                )}
              />
            )}
            <span
              className={cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2',
                step.status === 'complete' && 'border-success bg-success text-white',
                step.status === 'current' && 'border-brand bg-brand/10 text-brand',
                step.status === 'upcoming' && 'border-border bg-card text-muted-foreground'
              )}
            >
              {step.status === 'complete' ? (
                <Check className="size-4" size={16} aria-hidden="true" />
              ) : step.status === 'current' ? (
                <Clock className="size-4" size={16} aria-hidden="true" />
              ) : (
                <CircleDashed className="size-4" size={16} aria-hidden="true" />
              )}
            </span>

            <div className="flex flex-1 flex-col gap-0.5 pt-1">
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    'text-sm font-semibold m-0',
                    step.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {t(step.label)}
                </p>
                {step.status === 'current' && (
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-medium text-brand">
                    {t('In progress')}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground m-0">{t(step.actor)}</p>
              {step.date && <p className="font-mono text-xs text-muted-foreground m-0">{step.date}</p>}
              {step.note && <p className="text-xs italic text-muted-foreground m-0">{t(step.note)}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
