import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Info, Save } from 'lucide-react';

import { BiaStepper, ImpactGrid, DependenciesSection } from '../components/bcms';
import { biaDraftMeta, wizardSteps } from '../data/mockBia';

const BiaWizard = () => {
  const { t } = useTranslation('bcms');
  const [activeStep, setActiveStep] = useState('impact');
  const [details, setDetails] = useState({
    processName: biaDraftMeta.processName,
    department: biaDraftMeta.department,
    owner: biaDraftMeta.owner,
    description: 'End-to-end authorization, clearing, and settlement for card and ACH payments.',
  });
  const [rtoRpo, setRtoRpo] = useState({ rto: '1', rpo: '15', justification: 'Tier 1 financial impact within 1 hour drives RTO.' });

  const stepIndex = wizardSteps.find(s => s.id === activeStep)?.index ?? 2;

  const goPrev = () => {
    const prev = wizardSteps.find(s => s.index === stepIndex - 1);
    if (prev) setActiveStep(prev.id);
  };

  const goNext = () => {
    const next = wizardSteps.find(s => s.index === stepIndex + 1);
    if (next) setActiveStep(next.id);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Link
          to="/bcms"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground no-underline hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" size={16} aria-hidden="true" />
          {t('Back to Resilience Dashboard')}
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground m-0">
              {t('Business Impact Analysis')}
            </h1>
            <span className="rounded-md bg-surface border border-border px-2 py-0.5 font-mono text-xs font-medium text-muted-foreground">
              {biaDraftMeta.id} · {t(biaDraftMeta.status)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground m-0 mt-1">
            {t(details.processName)} · {t(details.department)} · {t('Owner')}: {details.owner}
          </p>
        </div>
      </div>

      <BiaStepper activeStep={activeStep} onStepChange={setActiveStep} />

      {activeStep === 'details' && (
        <section className="flex flex-col gap-4 card p-5">
          <h2 className="text-lg font-semibold m-0">{t('Process Details')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground">{t('Process name')}</label>
              <input className="input-base mt-1" value={details.processName} onChange={e => setDetails(d => ({ ...d, processName: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('Department')}</label>
              <input className="input-base mt-1" value={details.department} onChange={e => setDetails(d => ({ ...d, department: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('Owner')}</label>
              <input className="input-base mt-1" value={details.owner} onChange={e => setDetails(d => ({ ...d, owner: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground">{t('Description')}</label>
              <textarea className="input-base mt-1 min-h-24 h-auto py-3" value={details.description} onChange={e => setDetails(d => ({ ...d, description: e.target.value }))} />
            </div>
          </div>
        </section>
      )}

      {activeStep === 'impact' && (
        <section aria-label={t('Impact Assessment')} className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand/10 font-mono text-xs font-semibold text-brand">2</span>
              <h2 className="text-lg font-semibold tracking-tight text-foreground m-0">{t('Impact Assessment')}</h2>
            </div>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              {t('Rate the severity of a disruption to this process across each recovery timeframe.')}
            </p>
          </div>
          <ImpactGrid />
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-xs text-muted-foreground">
            <Info className="size-3.5 shrink-0 text-brand" size={14} aria-hidden="true" />
            {t('Severity escalates with outage duration. The highest sustained impact drives the recommended tier.')}
          </div>
        </section>
      )}

      {activeStep === 'dependencies' && (
        <section aria-label={t('Dependencies')} className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand/10 font-mono text-xs font-semibold text-brand">3</span>
              <h2 className="text-lg font-semibold tracking-tight text-foreground m-0">{t('Dependencies')}</h2>
            </div>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              {t('Capture everything required to run this process during recovery.')}
            </p>
          </div>
          <DependenciesSection />
        </section>
      )}

      {activeStep === 'rto-rpo' && (
        <section className="flex flex-col gap-4 card p-5">
          <h2 className="text-lg font-semibold m-0">{t('RTO / RPO Calculation')}</h2>
          <p className="text-sm text-muted-foreground m-0">
            {t('Derive recovery objectives')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground">{t('Target RTO')} ({t('hours')})</label>
              <input className="input-base mt-1" value={rtoRpo.rto} onChange={e => setRtoRpo(s => ({ ...s, rto: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">{t('Target RPO')} ({t('minutes')})</label>
              <input className="input-base mt-1" value={rtoRpo.rpo} onChange={e => setRtoRpo(s => ({ ...s, rpo: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground">{t('Justification')}</label>
              <textarea className="input-base mt-1 min-h-24 h-auto py-3" value={rtoRpo.justification} onChange={e => setRtoRpo(s => ({ ...s, justification: e.target.value }))} />
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4 flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-muted-foreground m-0">{t('Recommended tier')}</p>
              <p className="text-sm font-semibold text-danger m-0">{t('Tier 1 Critical')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground m-0">{t('RTO')}</p>
              <p className="font-mono text-sm font-semibold m-0">{rtoRpo.rto}h</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground m-0">{t('RPO')}</p>
              <p className="font-mono text-sm font-semibold m-0">{rtoRpo.rpo}m</p>
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" className="btn btn-ghost" disabled={stepIndex <= 1} onClick={goPrev}>
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t('Previous')}
        </button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" className="btn btn-ghost border border-border">
            <Save size={16} />
            {t('Save draft')}
          </button>
          {stepIndex < 4 ? (
            <button type="button" className="btn btn-primary" onClick={goNext}>
              {activeStep === 'impact' ? t('Continue to Dependencies') : activeStep === 'dependencies' ? t('Continue to RTO / RPO') : t('Next')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </button>
          ) : (
            <Link to="/bcms/bcp" className="btn btn-primary no-underline inline-flex items-center gap-1.5">
              {t('Open Continuity Plan')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiaWizard;
