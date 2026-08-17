import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { StatusBadge } from '../components/grc';

const IntegrationsPage = () => {
  const { t } = useTranslation('grc');
  const { integrations, simulateIntegrationSync } = useAppData();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('Integrations')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Simulated API connections (ERP, SIEM, Identity). Sync is stored locally only.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {integrations.map(item => (
          <div key={item.id} className="card p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="m-0 text-base font-semibold text-text">{t(item.name)}</h2>
                <p className="m-0 mt-1 text-xs text-text-muted">
                  {t('Last sync')}: {item.lastSync ? new Date(item.lastSync).toLocaleString() : '—'}
                </p>
              </div>
              <StatusBadge status={item.status.includes('Connected') ? 'Connected' : 'Not configured'} />
            </div>
            <button
              type="button"
              className="btn btn-primary w-fit"
              onClick={() => simulateIntegrationSync(item.id)}
            >
              <RefreshCw size={14} /> {t('Simulate sync')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
