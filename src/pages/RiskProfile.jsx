import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, ShieldAlert, Trash2 } from 'lucide-react';

import {
  TabsBar,
  StatusBadge,
  RiskLevelBadge,
  RiskDetailsTab,
  RiskAssessmentTab,
  RiskMitigationTab,
} from '../components/grc';
import { getRiskById } from '../data/mockRisks';
import {
  CONTROL_EFFECTIVENESS,
  isWithinAppetite,
} from '../constants/riskScore';

function enrichMitigation(m) {
  const done = m.done === true || m.status === 'Done';
  const progress =
    typeof m.progress === 'number' ? m.progress : done ? 100 : m.status === 'In Progress' ? 55 : 15;
  return { ...m, done, progress };
}

const RiskProfile = () => {
  const { t } = useTranslation('grc');
  const { id } = useParams();
  const found = getRiskById(id);

  const [tab, setTab] = useState('details');
  const [inherentImpact, setInherentImpact] = useState(1);
  const [inherentLikelihood, setInherentLikelihood] = useState(1);
  const [residualImpact, setResidualImpact] = useState(1);
  const [residualLikelihood, setResidualLikelihood] = useState(1);
  const [treatment, setTreatment] = useState('Mitigate');
  const [details, setDetails] = useState({});
  const [controls, setControls] = useState([]);
  const [mitigations, setMitigations] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', assignee: '', dueDate: '' });
  const [newControl, setNewControl] = useState({ name: '', effectiveness: 'Partially Effective' });

  useEffect(() => {
    const risk = getRiskById(id);
    setTab('details');
    setInherentImpact(risk?.inherentImpact ?? 1);
    setInherentLikelihood(risk?.inherentLikelihood ?? 1);
    setResidualImpact(risk?.residualImpact ?? 1);
    setResidualLikelihood(risk?.residualLikelihood ?? 1);
    setTreatment(risk?.treatment ?? 'Mitigate');
    setDetails({
      title: risk?.title ?? '',
      category: risk?.category ?? '',
      owner: risk?.owner ?? '',
      department: risk?.department ?? '',
      description: risk?.description ?? '',
      cause: risk?.cause ?? '',
      effect: risk?.effect ?? '',
      identifiedOn: risk?.identifiedOn ?? '',
      nextReview: risk?.nextReview ?? '',
    });
    setControls(risk?.controls ?? []);
    setMitigations((risk?.mitigations ?? []).map(enrichMitigation));
    setNewTask({ title: '', assignee: '', dueDate: '' });
  }, [id]);

  const residualScore = useMemo(
    () => residualImpact * residualLikelihood,
    [residualImpact, residualLikelihood]
  );
  const within = isWithinAppetite(residualScore);

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'controls', label: 'Controls' },
    { id: 'mitigation', label: 'Mitigation Plans' },
  ];

  if (!found) {
    return (
      <div className="card p-6">
        <p className="text-text">{t('Risk not found')}</p>
        <Link to="/risks" className="btn btn-ghost mt-3 no-underline inline-flex">
          {t('Back')}
        </Link>
      </div>
    );
  }

  const addMitigation = () => {
    if (!newTask.title.trim()) return;
    setMitigations(prev => [
      ...prev,
      enrichMitigation({
        id: `MIT-${Date.now()}`,
        title: newTask.title,
        assignee: newTask.assignee || '—',
        status: 'Open',
        dueDate: newTask.dueDate,
        progress: 15,
        done: false,
      }),
    ]);
    setNewTask({ title: '', assignee: '', dueDate: '' });
  };

  const addControl = () => {
    if (!newControl.name.trim()) return;
    setControls(prev => [
      ...prev,
      { id: `CTL-${Date.now()}`, name: newControl.name, effectiveness: newControl.effectiveness },
    ]);
    setNewControl({ name: '', effectiveness: 'Partially Effective' });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/risks" className="btn btn-ghost h-9 px-2 no-underline">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t('Back')}
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand/15 text-brand">
              <ShieldAlert className="size-5" size={20} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-mono text-xs text-muted-foreground">{found.id}</span>
              <h1 className="text-balance text-lg font-semibold tracking-tight text-foreground m-0 truncate">
                {t(details.title)}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <StatusBadge status={within ? 'Within Appetite' : 'Out of Appetite'} />
                <span className="text-xs text-muted-foreground">{t(treatment)}</span>
              </div>
            </div>
          </div>
          <RiskLevelBadge score={residualScore} size="lg" />
        </div>

        <div className="px-6 pt-4">
          <TabsBar tabs={tabs} activeId={tab} onChange={setTab} />
        </div>

        <div className="px-6 pb-6">
          {tab === 'details' && <RiskDetailsTab risk={found} details={details} />}

          {tab === 'assessment' && (
            <RiskAssessmentTab
              residualImpact={residualImpact}
              residualLikelihood={residualLikelihood}
              setResidualImpact={setResidualImpact}
              setResidualLikelihood={setResidualLikelihood}
              inherentImpact={inherentImpact}
              inherentLikelihood={inherentLikelihood}
              setInherentImpact={setInherentImpact}
              setInherentLikelihood={setInherentLikelihood}
              treatment={treatment}
              setTreatment={setTreatment}
            />
          )}

          {tab === 'controls' && (
            <div className="flex flex-col gap-4">
              <ul className="m-0 p-0 list-none space-y-2">
                {controls.map(c => (
                  <li
                    key={c.id}
                    className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-surface"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="m-0 text-sm font-medium text-text">{t(c.name)}</p>
                      <p className="m-0 text-xs text-text-muted">{c.id}</p>
                    </div>
                    <StatusBadge status={c.effectiveness} />
                    <button
                      type="button"
                      className="btn btn-ghost h-8 px-2 text-red-500"
                      onClick={() => setControls(prev => prev.filter(x => x.id !== c.id))}
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
                {controls.length === 0 && (
                  <p className="text-sm text-text-muted">{t('No controls mapped')}</p>
                )}
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end border-t border-border pt-4">
                <input
                  className="input-base md:col-span-2"
                  placeholder={t('Control name')}
                  value={newControl.name}
                  onChange={e => setNewControl(s => ({ ...s, name: e.target.value }))}
                />
                <select
                  className="input-base"
                  value={newControl.effectiveness}
                  onChange={e => setNewControl(s => ({ ...s, effectiveness: e.target.value }))}
                >
                  {CONTROL_EFFECTIVENESS.map(e => (
                    <option key={e} value={e}>
                      {t(e)}
                    </option>
                  ))}
                </select>
                <button type="button" className="btn btn-primary md:col-span-3" onClick={addControl}>
                  <Plus size={16} /> {t('Add control')}
                </button>
              </div>
            </div>
          )}

          {tab === 'mitigation' && (
            <RiskMitigationTab
              mitigations={mitigations}
              setMitigations={setMitigations}
              newTask={newTask}
              setNewTask={setNewTask}
              onAdd={addMitigation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskProfile;
