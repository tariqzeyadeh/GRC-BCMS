import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { scoreToLevel } from './RiskLevelBadge';
import { TREATMENT_OPTIONS, isWithinAppetite, RISK_APPETITE_THRESHOLD } from '../../constants/riskScore';
import StatusBadge from './StatusBadge';

const levelTextColor = {
  Low: 'text-success',
  Medium: 'text-warning',
  High: 'text-danger',
};

function ScoreSlider({ label, value, onChange }) {
  const { t } = useTranslation('grc');
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="flex size-7 items-center justify-center rounded-md bg-brand/15 font-mono text-sm font-semibold text-brand">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-brand)] h-2 cursor-pointer"
      />
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>1 · {t('Minimal')}</span>
        <span>5 · {t('Severe')}</span>
      </div>
    </div>
  );
}

export default function RiskAssessmentTab({
  residualImpact,
  residualLikelihood,
  setResidualImpact,
  setResidualLikelihood,
  inherentImpact,
  inherentLikelihood,
  setInherentImpact,
  setInherentLikelihood,
  treatment,
  setTreatment,
}) {
  const { t } = useTranslation('grc');
  const residualScore = residualImpact * residualLikelihood;
  const inherentScore = inherentImpact * inherentLikelihood;
  const level = useMemo(() => scoreToLevel(residualScore), [residualScore]);
  const within = isWithinAppetite(residualScore);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ScoreSlider
          label={`${t('Impact')} (1–5)`}
          value={residualImpact}
          onChange={setResidualImpact}
        />
        <ScoreSlider
          label={`${t('Likelihood')} (1–5)`}
          value={residualLikelihood}
          onChange={setResidualLikelihood}
        />
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface py-8">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t('Residual Risk Score')}
        </span>
        <span className={cn('font-mono text-6xl font-bold tabular-nums', levelTextColor[level])}>
          {residualScore}
        </span>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-sm font-medium',
            level === 'Low' && 'bg-success/15 text-success',
            level === 'Medium' && 'bg-warning/15 text-warning',
            level === 'High' && 'bg-danger/15 text-danger'
          )}
        >
          {t(level)} {t('Risk')}
        </span>
        <StatusBadge status={within ? 'Within Appetite' : 'Out of Appetite'} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <span className="text-sm font-medium text-foreground">{t('Inherent risk')}</span>
          <ScoreSlider label={t('Impact')} value={inherentImpact} onChange={setInherentImpact} />
          <ScoreSlider label={t('Likelihood')} value={inherentLikelihood} onChange={setInherentLikelihood} />
          <div className="flex items-center justify-between text-sm pt-1 border-t border-border">
            <span className="text-muted-foreground">{t('Inherent Score')}</span>
            <span className="font-mono font-semibold text-foreground">{inherentScore}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <label className="text-sm font-medium text-foreground" htmlFor="treatment">
            {t('Treatment')}
          </label>
          <select
            id="treatment"
            className="input-base"
            value={treatment}
            onChange={e => setTreatment(e.target.value)}
          >
            {TREATMENT_OPTIONS.map(opt => (
              <option key={opt} value={opt}>
                {t(opt)}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground m-0 mt-auto">
            {t('Appetite threshold')}: {RISK_APPETITE_THRESHOLD}
          </p>
        </div>
      </div>
    </div>
  );
}
