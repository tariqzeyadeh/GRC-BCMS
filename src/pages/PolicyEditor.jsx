import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

import { TabsBar, PolicyStatusBadge, WorkflowStepper } from '../components/grc';
import { getPolicyById, buildPolicyWorkflow } from '../data/mockPolicies';

const emptyPolicy = {
  id: '',
  title: '',
  version: '0.1',
  status: 'Draft',
  owner: '',
  department: '',
  expiryDate: '',
  lastReviewed: '',
  summary: '',
  content: '',
  workflowStep: 0,
  tags: [],
  attestation: { required: 0, completed: 0, dueDate: '' },
  linkedRiskIds: [],
  linkedControlIds: [],
  versionHistory: [],
};

const PolicyEditor = () => {
  const { t } = useTranslation('grc');
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const initial = useMemo(() => {
    if (isNew) return { ...emptyPolicy, title: t('New Policy') };
    return getPolicyById(id) ?? { ...emptyPolicy, id, title: t('Policy not found') };
  }, [id, isNew, t]);

  const [form, setForm] = useState(initial);
  const [tab, setTab] = useState('content');

  useEffect(() => {
    setForm(initial);
    setTab('content');
  }, [initial]);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const updateAttestation = (key, value) =>
    setForm(prev => ({
      ...prev,
      attestation: { ...(prev.attestation ?? emptyPolicy.attestation), [key]: value },
    }));

  const attPct =
    form.attestation?.required > 0
      ? Math.round((form.attestation.completed / form.attestation.required) * 100)
      : 0;

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'attestation', label: 'Attestation' },
    { id: 'mapping', label: 'Mapping' },
    { id: 'workflow', label: 'Workflow' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/policies" className="btn btn-ghost h-9 px-2 no-underline">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t('Back')}
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-text m-0 truncate">{form.title || t('Policy Editor')}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {!isNew && <span className="text-xs text-text-muted">{form.id}</span>}
            <PolicyStatusBadge status={form.status} />
            <span className="text-xs text-text-muted">
              {t('Version')} {form.version}
            </span>
            {form.attestation?.required > 0 && (
              <span className="text-xs text-text-muted">
                {t('Attestation')}: {attPct}%
              </span>
            )}
          </div>
        </div>
      </div>

      {(form.summary || form.tags?.length > 0) && (
        <div className="card p-4">
          {form.summary && <p className="text-sm text-text m-0 mb-2">{t(form.summary)}</p>}
          <div className="flex flex-wrap gap-2">
            {(form.tags ?? []).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded bg-brand/10 text-brand text-xs font-medium">
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card p-4">
        <TabsBar tabs={tabs} activeId={tab} onChange={setTab} />

        {tab === 'content' && (
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm text-text-muted">{t('Title')}</label>
              <input className="input-base mt-1" value={form.title} onChange={e => update('title', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-text-muted">{t('Summary')}</label>
              <input className="input-base mt-1" value={form.summary ?? ''} onChange={e => update('summary', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-text-muted">{t('Content')}</label>
              <textarea
                className="input-base mt-1 min-h-64 py-3 h-auto font-mono text-sm"
                value={form.content}
                onChange={e => update('content', e.target.value)}
              />
            </div>
            {(form.versionHistory?.length ?? 0) > 0 && (
              <div>
                <p className="text-sm font-semibold text-text m-0 mb-2">{t('Version history')}</p>
                <ul className="m-0 ps-5 text-sm text-text-muted space-y-1">
                  {form.versionHistory.map(v => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'metadata' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['owner', t('Owner'), 'text'],
              ['department', t('Department'), 'text'],
              ['expiryDate', t('Expiry Date'), 'date'],
              ['lastReviewed', t('Last Reviewed'), 'date'],
              ['version', t('Version'), 'text'],
            ].map(([key, label, type]) => (
              <div key={key}>
                <label className="text-sm text-text-muted">{label}</label>
                <input
                  type={type}
                  className="input-base mt-1"
                  value={form[key] ?? ''}
                  onChange={e => update(key, e.target.value)}
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-text-muted">{t('Status')}</label>
              <select className="input-base mt-1" value={form.status} onChange={e => update('status', e.target.value)}>
                <option value="Draft">{t('Draft')}</option>
                <option value="In Review">{t('In Review')}</option>
                <option value="Published">{t('Published')}</option>
                <option value="Expired">{t('Expired')}</option>
              </select>
            </div>
          </div>
        )}

        {tab === 'attestation' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 md:col-span-1">
              <p className="text-xs text-text-muted m-0">{t('Attestation')}</p>
              <p className="text-3xl font-bold text-brand m-0">{attPct}%</p>
              <p className="text-xs text-text-muted m-0">
                {form.attestation?.completed ?? 0} / {form.attestation?.required ?? 0}
              </p>
            </div>
            <div>
              <label className="text-sm text-text-muted">{t('Required')}</label>
              <input
                type="number"
                className="input-base mt-1"
                value={form.attestation?.required ?? 0}
                onChange={e => updateAttestation('required', Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-text-muted">{t('Completed')}</label>
              <input
                type="number"
                className="input-base mt-1"
                value={form.attestation?.completed ?? 0}
                onChange={e => updateAttestation('completed', Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-text-muted">{t('Due')}</label>
              <input
                type="date"
                className="input-base mt-1"
                value={form.attestation?.dueDate ?? ''}
                onChange={e => updateAttestation('dueDate', e.target.value)}
              />
            </div>
          </div>
        )}

        {tab === 'mapping' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-text m-0 mb-2">{t('Linked risks')}</p>
              <div className="flex flex-wrap gap-2">
                {(form.linkedRiskIds ?? []).map(rid => (
                  <Link key={rid} to={`/risks/${rid}`} className="px-2 py-1 rounded bg-brand/10 text-brand text-xs no-underline">
                    {rid}
                  </Link>
                ))}
                {(form.linkedRiskIds ?? []).length === 0 && (
                  <p className="text-xs text-text-muted m-0">{t('No linked risks')}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-text m-0 mb-2">{t('Linked controls')}</p>
              <div className="flex flex-wrap gap-2">
                {(form.linkedControlIds ?? []).map(cid => (
                  <span key={cid} className="px-2 py-1 rounded bg-surface border border-border text-xs text-text">
                    {cid}
                  </span>
                ))}
                {(form.linkedControlIds ?? []).length === 0 && (
                  <p className="text-xs text-text-muted m-0">{t('No linked controls')}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'workflow' && (
          <div className="max-w-lg space-y-4">
            <p className="text-sm text-text-muted m-0 flex items-center gap-2">
              {t('Status')}: <PolicyStatusBadge status={form.status} />
            </p>
            <WorkflowStepper steps={form.workflow || buildPolicyWorkflow(form)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyEditor;
