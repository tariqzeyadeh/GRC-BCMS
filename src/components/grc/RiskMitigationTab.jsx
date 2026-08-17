import { CalendarClock, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Progress } from '../ui/Progress';

function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('') || '?';
}

function progressFromStatus(status, progress) {
  if (typeof progress === 'number') return progress;
  if (status === 'Done') return 100;
  if (status === 'In Progress') return 55;
  return 15;
}

export default function RiskMitigationTab({
  mitigations = [],
  setMitigations,
  newTask,
  setNewTask,
  onAdd,
}) {
  const { t } = useTranslation('grc');

  const toggleDone = (id, checked) => {
    setMitigations(prev =>
      prev.map(m =>
        m.id === id
          ? {
              ...m,
              done: checked,
              status: checked ? 'Done' : m.status === 'Done' ? 'In Progress' : m.status,
              progress: checked ? 100 : progressFromStatus(m.status === 'Done' ? 'In Progress' : m.status, m.progress),
            }
          : m
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {mitigations.map(task => {
          const isDone = task.done === true || task.status === 'Done';
          const pct = isDone ? 100 : progressFromStatus(task.status, task.progress);
          return (
            <div
              key={task.id}
              className={cn(
                'flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors',
                isDone && 'bg-surface'
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={e => toggleDone(task.id, e.target.checked)}
                  className="mt-1 size-4 accent-[var(--color-brand)] cursor-pointer"
                  aria-label={t(task.title)}
                />
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <p
                    className={cn(
                      'text-sm font-medium text-foreground m-0',
                      isDone && 'text-muted-foreground line-through'
                    )}
                  >
                    {t(task.title)}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="flex size-5 items-center justify-center rounded-full bg-brand/15 font-mono text-[10px] font-semibold text-brand">
                        {task.assigneeInitials || initials(task.assignee)}
                      </span>
                      {task.assignee}
                    </span>
                    {task.dueDate && (
                      <span className="flex items-center gap-1">
                        <CalendarClock className="size-3.5" size={14} aria-hidden="true" />
                        {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
                {isDone && <CheckCircle2 className="size-5 shrink-0 text-success" size={20} aria-hidden="true" />}
                <button
                  type="button"
                  className="btn btn-ghost h-8 w-8 p-0 text-danger"
                  onClick={() => setMitigations(prev => prev.filter(x => x.id !== task.id))}
                  aria-label={t('Delete')}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 ps-7">
                <Progress value={pct} className={cn('flex-1', isDone && '[&>div]:bg-success')} />
                <span className="w-10 shrink-0 text-end font-mono text-xs text-muted-foreground">{pct}%</span>
              </div>
            </div>
          );
        })}
        {mitigations.length === 0 && <p className="text-sm text-muted-foreground m-0">{t('No mitigations yet')}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end border-t border-border pt-4">
        <input
          className="input-base md:col-span-2"
          placeholder={t('Task')}
          value={newTask.title}
          onChange={e => setNewTask(s => ({ ...s, title: e.target.value }))}
        />
        <input
          className="input-base"
          placeholder={t('Assignee')}
          value={newTask.assignee}
          onChange={e => setNewTask(s => ({ ...s, assignee: e.target.value }))}
        />
        <input
          type="date"
          className="input-base"
          value={newTask.dueDate}
          onChange={e => setNewTask(s => ({ ...s, dueDate: e.target.value }))}
        />
        <button type="button" className="btn btn-primary md:col-span-4" onClick={onAdd}>
          <Plus size={16} /> {t('Add task')}
        </button>
      </div>
    </div>
  );
}
