import { CheckCircle2, CircleDashed, MinusCircle, Paperclip, UploadCloud, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const OPTIONS = [
  { value: 'Yes', icon: CheckCircle2 },
  { value: 'Partial', icon: MinusCircle },
  { value: 'No', icon: XCircle },
];

const selectedClass = {
  Yes: 'border-success bg-success/10 text-success',
  Partial: 'border-warning bg-warning/10 text-warning',
  No: 'border-danger bg-danger/10 text-danger',
};

/**
 * Control assessment card with Yes/Partial/No, comments, evidence upload UI.
 * Ported from executive-grc-dashboard; keeps GRC-BCMS remediation fields.
 */
export default function ControlCard({ control, answer, onChange }) {
  const { t } = useTranslation('grc');
  const a = answer ?? {
    answer: '',
    comment: '',
    evidence: '',
    owner: '',
    dueDate: '',
    priority: 'Medium',
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-medium text-muted-foreground">{control.code}</span>
          {control.category && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border">
              {control.category}
            </span>
          )}
          {!a.answer && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <CircleDashed className="size-3" size={12} aria-hidden="true" />
              {t('Not answered')}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-foreground m-0">{t(control.title)}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground m-0">{t(control.description)}</p>
      </div>

      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t(control.title)}>
        {OPTIONS.map(opt => {
          const Icon = opt.icon;
          const selected = a.answer === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange({ answer: opt.value })}
              className={cn(
                'flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface',
                selected && selectedClass[opt.value]
              )}
            >
              <Icon className="size-4" size={16} aria-hidden="true" />
              {t(opt.value)}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          className="input-base"
          placeholder={t('Evidence location')}
          value={a.evidence}
          onChange={e => onChange({ evidence: e.target.value })}
        />
        <input
          className="input-base"
          placeholder={t('Owner')}
          value={a.owner}
          onChange={e => onChange({ owner: e.target.value })}
        />
        <input
          type="date"
          className="input-base"
          value={a.dueDate}
          onChange={e => onChange({ dueDate: e.target.value })}
        />
        <select
          className="input-base"
          value={a.priority}
          onChange={e => onChange({ priority: e.target.value })}
        >
          <option value="High">{t('High')}</option>
          <option value="Medium">{t('Medium')}</option>
          <option value="Low">{t('Low')}</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`comment-${control.id}`} className="text-xs font-medium text-muted-foreground">
          {t('Auditor comments')}
        </label>
        <textarea
          id={`comment-${control.id}`}
          className="input-base min-h-20 h-auto py-2 resize-none"
          placeholder={t('Document evidence reviewed, exceptions noted, or remediation context...')}
          value={a.comment}
          onChange={e => onChange({ comment: e.target.value })}
        />
      </div>

      <label
        htmlFor={`upload-${control.id}`}
        className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-border px-4 py-6 text-center transition-colors hover:border-brand/50 hover:bg-surface"
      >
        <UploadCloud className="size-5 text-muted-foreground" size={20} aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">
          <span className="text-brand">{t('Upload evidence')}</span> {t('or drag and drop')}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Paperclip className="size-3" size={12} aria-hidden="true" />
          {t('PDF, PNG, or DOCX up to 10MB')}
        </span>
        <input
          id={`upload-${control.id}`}
          type="file"
          className="sr-only"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) onChange({ evidence: file.name });
          }}
        />
      </label>
    </div>
  );
}
