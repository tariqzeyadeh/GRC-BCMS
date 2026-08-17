import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppData } from '../context/AppDataContext';
import { StatusBadge } from '../components/grc';

const StrategicGoalsPage = () => {
  const { t } = useTranslation('grc');
  const { goals } = useAppData();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('Strategic Goals')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Link governance policies and risks to enterprise objectives.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {goals.map(g => (
          <div key={g.id} className="card p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="m-0 font-mono text-xs text-text-muted">{g.id}</p>
                <h2 className="m-0 text-base font-semibold text-text">{t(g.title)}</h2>
              </div>
              <StatusBadge status={g.status} />
            </div>
            <p className="m-0 text-xs text-text-muted">
              {t('Horizon')}: {g.horizon} · {t('Owner')}: {g.owner}
            </p>
            <div>
              <p className="m-0 text-xs font-semibold text-text mb-1">{t('Linked policies')}</p>
              <div className="flex flex-wrap gap-1">
                {g.linkedPolicyIds.map(id => (
                  <Link key={id} to={`/policies/${id}`} className="text-xs text-brand no-underline">
                    {id}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="m-0 text-xs font-semibold text-text mb-1">{t('Linked risks')}</p>
              <div className="flex flex-wrap gap-1">
                {g.linkedRiskIds.map(id => (
                  <Link key={id} to={`/risks/${id}`} className="text-xs text-brand no-underline">
                    {id}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicGoalsPage;
