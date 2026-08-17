import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Stepper, StatusBadge, SimpleDataGrid, ControlCard, ComplianceScoreWidget } from '../components/grc';
import { mockFrameworks } from '../data/mockCompliance';

const STEPS = ['Select Framework', 'Questionnaire', 'Summary'];

const answerScore = { Yes: 1, Partial: 0.5, No: 0 };

const emptyAnswer = () => ({
  answer: '',
  comment: '',
  evidence: '',
  owner: '',
  dueDate: '',
  priority: 'Medium',
});

const ComplianceAssessment = () => {
  const { t } = useTranslation('grc');
  const [step, setStep] = useState(0);
  const [frameworkId, setFrameworkId] = useState(mockFrameworks[0]?.id ?? '');
  const [answers, setAnswers] = useState({});

  const framework = mockFrameworks.find(f => f.id === frameworkId);
  const controls = framework?.controls ?? [];
  const answeredCount = controls.filter(c => answers[c.id]?.answer).length;

  const compliancePercent = useMemo(() => {
    if (!controls.length) return 0;
    const total = controls.reduce((sum, c) => sum + (answerScore[answers[c.id]?.answer] ?? 0), 0);
    return Math.round((total / controls.length) * 100);
  }, [answers, controls]);

  const gaps = useMemo(
    () =>
      controls
        .filter(c => answers[c.id]?.answer === 'No' || answers[c.id]?.answer === 'Partial')
        .map(c => ({
          id: c.id,
          code: c.code,
          title: c.title,
          answer: answers[c.id]?.answer,
          owner: answers[c.id]?.owner || '—',
          dueDate: answers[c.id]?.dueDate || '—',
          priority: answers[c.id]?.priority || 'Medium',
          evidence: answers[c.id]?.evidence || '—',
        })),
    [answers, controls]
  );

  const setAnswer = (controlId, patch) => {
    setAnswers(prev => ({
      ...prev,
      [controlId]: { ...emptyAnswer(), ...prev[controlId], ...patch },
    }));
  };

  const canNext =
    step === 0 ? Boolean(frameworkId) : step === 1 ? controls.every(c => answers[c.id]?.answer) : true;

  const gapColumns = useMemo(
    () => [
      { key: 'code', header: t('ID') },
      { key: 'title', header: t('Title'), render: row => t(row.title) },
      { key: 'answer', header: t('Status'), render: row => <StatusBadge status={row.answer} /> },
      { key: 'priority', header: t('Priority'), render: row => <StatusBadge status={row.priority} /> },
      { key: 'owner', header: t('Owner') },
      { key: 'dueDate', header: t('Due') },
      { key: 'evidence', header: t('Evidence') },
    ],
    [t]
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('Compliance Assessment')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Gap analysis with evidence, owners, and remediation priorities.')}
        </p>
      </div>

      <div className="card p-4">
        <Stepper steps={STEPS} currentStep={step} orientation="horizontal" />
      </div>

      <div className="card p-4">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div className="max-w-lg">
              <label className="text-sm text-text-muted" htmlFor="framework">
                {t('Framework')}
              </label>
              <select
                id="framework"
                className="input-base mt-1"
                value={frameworkId}
                onChange={e => {
                  setFrameworkId(e.target.value);
                  setAnswers({});
                }}
              >
                {mockFrameworks.map(f => (
                  <option key={f.id} value={f.id}>
                    {t(f.name)}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mockFrameworks.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFrameworkId(f.id);
                    setAnswers({});
                  }}
                  className={`card p-4 text-start cursor-pointer hover:shadow-md ${
                    frameworkId === f.id ? 'ring-2 ring-brand' : ''
                  }`}
                >
                  <p className="m-0 font-semibold text-text">{t(f.name)}</p>
                  <p className="m-0 mt-1 text-xs text-text-muted">{t(f.description)}</p>
                  <p className="m-0 mt-2 text-xs text-brand font-medium">
                    {f.controls.length} {t('controls')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4 items-start">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap justify-between gap-2 text-sm text-text-muted">
                <span>
                  {t(framework?.name)} · {controls.length} {t('controls')}
                </span>
                <span>
                  {answeredCount}/{controls.length} {t('answered')}
                </span>
              </div>
              {controls.map(control => (
                <ControlCard
                  key={control.id}
                  control={control}
                  answer={answers[control.id]}
                  onChange={patch => setAnswer(control.id, patch)}
                />
              ))}
            </div>
            <div className="xl:sticky xl:top-4">
              <ComplianceScoreWidget answers={answers} total={controls.length} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 items-start max-w-5xl mx-auto w-full">
              <ComplianceScoreWidget answers={answers} total={controls.length} />
              <div className="text-center md:text-start py-2">
                <p className="text-text-muted m-0">{t('Overall Compliance')}</p>
                <p className="text-5xl font-bold text-brand m-2">{compliancePercent}%</p>
                <p className="text-sm text-text-muted">
                  {t(framework?.name)} · {gaps.length} {t('gaps')}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-text font-semibold mb-2">{t('Remediation roadmap')}</h3>
              <SimpleDataGrid columns={gapColumns} rows={gaps} pageSize={6} />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between gap-2">
          <button type="button" className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>
            {t('Previous')}
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              disabled={!canNext}
              onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
            >
              {t('Next')}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setStep(0)}>
              {t('Start over')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAssessment;
