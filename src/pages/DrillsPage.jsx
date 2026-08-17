import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { StatusBadge } from '../components/grc';

const DrillsPage = () => {
  const { t } = useTranslation('bcms');
  const { drills, updateDrill, pushNotification } = useAppData();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('Drills & Simulations')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Plan, record, and track continuity exercise outcomes and open findings.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: t('Total'), value: drills.length },
          { label: t('Completed'), value: drills.filter(d => d.status === 'Completed').length },
          {
            label: t('Open findings'),
            value: drills.reduce((sum, d) => sum + (d.findingsOpen || 0), 0),
          },
        ].map(s => (
          <div key={s.label} className="card p-3">
            <p className="text-xs text-text-muted m-0">{s.label}</p>
            <p className="text-xl font-semibold text-text m-0">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {drills.map(d => (
          <div key={d.id} className="card p-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="m-0 font-mono text-xs text-text-muted">{d.id}</p>
                <h2 className="m-0 text-base font-semibold text-text">{t(d.title)}</h2>
                <p className="m-0 mt-1 text-xs text-text-muted">
                  {t(d.type)} · {d.date} · {t('Owner')}: {d.owner}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={d.status} />
                <StatusBadge status={d.result === '—' ? 'Pending' : d.result} />
              </div>
            </div>
            <p className="m-0 text-xs text-text-muted">
              {t('Linked BCP')}: {d.linkedBcpId} · {t('Linked BIA')}:{' '}
              <Link to="/bcms/bia" className="text-brand no-underline">
                {d.linkedBiaId}
              </Link>{' '}
              · {t('Open findings')}: {d.findingsOpen}
            </p>
            <div className="flex flex-wrap gap-2">
              <select
                className="input-base w-auto text-xs h-8"
                value={d.status}
                onChange={e => updateDrill(d.id, { status: e.target.value })}
              >
                <option value="Planned">{t('Planned')}</option>
                <option value="In Progress">{t('In Progress')}</option>
                <option value="Completed">{t('Completed')}</option>
              </select>
              <select
                className="input-base w-auto text-xs h-8"
                value={d.result}
                onChange={e => {
                  updateDrill(d.id, { result: e.target.value });
                  if (e.target.value === 'Partial' || e.target.value === 'Fail') {
                    pushNotification({
                      type: 'drill',
                      title: 'Drill findings require follow-up',
                      body: 'Open the audit register to track related findings.',
                      linkTo: '/audits',
                    });
                  }
                }}
              >
                <option value="—">—</option>
                <option value="Pass">{t('Pass')}</option>
                <option value="Partial">{t('Partial')}</option>
                <option value="Fail">{t('Fail')}</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrillsPage;
