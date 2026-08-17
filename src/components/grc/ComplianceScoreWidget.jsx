import { CheckCircle2, MinusCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * SVG ring score widget — from executive-grc-dashboard.
 * Expects answers map: { [controlId]: 'Yes' | 'Partial' | 'No' } or full answer objects.
 */
export default function ComplianceScoreWidget({ answers = {}, total = 0 }) {
  const { t } = useTranslation('grc');
  const values = Object.values(answers).map(v => (typeof v === 'string' ? v : v?.answer)).filter(Boolean);
  const answered = values.length;
  const yes = values.filter(v => v === 'Yes' || v === 'yes').length;
  const partial = values.filter(v => v === 'Partial' || v === 'partial').length;
  const no = values.filter(v => v === 'No' || v === 'no').length;

  const score = total === 0 ? 0 : Math.round(((yes + partial * 0.5) / total) * 100);
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  const scoreColor = score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger';
  const strokeColor = score >= 80 ? 'stroke-success' : score >= 50 ? 'stroke-warning' : 'stroke-danger';

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground m-0">{t('Current Compliance Score')}</h3>
        <p className="text-xs text-muted-foreground m-0">
          {answered} {t('of')} {total} {t('controls answered')}
        </p>
      </div>

      <div className="relative mx-auto flex size-36 items-center justify-center">
        <svg viewBox="0 0 120 120" className="size-36 -rotate-90">
          <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-border" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className={cn('transition-[stroke-dashoffset] duration-500 ease-out', strokeColor)}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={cn('font-mono text-3xl font-bold tabular-nums', scoreColor)}>{score}%</span>
          <span className="text-[11px] text-muted-foreground">{t('compliant')}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="size-4 text-success" size={16} aria-hidden="true" />
            {t('Yes')}
          </span>
          <span className="font-mono font-medium text-foreground">{yes}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <MinusCircle className="size-4 text-warning" size={16} aria-hidden="true" />
            {t('Partial')}
          </span>
          <span className="font-mono font-medium text-foreground">{partial}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="size-4 text-danger" size={16} aria-hidden="true" />
            {t('No')}
          </span>
          <span className="font-mono font-medium text-foreground">{no}</span>
        </div>
      </div>
    </div>
  );
}
