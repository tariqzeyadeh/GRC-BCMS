import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { wizardSteps } from '../../data/mockBia';

export default function BiaStepper({ activeStep, onStepChange }) {
  const { t } = useTranslation('bcms');
  const activeIndex = wizardSteps.find(s => s.id === activeStep)?.index ?? 1;

  return (
    <nav aria-label={t('BIA wizard progress')} className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <ol className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0 m-0 p-0 list-none">
        {wizardSteps.map((step, index) => {
          const isComplete = step.index < activeIndex;
          const isActive = step.index === activeIndex;
          const isLast = index === wizardSteps.length - 1;

          return (
            <li key={step.id} className="flex flex-1 items-start gap-3 sm:flex-col sm:items-stretch sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-0 w-full">
                <button
                  type="button"
                  onClick={() => onStepChange?.(step.id)}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isComplete && 'border-brand bg-brand text-white',
                    isActive && 'border-brand bg-brand/10 text-brand',
                    !isComplete && !isActive && 'border-border bg-surface text-muted-foreground'
                  )}
                >
                  {isComplete ? <Check className="size-4" size={16} aria-hidden="true" /> : <span className="tabular-nums">{step.index}</span>}
                </button>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn('mx-3 hidden h-px flex-1 sm:block', isComplete ? 'bg-brand' : 'bg-border')}
                  />
                )}
              </div>

              <div className="flex flex-col sm:mt-3 sm:pe-6">
                <span className={cn('text-sm font-medium', isActive || isComplete ? 'text-foreground' : 'text-muted-foreground')}>
                  <span className="text-muted-foreground">{t('Step')} {step.index}: </span>
                  {t(step.title)}
                </span>
                <span className="text-xs text-muted-foreground">{t(step.description)}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
