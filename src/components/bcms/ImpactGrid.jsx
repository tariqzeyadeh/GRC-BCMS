import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { impactCategories, initialImpactGrid, timeframes } from '../../data/mockBia';

const severities = ['Low', 'Med', 'High'];

const severityActive = {
  Low: 'bg-success text-white',
  Med: 'bg-warning text-white',
  High: 'bg-danger text-white',
};

function SegmentedControl({ value, ariaLabel, onChange, t }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="inline-flex rounded-lg border border-border bg-surface p-0.5">
      {severities.map(severity => {
        const isSelected = severity === value;
        return (
          <button
            key={severity}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(severity)}
            className={cn(
              'min-w-[2.75rem] rounded-md px-2 py-1 text-xs font-medium transition-colors border-0 cursor-pointer',
              isSelected ? severityActive[severity] : 'bg-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {t(severity)}
          </button>
        );
      })}
    </div>
  );
}

export default function ImpactGrid() {
  const { t } = useTranslation('bcms');
  const [grid, setGrid] = useState(initialImpactGrid);

  const setCell = (categoryId, timeframeId, value) => {
    setGrid(prev => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], [timeframeId]: value },
    }));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="sticky start-0 z-10 min-w-[200px] bg-surface px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t('Impact Category')}
            </th>
            {timeframes.map(tf => (
              <th key={tf.id} className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">
                <span className="block text-sm font-semibold text-foreground">{t(tf.label)}</span>
                <span className="block text-[11px] font-normal text-muted-foreground">{t(tf.sublabel)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {impactCategories.map(category => (
            <tr key={category.id} className="border-b border-border last:border-0">
              <td className="sticky start-0 z-10 bg-card px-4 py-4">
                <span className="block text-sm font-medium text-foreground">{t(category.label)}</span>
                <span className="block text-xs text-muted-foreground">{t(category.description)}</span>
              </td>
              {timeframes.map(tf => (
                <td key={tf.id} className="px-4 py-4 text-center">
                  <div className="flex justify-center">
                    <SegmentedControl
                      value={grid[category.id][tf.id]}
                      ariaLabel={`${t(category.label)} @ ${t(tf.label)}`}
                      onChange={value => setCell(category.id, tf.id, value)}
                      t={t}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
