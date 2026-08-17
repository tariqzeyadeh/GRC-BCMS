import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, Plus } from 'lucide-react';
import { StatusBadge, SimpleDataGrid } from '../components/grc';
import { useAppData } from '../context/AppDataContext';
import { exportPrintablePdf, exportRowsToCsv, tableHtml } from '../lib/export';

const AuditRegister = () => {
  const { t } = useTranslation('grc');
  const { audits, findings, addAudit, updateFinding } = useAppData();
  const [draft, setDraft] = useState({
    title: '',
    owner: '',
    framework: 'ISO 27001',
    plannedEnd: '',
    scope: '',
  });

  const columns = useMemo(
    () => [
      { key: 'id', header: t('ID') },
      { key: 'title', header: t('Title'), render: row => t(row.title) },
      { key: 'type', header: t('Type'), render: row => t(row.type) },
      { key: 'framework', header: t('Framework') },
      { key: 'owner', header: t('Owner') },
      { key: 'plannedEnd', header: t('Due') },
      {
        key: 'status',
        header: t('Status'),
        render: row => <StatusBadge status={row.status} />,
      },
      {
        key: 'findings',
        header: t('Findings'),
        render: row => findings.filter(f => f.auditId === row.id).length,
      },
    ],
    [t, findings]
  );

  const exportCols = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status' },
    { key: 'owner', header: 'Owner' },
    { key: 'plannedEnd', header: 'Due' },
  ];

  const onAdd = e => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    addAudit({ ...draft, title: draft.title.trim() });
    setDraft({ title: '', owner: '', framework: 'ISO 27001', plannedEnd: '', scope: '' });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-text m-0">{t('Audit Management')}</h1>
          <p className="text-text-muted text-sm mt-1 mb-0">
            {t('Plan internal/external audits, track findings, and close recommendations.')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() => exportRowsToCsv('audits.csv', exportCols, audits)}
          >
            <Download size={16} /> {t('Export Excel')}
          </button>
          <button
            type="button"
            className="btn btn-ghost border border-border"
            onClick={() => exportPrintablePdf(t('Audit Management'), tableHtml(exportCols, audits))}
          >
            <Download size={16} /> {t('Export PDF')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: t('Total'), value: audits.length },
          { label: t('Open'), value: audits.filter(a => a.status === 'Open').length },
          { label: t('In Progress'), value: audits.filter(a => a.status === 'In Progress').length },
          { label: t('Open findings'), value: findings.filter(f => f.status !== 'Closed').length },
        ].map(s => (
          <div key={s.label} className="card p-3">
            <p className="text-xs text-text-muted m-0">{s.label}</p>
            <p className="text-xl font-semibold text-text m-0">{s.value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={onAdd} className="card p-4 grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
        <div className="md:col-span-2">
          <label className="text-xs text-text-muted">{t('Title')}</label>
          <input
            className="input-base mt-1"
            value={draft.title}
            onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
            placeholder={t('New audit title')}
          />
        </div>
        <div>
          <label className="text-xs text-text-muted">{t('Owner')}</label>
          <input
            className="input-base mt-1"
            value={draft.owner}
            onChange={e => setDraft(d => ({ ...d, owner: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs text-text-muted">{t('Due')}</label>
          <input
            type="date"
            className="input-base mt-1"
            value={draft.plannedEnd}
            onChange={e => setDraft(d => ({ ...d, plannedEnd: e.target.value }))}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <Plus size={16} /> {t('Add audit')}
        </button>
      </form>

      <SimpleDataGrid columns={columns} rows={audits} pageSize={8} />

      <div className="card p-4">
        <h2 className="text-base font-semibold m-0 mb-3">{t('Findings & recommendations')}</h2>
        <div className="flex flex-col gap-2">
          {findings.map(f => (
            <div
              key={f.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between border border-border rounded-lg p-3 bg-surface"
            >
              <div className="min-w-0">
                <p className="m-0 text-sm font-medium text-text">
                  {f.id} · {t(f.title)}
                </p>
                <p className="m-0 mt-1 text-xs text-text-muted">
                  {f.auditId} · {t(f.severity)} · {t('Due')}: {f.dueDate}
                  {f.linkedRiskId ? (
                    <>
                      {' · '}
                      <Link to={`/risks/${f.linkedRiskId}`} className="text-brand no-underline">
                        {f.linkedRiskId}
                      </Link>
                    </>
                  ) : null}
                </p>
                <p className="m-0 mt-1 text-xs text-text-muted">{t(f.recommendation)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  className="input-base w-auto text-xs h-8"
                  value={f.status}
                  onChange={e => updateFinding(f.id, { status: e.target.value })}
                  aria-label={t('Status')}
                >
                  <option value="Open">{t('Open')}</option>
                  <option value="In Progress">{t('In Progress')}</option>
                  <option value="Closed">{t('Closed')}</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditRegister;
