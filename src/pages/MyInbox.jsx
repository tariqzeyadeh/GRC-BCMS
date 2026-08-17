import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

import { StatusBadge } from '../components/grc';
import { mockInboxTasks } from '../data/mockInbox';

const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
];

const MyInbox = () => {
  const { t } = useTranslation('grc');
  const [tasks, setTasks] = useState(mockInboxTasks.map(task => ({ ...task, decisionComment: '' })));
  const [commentDrafts, setCommentDrafts] = useState({});

  const counts = useMemo(
    () => ({
      todo: tasks.filter(x => x.column === 'todo').length,
      pending: tasks.filter(x => x.column === 'pending').length,
      completed: tasks.filter(x => x.column === 'completed').length,
      overdue: tasks.filter(x => x.column !== 'completed' && x.dueDate < '2026-08-17').length,
      high: tasks.filter(x => x.priority === 'High' && x.column !== 'completed').length,
    }),
    [tasks]
  );

  const decide = (id, decision) => {
    const comment = (commentDrafts[id] || '').trim();
    if (!comment) {
      window.alert(t('Decision comment is required'));
      return;
    }
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, column: 'completed', decision, decisionComment: comment, decidedAt: '2026-08-17' }
          : task
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('My Inbox')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Approvals with mandatory decision comments and overdue visibility.')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: t('To Do'), value: counts.todo },
          { label: t('Pending'), value: counts.pending },
          { label: t('Completed'), value: counts.completed },
          { label: t('Overdue'), value: counts.overdue },
          { label: `${t('High')} ${t('Priority')}`, value: counts.high },
        ].map(s => (
          <div key={s.label} className="card p-3">
            <p className="text-xs text-text-muted m-0">{s.label}</p>
            <p className="text-xl font-semibold text-text m-0">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
        {COLUMNS.map(col => (
          <div key={col.id} className="card p-3 flex flex-col gap-2 min-h-80">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-text font-semibold m-0">{t(col.label)}</h3>
              <span className="text-xs text-text-muted bg-surface border border-border rounded-full px-2 py-0.5">
                {tasks.filter(task => task.column === col.id).length}
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {tasks
                .filter(task => task.column === col.id)
                .map(task => {
                  const overdue = col.id !== 'completed' && task.dueDate < '2026-08-17';
                  return (
                    <div
                      key={task.id}
                      className={`border rounded-lg p-3 bg-surface ${
                        overdue ? 'border-red-400' : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="m-0 text-sm font-medium text-text">{t(task.title)}</p>
                        <StatusBadge status={task.priority} />
                      </div>
                      <p className="m-0 mt-1 text-xs text-text-muted leading-relaxed">{t(task.description)}</p>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
                        <span>
                          {t('Requester')}: {task.requester}
                        </span>
                        <span className={overdue ? 'text-red-600 font-semibold' : ''}>
                          {t('Due')}: {task.dueDate}
                          {overdue ? ` (${t('Overdue')})` : ''}
                        </span>
                      </div>

                      {col.id === 'completed' && task.decision && (
                        <div className="mt-2 text-xs">
                          <StatusBadge status={task.decision} />
                          <p className="m-0 mt-1 text-text-muted">{task.decisionComment}</p>
                        </div>
                      )}

                      {col.id !== 'completed' && (
                        <>
                          <textarea
                            className="input-base mt-2 min-h-14 h-auto py-2 text-xs"
                            placeholder={t('Decision comment (required)')}
                            value={commentDrafts[task.id] ?? ''}
                            onChange={e => setCommentDrafts(d => ({ ...d, [task.id]: e.target.value }))}
                          />
                          <div className="mt-2 flex flex-wrap gap-2">
                            {task.linkTo && (
                              <Link to={task.linkTo} className="btn btn-ghost h-8 px-2 text-xs no-underline">
                                <ExternalLink size={14} />
                                {t('Open')}
                              </Link>
                            )}
                            <button type="button" className="btn btn-primary h-8 px-2 text-xs" onClick={() => decide(task.id, 'Approve')}>
                              {t('Approve')}
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost h-8 px-2 text-xs text-red-600 border border-red-300"
                              onClick={() => decide(task.id, 'Reject')}
                            >
                              {t('Reject')}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              {tasks.filter(task => task.column === col.id).length === 0 && (
                <p className="text-xs text-text-muted px-1">{t('No tasks')}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInbox;
