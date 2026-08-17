import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarClock, ExternalLink, User2 } from 'lucide-react';

import { Sheet } from '../ui/Sheet';
import TabsBar from './TabsBar';
import PolicyStatusBadge from './PolicyStatusBadge';
import WorkflowStepper from './WorkflowStepper';
import { POLICY_DEPARTMENTS, buildPolicyWorkflow } from '../../data/mockPolicies';

/**
 * Quick-edit policy drawer (executive-grc-dashboard PolicyEditorDrawer).
 */
export default function PolicyEditorDrawer({ policy, open, onOpenChange }) {
  const { t } = useTranslation('grc');
  const [tab, setTab] = useState('content');
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (open && policy) {
      setDraft({ ...policy });
      setTab('content');
    }
    if (!open) setDraft(null);
  }, [open, policy]);

  const form = draft;

  const setField = (key, value) => {
    setDraft(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const workflow = form ? form.workflow || buildPolicyWorkflow(form) : [];

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'workflow', label: 'Workflow Timeline' },
  ];

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      className="max-w-xl md:max-w-2xl"
      header={
        form ? (
          <div className="gap-2 px-6 py-5 pe-14">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>{form.id}</span>
              <span aria-hidden="true">·</span>
              <span>{form.version}</span>
            </div>
            <div className="flex items-start justify-between gap-3 mt-1">
              <h2 className="text-balance text-xl font-semibold text-foreground m-0">{t(form.title)}</h2>
              <PolicyStatusBadge status={form.status} />
            </div>
            <p className="text-pretty text-sm text-muted-foreground m-0 mt-2">{t(form.summary)}</p>
          </div>
        ) : null
      }
      footer={
        form ? (
          <div className="flex flex-row justify-between gap-2 border-t border-border px-6 py-4">
            <Link
              to={`/policies/${form.id}`}
              className="btn btn-ghost no-underline inline-flex items-center gap-1.5"
              onClick={() => onOpenChange?.(false)}
            >
              <ExternalLink size={16} />
              {t('Open full editor')}
            </Link>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => onOpenChange?.(false)}>
                {t('Cancel')}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => onOpenChange?.(false)}>
                {t('Save Changes')}
              </button>
            </div>
          </div>
        ) : null
      }
    >
      {form && (
        <div className="flex flex-col">
          <div className="border-b border-border px-6 pt-2">
            <TabsBar tabs={tabs} activeId={tab} onChange={setTab} />
          </div>
          <div className="px-6 py-5">
            {tab === 'content' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-4 rounded-md bg-surface px-3 py-2.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User2 className="size-3.5" size={14} aria-hidden="true" />
                    {t('Owned by')} <span className="font-medium text-foreground">{form.owner}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarClock className="size-3.5" size={14} aria-hidden="true" />
                    {t('Last updated')}{' '}
                    <span className="font-medium text-foreground">{form.lastReviewed}</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="policy-content" className="text-xs font-medium text-muted-foreground">
                    {t('Policy body')}
                  </label>
                  <textarea
                    id="policy-content"
                    className="input-base min-h-64 h-auto py-3 resize-none text-sm leading-relaxed"
                    value={form.content}
                    onChange={e => setField('content', e.target.value)}
                  />
                </div>
              </div>
            )}

            {tab === 'metadata' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground" htmlFor="policy-owner">
                    {t('Owner')}
                  </label>
                  <input
                    id="policy-owner"
                    className="input-base"
                    value={form.owner}
                    onChange={e => setField('owner', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground" htmlFor="policy-department">
                    {t('Department')}
                  </label>
                  <select
                    id="policy-department"
                    className="input-base"
                    value={form.department}
                    onChange={e => setField('department', e.target.value)}
                  >
                    {POLICY_DEPARTMENTS.map(d => (
                      <option key={d} value={d}>
                        {t(d)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground" htmlFor="policy-category">
                    {t('Category')}
                  </label>
                  <input
                    id="policy-category"
                    className="input-base"
                    value={form.category || form.tags?.[0] || ''}
                    onChange={e => setField('category', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground" htmlFor="policy-version">
                    {t('Version')}
                  </label>
                  <input
                    id="policy-version"
                    className="input-base"
                    value={form.version}
                    onChange={e => setField('version', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground" htmlFor="policy-next-review">
                    {t('Next Review')}
                  </label>
                  <input
                    id="policy-next-review"
                    className="input-base"
                    value={form.nextReview || form.lastReviewed}
                    onChange={e => setField('nextReview', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground" htmlFor="policy-expiry">
                    {t('Expiry Date')}
                  </label>
                  <input
                    id="policy-expiry"
                    className="input-base"
                    value={form.expiryDate}
                    onChange={e => setField('expiryDate', e.target.value)}
                  />
                </div>
              </div>
            )}

            {tab === 'workflow' && <WorkflowStepper steps={workflow} />}
          </div>
        </div>
      )}
    </Sheet>
  );
}
