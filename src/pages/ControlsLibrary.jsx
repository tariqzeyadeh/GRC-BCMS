import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { SimpleDataGrid } from '../components/grc';
import { useAppData } from '../context/AppDataContext';
import { exportPrintablePdf, exportRowsToCsv, tableHtml } from '../lib/export';

const ControlsLibrary = () => {
  const { t } = useTranslation('grc');
  const { controls, updateControl } = useAppData();

  const columns = useMemo(
    () => [
      { key: 'id', header: t('ID') },
      { key: 'code', header: t('Code') },
      { key: 'title', header: t('Title'), render: row => t(row.title) },
      { key: 'framework', header: t('Framework') },
      { key: 'owner', header: t('Owner') },
      {
        key: 'effectiveness',
        header: t('Effectiveness'),
        render: row => (
          <select
            className="input-base w-auto text-xs h-8"
            value={row.effectiveness}
            onClick={e => e.stopPropagation()}
            onChange={e => updateControl(row.id, { effectiveness: e.target.value })}
          >
            <option value="Effective">{t('Effective')}</option>
            <option value="Partially Effective">{t('Partially Effective')}</option>
            <option value="Ineffective">{t('Ineffective')}</option>
          </select>
        ),
      },
      { key: 'nextTest', header: t('Next test') },
      {
        key: 'links',
        header: t('Links'),
        render: row => (
          <span className="text-xs text-text-muted">
            {(row.linkedRiskIds || []).map(id => (
              <Link key={id} to={`/risks/${id}`} className="text-brand no-underline me-2">
                {id}
              </Link>
            ))}
          </span>
        ),
      },
    ],
    [t, updateControl]
  );

  const exportCols = [
    { key: 'id', header: 'ID' },
    { key: 'code', header: 'Code' },
    { key: 'title', header: 'Title' },
    { key: 'framework', header: 'Framework' },
    { key: 'effectiveness', header: 'Effectiveness' },
    { key: 'owner', header: 'Owner' },
  ];

  const stats = {
    total: controls.length,
    effective: controls.filter(c => c.effectiveness === 'Effective').length,
    partial: controls.filter(c => c.effectiveness === 'Partially Effective').length,
    ineffective: controls.filter(c => c.effectiveness === 'Ineffective').length,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-text m-0">{t('Controls Library')}</h1>
          <p className="text-text-muted text-sm mt-1 mb-0">
            {t('Central control register linked to frameworks, risks, and policies.')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() => exportRowsToCsv('controls.csv', exportCols, controls)}
          >
            <Download size={16} /> {t('Export Excel')}
          </button>
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() => exportPrintablePdf(t('Controls Library'), tableHtml(exportCols, controls))}
          >
            <Download size={16} /> {t('Export PDF')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: t('Total'), value: stats.total },
          { label: t('Effective'), value: stats.effective },
          { label: t('Partially Effective'), value: stats.partial },
          { label: t('Ineffective'), value: stats.ineffective },
        ].map(s => (
          <div key={s.label} className="card p-3">
            <p className="text-xs text-text-muted m-0">{s.label}</p>
            <p className="text-xl font-semibold text-text m-0">{s.value}</p>
          </div>
        ))}
      </div>

      <SimpleDataGrid columns={columns} rows={controls} pageSize={10} />
      <p className="text-xs text-text-muted m-0">
        {t('Effectiveness changes are saved to local storage and recorded in the audit trail.')}
      </p>
    </div>
  );
};

export default ControlsLibrary;
