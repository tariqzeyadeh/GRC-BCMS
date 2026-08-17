import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, X } from 'lucide-react';

import { SimpleDataGrid, StatusBadge, RiskLevelBadge } from '../components/grc';
import { mockRisks } from '../data/mockRisks';
import { getRiskBand, RISK_APPETITE_THRESHOLD } from '../constants/riskScore';
import { exportPrintablePdf, exportRowsToCsv, tableHtml } from '../lib/export';

const RiskRegister = () => {
  const { t } = useTranslation('grc');
  const navigate = useNavigate();
  const location = useLocation();
  const heatmapFilter = location.state?.heatmapFilter;

  const stats = useMemo(() => {
    const bands = { low: 0, med: 0, high: 0 };
    mockRisks.forEach(r => {
      bands[getRiskBand(r.residualScore)] += 1;
    });
    return {
      total: mockRisks.length,
      open: mockRisks.filter(r => r.status === 'Open').length,
      mitigating: mockRisks.filter(r => r.status === 'Mitigating').length,
      outOfAppetite: mockRisks.filter(r => !r.withinAppetite).length,
      ...bands,
    };
  }, []);

  const filtered = useMemo(() => {
    if (!heatmapFilter) return mockRisks;
    return mockRisks.filter(r => {
      const impact = r.residualImpact ?? r.impact;
      const likelihood = r.residualLikelihood ?? r.likelihood;
      return impact === heatmapFilter.impact && likelihood === heatmapFilter.likelihood;
    });
  }, [heatmapFilter]);

  const columns = useMemo(
    () => [
      { key: 'id', header: t('ID') },
      { key: 'category', header: t('Category'), render: row => t(row.category) },
      { key: 'title', header: t('Title'), render: row => t(row.title) },
      {
        key: 'inherentScore',
        header: t('Inherent Score'),
        render: row => <RiskLevelBadge score={row.inherentScore} />,
      },
      {
        key: 'residualScore',
        header: t('Residual Score'),
        render: row => <RiskLevelBadge score={row.residualScore} />,
      },
      {
        key: 'withinAppetite',
        header: t('Within Appetite'),
        render: row => (
          <StatusBadge status={row.withinAppetite ? 'Within Appetite' : 'Out of Appetite'} />
        ),
      },
      { key: 'treatment', header: t('Treatment'), render: row => t(row.treatment) },
      { key: 'owner', header: t('Owner') },
      {
        key: 'status',
        header: t('Status'),
        render: row => <StatusBadge status={row.status} />,
      },
    ],
    [t]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-text m-0">{t('Risk Register')}</h1>
          <p className="text-text-muted text-sm mt-1 mb-0">
            {t('ISO-aligned register with inherent vs residual ratings, controls, and treatment.')}
          </p>
          <p className="text-xs text-text-muted mt-1 mb-0">
            {t('Appetite threshold')}: {RISK_APPETITE_THRESHOLD}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() =>
              exportRowsToCsv(
                'risk-register.csv',
                [
                  { key: 'id', header: 'ID' },
                  { key: 'title', header: 'Title' },
                  { key: 'category', header: 'Category' },
                  { key: 'residualScore', header: 'Residual' },
                  { key: 'status', header: 'Status' },
                  { key: 'owner', header: 'Owner' },
                ],
                filtered
              )
            }
          >
            <Download size={16} /> {t('Export Excel')}
          </button>
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() =>
              exportPrintablePdf(
                t('Risk Register'),
                tableHtml(
                  [
                    { key: 'id', header: 'ID' },
                    { key: 'title', header: 'Title' },
                    { key: 'residualScore', header: 'Residual' },
                    { key: 'status', header: 'Status' },
                  ],
                  filtered
                )
              )
            }
          >
            <Download size={16} /> {t('Export PDF')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: t('Total'), value: stats.total },
          { label: t('Open'), value: stats.open },
          { label: t('Mitigating'), value: stats.mitigating },
          { label: t('Out of Appetite'), value: stats.outOfAppetite },
          { label: t('High'), value: stats.high },
          { label: t('Med'), value: stats.med },
        ].map(s => (
          <div key={s.label} className="card p-3">
            <p className="text-xs text-text-muted m-0">{s.label}</p>
            <p className="text-xl font-semibold text-text m-0">{s.value}</p>
          </div>
        ))}
      </div>

      {heatmapFilter && (
        <div className="card p-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-text m-0">
            {t('Filtered by')}: {t('Impact')} {heatmapFilter.impact} × {t('Likelihood')}{' '}
            {heatmapFilter.likelihood} ({filtered.length})
          </p>
          <button
            type="button"
            className="btn btn-ghost h-8 px-2"
            onClick={() => navigate('/risks', { replace: true, state: {} })}
          >
            <X size={16} />
            {t('Clear heatmap filter')}
          </button>
        </div>
      )}

      <SimpleDataGrid
        columns={columns}
        rows={filtered}
        pageSize={8}
        onRowClick={row => navigate(`/risks/${row.id}`)}
      />
    </div>
  );
};

export default RiskRegister;
