import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const IMPACT_LABELS = ['Critical', 'Major', 'Moderate', 'Minor', 'Negligible'];
const LIKELIHOOD_LABELS = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Certain'];

function cellStyles(score) {
  if (score <= 4) {
    return { bg: 'bg-success/15', border: 'border-success/30', text: 'text-success', tier: 'Low' };
  }
  if (score <= 9) {
    return { bg: 'bg-success/25', border: 'border-success/40', text: 'text-success', tier: 'Low-Medium' };
  }
  if (score <= 14) {
    return { bg: 'bg-warning/25', border: 'border-warning/45', text: 'text-warning', tier: 'Medium' };
  }
  if (score <= 19) {
    return { bg: 'bg-warning/45', border: 'border-warning/60', text: 'text-warning', tier: 'High' };
  }
  return { bg: 'bg-danger/70', border: 'border-danger', text: 'text-danger-foreground', tier: 'Critical' };
}

function LegendSwatch({ className, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('size-2.5 rounded-sm border', className)} aria-hidden="true" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

/**
 * User-friendly 5×5 heatmap (ported from executive-grc-dashboard).
 * Counts live risks; hover tooltip; click still drills into register.
 */
export default function RiskHeatmap5x5({ risks = [], onCellClick }) {
  const { t } = useTranslation('grc');
  const [selected, setSelected] = useState(null);
  const [hover, setHover] = useState(null);

  const counts = useMemo(() => {
    const map = {};
    for (let impact = 1; impact <= 5; impact++) {
      for (let likelihood = 1; likelihood <= 5; likelihood++) {
        map[`${impact}-${likelihood}`] = 0;
      }
    }
    risks.forEach(r => {
      const impact = r.residualImpact ?? r.impact ?? r.inherentImpact;
      const likelihood = r.residualLikelihood ?? r.likelihood ?? r.inherentLikelihood;
      const key = `${impact}-${likelihood}`;
      if (map[key] !== undefined) map[key] += 1;
    });
    return map;
  }, [risks]);

  return (
    <Card className="border-border gap-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{t('Risk Heatmap')}</CardTitle>
        <p className="text-sm text-muted-foreground m-0">
          {t('Risk count by likelihood and impact — hover a cell for detail')}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center pe-1">
            <span
              className="text-xs font-medium tracking-wide text-muted-foreground"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {t('Impact')}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex">
              <div className="flex w-9 flex-col justify-between gap-1.5 pe-1">
                {IMPACT_LABELS.map((_, i) => (
                  <div key={IMPACT_LABELS[i]} className="flex flex-1 items-center justify-end">
                    <span className="text-[10px] font-medium text-muted-foreground">{5 - i}</span>
                  </div>
                ))}
              </div>

              <div className="grid flex-1 grid-cols-5 gap-1.5">
                {[5, 4, 3, 2, 1].map(impact =>
                  [1, 2, 3, 4, 5].map(likelihood => {
                    const score = impact * likelihood;
                    const styles = cellStyles(score);
                    const key = `${impact}-${likelihood}`;
                    const count = counts[key];
                    const isSelected = selected?.impact === impact && selected?.likelihood === likelihood;
                    const isHover = hover?.impact === impact && hover?.likelihood === likelihood;

                    return (
                      <div key={key} className="relative">
                        <button
                          type="button"
                          onMouseEnter={() => setHover({ impact, likelihood, count, score, tier: styles.tier })}
                          onMouseLeave={() => setHover(null)}
                          onFocus={() => setHover({ impact, likelihood, count, score, tier: styles.tier })}
                          onBlur={() => setHover(null)}
                          onClick={() => {
                            const cell = { impact, likelihood };
                            setSelected(cell);
                            onCellClick?.(cell);
                          }}
                          className={cn(
                            'group flex aspect-square w-full items-center justify-center rounded-md border font-mono text-sm font-semibold outline-none transition-all duration-150 ease-out hover:z-10 hover:scale-110 hover:shadow-md focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-ring',
                            styles.bg,
                            styles.border,
                            styles.text,
                            isSelected && 'ring-2 ring-ring ring-offset-2 ring-offset-card'
                          )}
                          aria-label={`${t('Impact')} ${impact} × ${t('Likelihood')} ${likelihood}: ${count} ${t('risks')}`}
                        >
                          {count}
                        </button>
                        {isHover && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-md border border-border bg-card px-3 py-2 shadow-md">
                            <p className="m-0 text-xs font-medium text-foreground">
                              {t('Impact')} {impact} × {t('Likelihood')} {likelihood}
                            </p>
                            <p className="m-0 mt-0.5 text-[11px] text-muted-foreground">
                              {count} {count === 1 ? t('risk') : t('risks')} · {t(styles.tier)} {t('severity')}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="ms-9 mt-2 grid grid-cols-5 gap-1.5">
              {LIKELIHOOD_LABELS.map((label, i) => (
                <span key={label} className="text-center text-[10px] font-medium text-muted-foreground">
                  {i + 1}
                </span>
              ))}
            </div>
            <p className="mt-1 text-center text-xs font-medium tracking-wide text-muted-foreground m-0">
              {t('Likelihood')}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
          <LegendSwatch className="bg-success/25 border-success/40" label={t('Low')} />
          <LegendSwatch className="bg-warning/25 border-warning/45" label={t('Medium')} />
          <LegendSwatch className="bg-warning/45 border-warning/60" label={t('High')} />
          <LegendSwatch className="bg-danger/70 border-danger" label={t('Critical')} />
        </div>
      </CardContent>
    </Card>
  );
}
