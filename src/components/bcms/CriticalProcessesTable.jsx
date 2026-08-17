import { useMemo, useState } from 'react';
import { Link2, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { criticalProcesses, processTiers } from '../../data/mockBcms';
import TierBadge from './TierBadge';

export default function CriticalProcessesTable() {
  const { t } = useTranslation('bcms');
  const [query, setQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  const departments = useMemo(() => [...new Set(criticalProcesses.map(p => p.department))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return criticalProcesses.filter(p => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchTier = tierFilter === 'all' || p.tier === tierFilter;
      const matchDept = deptFilter === 'all' || p.department === deptFilter;
      return matchQ && matchTier && matchDept;
    });
  }, [query, tierFilter, deptFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute inset-y-0 start-3 my-auto size-4 text-muted-foreground" size={16} aria-hidden="true" />
          <input
            className="input-base ps-9"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('Search by process name or BIA ID...')}
            aria-label={t('Search critical processes')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="input-base w-auto min-w-40" value={tierFilter} onChange={e => setTierFilter(e.target.value)}>
            <option value="all">{t('All tiers')}</option>
            {processTiers.map(tier => (
              <option key={tier} value={tier}>{t(tier)}</option>
            ))}
          </select>
          <select className="input-base w-auto min-w-40" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="all">{t('All departments')}</option>
            {departments.map(d => (
              <option key={d} value={d}>{t(d)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="ps-4 py-3 text-start text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('Rank')}</th>
              <th className="py-3 text-start text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('Process')}</th>
              <th className="py-3 text-start text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('Department')}</th>
              <th className="py-3 text-start text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('Tier')}</th>
              <th className="py-3 text-start text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('RTO')}</th>
              <th className="py-3 text-start text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('RPO')}</th>
              <th className="pe-4 py-3 text-end text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{t('Dependencies')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(process => (
              <tr key={process.id} className="border-b border-border last:border-0 hover:bg-surface/80">
                <td className="ps-4 py-3">
                  <span className="flex size-6 items-center justify-center rounded-md bg-surface font-mono text-xs font-semibold tabular-nums">
                    {process.rank}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{t(process.name)}</span>
                    <span className="font-mono text-xs text-muted-foreground">{process.id}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium border border-border">{t(process.department)}</span>
                </td>
                <td className="py-3"><TierBadge tier={process.tier} /></td>
                <td className="py-3 font-mono text-sm tabular-nums">{process.rto}</td>
                <td className="py-3 font-mono text-sm tabular-nums">{process.rpo}</td>
                <td className="pe-4 py-3">
                  <span className="flex items-center justify-end gap-1.5 text-sm tabular-nums">
                    <Link2 className="size-3.5 text-muted-foreground" size={14} aria-hidden="true" />
                    {process.dependencies}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                  {t('No critical processes match your search or filters.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground m-0">
        {t('Showing')} {filtered.length} {t('of')} {criticalProcesses.length} {t('approved BIAs')}
      </p>
    </div>
  );
}
