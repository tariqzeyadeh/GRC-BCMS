import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';

import TabsBar from '../components/grc/TabsBar';
import {
  BcpStatusBadge,
  PlanOverview,
  CallTree,
  RecoveryProcedures,
} from '../components/bcms';
import { planHeader } from '../data/mockBcp';
import { exportPrintablePdf } from '../lib/export';

const ContinuityPlanEditor = () => {
  const { t } = useTranslation('bcms');
  const [tab, setTab] = useState('overview');

  const tabs = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'call-tree', label: 'Call Tree' },
      { id: 'recovery', label: 'Recovery Procedures' },
    ],
    []
  );

  const onExportPdf = () => {
    exportPrintablePdf(
      `${planHeader.id} — ${planHeader.title}`,
      `<p><strong>Department:</strong> ${planHeader.department}</p>
       <p><strong>Owner:</strong> ${planHeader.owner}</p>
       <p><strong>RTO/RPO:</strong> ${planHeader.rto} / ${planHeader.rpo}</p>
       <p>${planHeader.scope}</p>`
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Link
          to="/bcms"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground no-underline hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" size={16} aria-hidden="true" />
          {t('Back to Resilience Dashboard')}
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground m-0">
                {t(planHeader.title)} — {t('Continuity Plan')}
              </h1>
              <BcpStatusBadge status={planHeader.status} />
            </div>
            <p className="text-sm text-muted-foreground m-0">
              {planHeader.id} · {t(planHeader.department)} · {t('Owner')}: {planHeader.owner} ·{' '}
              <span className="font-mono">{planHeader.version}</span>
            </p>
          </div>

          <button type="button" className="btn btn-primary w-fit self-start" onClick={onExportPdf}>
            <Download size={16} aria-hidden="true" />
            {t('Export PDF')}
          </button>
        </div>
      </div>

      <div className="card p-4">
        <TabsBar tabs={tabs} activeId={tab} onChange={setTab} ns="bcms" />
        {tab === 'overview' && <PlanOverview />}

        {tab === 'call-tree' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground m-0">{t('Emergency Call Tree')}</h2>
              <p className="text-sm text-muted-foreground m-0 mt-1">
                {t('Chain of command for escalation during an active disruption. Each role has a primary contact and two backups.')}
              </p>
            </div>
            <CallTree />
          </div>
        )}

        {tab === 'recovery' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground m-0">{t('Recovery Procedures')}</h2>
              <p className="text-sm text-muted-foreground m-0 mt-1">
                {t('Ordered action plan to restore the process. Drag steps to reorder as the response evolves.')}
              </p>
            </div>
            <RecoveryProcedures />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Link to="/bcms/bia" className="btn btn-ghost no-underline inline-flex items-center gap-1.5">
          {t('Open linked BIA')}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};

export default ContinuityPlanEditor;
