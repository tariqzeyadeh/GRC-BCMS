import { Clock, GripVertical, User } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { recoveryStepsInitial } from '../../data/mockBcp';

export default function RecoveryProcedures() {
  const { t } = useTranslation('bcms');
  const [steps] = useState(recoveryStepsInitial);

  return (
    <ol className="flex flex-col gap-2.5 m-0 p-0 list-none">
      {steps.map(step => (
        <li
          key={step.id}
          className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/30"
        >
          <button
            type="button"
            aria-label={`${t('Reorder step')} ${step.order}`}
            className="mt-1 flex shrink-0 cursor-grab items-center justify-center rounded-md p-1 text-muted-foreground/50 transition-colors hover:text-muted-foreground active:cursor-grabbing border-0 bg-transparent"
          >
            <GripVertical className="size-4" size={16} aria-hidden="true" />
          </button>

          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
            {step.order}
          </span>

          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-sm leading-relaxed text-foreground m-0">{t(step.action)}</p>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-surface border border-border px-2 py-1 text-xs font-medium text-foreground">
                <User className="size-3 text-muted-foreground" size={12} aria-hidden="true" />
                {t(step.responsibleRole)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-surface border border-border px-2 py-1 font-mono text-xs font-medium text-foreground">
                <Clock className="size-3 text-muted-foreground" size={12} aria-hidden="true" />
                {t(step.duration)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
