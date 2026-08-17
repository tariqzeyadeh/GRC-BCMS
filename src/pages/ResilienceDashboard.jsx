import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarClock, ClipboardList, FileText, Network, Plus, Siren, Timer } from 'lucide-react';

import { KpiCard } from '../components/grc';
import {
  BiaCompletionChart,
  ExerciseSuccessChart,
  CriticalProcessesTable,
} from '../components/bcms';
import { bcmsKpis } from '../data/mockBcms';

const ResilienceDashboard = () => {
  const { t } = useTranslation('bcms');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-text m-0 text-2xl font-semibold tracking-tight">{t('Resilience Dashboard')}</h1>
          <p className="text-text-muted text-sm mt-1 mb-0">
            {t('Business continuity posture, recovery objectives, and critical process readiness across the enterprise.')}
          </p>
        </div>
        <Link
          to="/bcms/crisis"
          className="btn no-underline inline-flex items-center gap-2 self-start bg-red-700 hover:bg-red-600 text-white border-red-800 shadow-sm"
        >
          <Siren size={16} aria-hidden="true" />
          {t('Enter Crisis Mode')}
        </Link>
      </div>

      <section aria-label={t('Resilience metrics')} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label={t(bcmsKpis.criticalProcesses.label)}
          value={bcmsKpis.criticalProcesses.value}
          delta={bcmsKpis.criticalProcesses.delta}
          deltaLabel={t(bcmsKpis.criticalProcesses.deltaLabel)}
          trend={bcmsKpis.criticalProcesses.trend}
          icon={Network}
        />
        <KpiCard
          label={t(bcmsKpis.averageRto.label)}
          value={bcmsKpis.averageRto.value}
          suffix={bcmsKpis.averageRto.suffix}
          delta={bcmsKpis.averageRto.delta}
          deltaLabel={t(bcmsKpis.averageRto.deltaLabel)}
          trend={bcmsKpis.averageRto.trend}
          icon={Timer}
          invertDelta
        />
        <KpiCard
          label={t(bcmsKpis.overdueBiaReviews.label)}
          value={bcmsKpis.overdueBiaReviews.value}
          delta={bcmsKpis.overdueBiaReviews.delta}
          deltaLabel={t(bcmsKpis.overdueBiaReviews.deltaLabel)}
          trend={bcmsKpis.overdueBiaReviews.trend}
          icon={ClipboardList}
          invertDelta
        />
        <KpiCard
          label={t(bcmsKpis.upcomingDrills.label)}
          value={bcmsKpis.upcomingDrills.value}
          delta={bcmsKpis.upcomingDrills.delta}
          deltaLabel={t(bcmsKpis.upcomingDrills.deltaLabel)}
          trend={bcmsKpis.upcomingDrills.trend}
          icon={CalendarClock}
        />
      </section>

      <section aria-label={t('Continuity charts')} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BiaCompletionChart />
        <ExerciseSuccessChart />
      </section>

      <section aria-label={t('Critical Processes Register')} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground m-0">{t('Critical Processes Register')}</h2>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              {t('Approved Business Impact Analyses ranked by recovery priority.')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/bcms/bcp" className="btn btn-ghost border border-border no-underline inline-flex items-center gap-1.5">
              <FileText size={16} />
              {t('View Continuity Plan')}
            </Link>
            <Link to="/bcms/bia" className="btn btn-primary no-underline inline-flex items-center gap-1.5">
              <Plus size={16} />
              {t('New BIA')}
            </Link>
          </div>
        </div>
        <CriticalProcessesTable />
      </section>
    </div>
  );
};

export default ResilienceDashboard;
