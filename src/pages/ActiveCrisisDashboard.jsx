import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  ArrowLeft,
  BellRing,
  Clock3,
  Megaphone,
  PlusCircle,
  Radio,
  ShieldAlert,
  Siren,
  Users,
} from 'lucide-react';

import { Progress } from '../components/ui/Progress';
import {
  crisisScenario,
  crisisTimelineInitial,
  activatedPlansInitial,
  CRISIS_STARTED_AT,
} from '../data/mockCrisis';
import { cn } from '../lib/utils';

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatElapsed(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function nowClockLabel() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const eventTypeStyles = {
  alert: 'bg-red-500/20 text-red-300 border-red-500/40',
  plan: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  comms: 'bg-sky-500/20 text-sky-200 border-sky-500/40',
  recovery: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
};

const ActiveCrisisDashboard = () => {
  const { t } = useTranslation('bcms');
  const [elapsed, setElapsed] = useState(() => Date.now() - new Date(CRISIS_STARTED_AT).getTime());
  const [timeline, setTimeline] = useState(crisisTimelineInitial);
  const [toast, setToast] = useState(null);
  const [logOpen, setLogOpen] = useState(false);
  const [logText, setLogText] = useState('');

  useEffect(() => {
    const start = new Date(CRISIS_STARTED_AT).getTime();
    const id = setInterval(() => setElapsed(Date.now() - start), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(id);
  }, [toast]);

  const flash = message => setToast(message);

  const logEvent = () => {
    const text = logText.trim();
    if (!text) return;
    setTimeline(prev => [
      {
        id: `evt-${Date.now()}`,
        time: nowClockLabel(),
        action: text,
        user: 'Crisis Desk',
        type: 'alert',
      },
      ...prev,
    ]);
    setLogText('');
    setLogOpen(false);
    flash(t('Event logged'));
  };

  return (
    <div className="crisis-mode -mx-1 sm:mx-0 rounded-xl overflow-hidden border border-red-900/60">
      {/* Emergency header */}
      <header className="crisis-banner relative px-4 py-4 sm:px-6 sm:py-5">
        <div className="absolute inset-0 crisis-banner-pulse pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <Link
              to="/bcms"
              className="inline-flex items-center gap-1.5 text-xs text-red-200/80 no-underline hover:text-white mb-2"
            >
              <ArrowLeft size={14} className="rtl:rotate-180" />
              {t('Back to Resilience Dashboard')}
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/50">
                <Siren size={14} className="crisis-icon-pulse" aria-hidden="true" />
                {t('LIVE')}
              </span>
              <span className="text-[11px] font-mono text-red-200/90">{crisisScenario.id}</span>
            </div>
            <h1 className="m-0 text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              {t(crisisScenario.title)}
            </h1>
            <p className="m-0 mt-1.5 text-sm sm:text-base font-semibold text-red-100">
              [{t('Mock Scenario')}: {t(crisisScenario.scenario)}]
            </p>
            <p className="m-0 mt-2 text-xs text-red-200/80">
              {t(crisisScenario.location)} · {t('Incident Commander')}: {crisisScenario.commander}
            </p>
          </div>

          <div className="crisis-clock shrink-0 rounded-xl border border-red-500/50 bg-black/50 px-5 py-4 text-center backdrop-blur-sm min-w-[200px]">
            <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-red-300 font-semibold">
              <Clock3 size={14} aria-hidden="true" />
              {t('Time Since Disruption')}
            </div>
            <div
              className="mt-2 font-mono text-4xl sm:text-5xl font-bold tabular-nums text-white tracking-tight"
              aria-live="polite"
            >
              {formatElapsed(elapsed)}
            </div>
            <p className="m-0 mt-1 text-[11px] text-red-300/80">{t('HH : MM : SS')}</p>
          </div>
        </div>
      </header>

      {toast && (
        <div className="mx-4 mt-3 sm:mx-6 rounded-lg border border-amber-500/40 bg-amber-950/80 px-4 py-2 text-sm text-amber-100" role="status">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 sm:p-6 bg-[#14080a]">
        {/* Left: Timeline + Communications */}
        <div className="flex flex-col gap-4 min-w-0">
          <section className="crisis-panel flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="m-0 text-sm font-bold uppercase tracking-wide text-red-100 flex items-center gap-2">
                <Radio size={16} className="text-red-400" aria-hidden="true" />
                {t('Crisis Timeline')}
              </h2>
              <span className="text-[11px] font-mono text-red-300/70">{timeline.length} {t('events')}</span>
            </div>
            <ol className="m-0 p-0 list-none flex flex-col gap-0 max-h-[420px] overflow-y-auto pe-1">
              {timeline.map((evt, i) => (
                <li key={evt.id} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < timeline.length - 1 && (
                    <span className="absolute start-[11px] top-6 bottom-0 w-px bg-red-900/80" aria-hidden="true" />
                  )}
                  <span className="relative z-10 mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-red-600 bg-red-950 text-red-300">
                    <AlertTriangle size={12} aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0 rounded-lg border border-red-900/70 bg-black/40 px-3 py-2.5">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-red-300">{evt.time}</span>
                      <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase border', eventTypeStyles[evt.type] || eventTypeStyles.alert)}>
                        {t(evt.type)}
                      </span>
                    </div>
                    <p className="m-0 text-sm text-red-50 leading-snug">{t(evt.action)}</p>
                    <p className="m-0 mt-1.5 text-[11px] text-red-300/70">
                      {t('Logged by')} <span className="font-medium text-red-200">{t(evt.user)}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="crisis-panel flex flex-col gap-3">
            <h2 className="m-0 text-sm font-bold uppercase tracking-wide text-red-100 flex items-center gap-2">
              <Megaphone size={16} className="text-red-400" aria-hidden="true" />
              {t('Quick Communications')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                className="crisis-action-btn"
                onClick={() => flash(t('Mass alert queued (SMS/Email)'))}
              >
                <BellRing size={18} aria-hidden="true" />
                <span>{t('Send Mass Alert (SMS/Email)')}</span>
              </button>
              <button
                type="button"
                className="crisis-action-btn crisis-action-btn--amber"
                onClick={() => flash(t('Executive Board notified'))}
              >
                <Users size={18} aria-hidden="true" />
                <span>{t('Notify Executive Board')}</span>
              </button>
              <button
                type="button"
                className="crisis-action-btn crisis-action-btn--outline"
                onClick={() => setLogOpen(v => !v)}
              >
                <PlusCircle size={18} aria-hidden="true" />
                <span>{t('Log New Event')}</span>
              </button>
            </div>

            {logOpen && (
              <div className="flex flex-col gap-2 rounded-lg border border-red-800/60 bg-black/50 p-3">
                <label className="text-xs text-red-300" htmlFor="crisis-log">
                  {t('Event description')}
                </label>
                <textarea
                  id="crisis-log"
                  className="crisis-input min-h-20"
                  value={logText}
                  onChange={e => setLogText(e.target.value)}
                  placeholder={t('Describe the action taken…')}
                />
                <div className="flex justify-end gap-2">
                  <button type="button" className="crisis-cancel-btn" onClick={() => setLogOpen(false)}>
                    {t('Cancel')}
                  </button>
                  <button type="button" className="crisis-action-btn !flex-row !min-h-0 !py-2 !px-4 w-auto" onClick={logEvent}>
                    {t('Post to timeline')}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right: Activated plans */}
        <section className="crisis-panel flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="m-0 text-sm font-bold uppercase tracking-wide text-red-100 flex items-center gap-2">
              <ShieldAlert size={16} className="text-red-400" aria-hidden="true" />
              {t('Activated Plans Tracker')}
            </h2>
            <span className="rounded-full bg-red-600/30 border border-red-500/50 px-2.5 py-0.5 text-[11px] font-bold text-red-100">
              {activatedPlansInitial.length} {t('active')}
            </span>
          </div>

          <ul className="m-0 p-0 list-none flex flex-col gap-3">
            {activatedPlansInitial.map(plan => (
              <li
                key={plan.id}
                className="rounded-xl border border-red-900/80 bg-gradient-to-br from-red-950/80 to-black/60 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="m-0 text-sm font-semibold text-white">{t(plan.name)}</h3>
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-red-800/60 text-red-100 border border-red-600/40">
                        {t(plan.type)}
                      </span>
                    </div>
                    <p className="m-0 mt-1 text-[11px] text-red-300/80">
                      {t('Owner')}: {plan.owner} · {plan.linkedBcp}
                    </p>
                  </div>
                  <div className="text-end shrink-0">
                    <p className="m-0 font-mono text-2xl font-bold tabular-nums text-white">{plan.progress}%</p>
                    <p className="m-0 text-[10px] uppercase tracking-wide text-red-300/70">{t('Complete')}</p>
                  </div>
                </div>

                <Progress
                  value={plan.progress}
                  className="h-2.5 border-red-900/80 bg-black/60 [&>div]:bg-gradient-to-r [&>div]:from-red-600 [&>div]:to-amber-500"
                />

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-red-300/80">
                  <span>
                    {plan.stepsDone}/{plan.stepsTotal} {t('recovery steps')}
                  </span>
                  <span className="font-semibold text-amber-200">{t(plan.status)}</span>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/bcms/bcp"
            className="text-center text-xs font-semibold text-red-300 no-underline hover:text-white border border-red-800/60 rounded-lg py-2.5 bg-black/30"
          >
            {t('Open Continuity Plan Editor')} →
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ActiveCrisisDashboard;
