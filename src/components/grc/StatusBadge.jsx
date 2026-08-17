import { useTranslation } from 'react-i18next';

const STATUS_STYLES = {
  Draft: 'bg-gray-200 text-gray-700',
  'In Review': 'bg-amber-50 text-amber-800 border border-amber-400',
  Published: 'bg-green-100 text-green-700',
  Expired: 'bg-red-100 text-red-600',
  Open: 'bg-sky-100 text-sky-700',
  Mitigating: 'bg-amber-50 text-amber-800 border border-amber-400',
  Closed: 'bg-green-100 text-green-700',
  Accepted: 'bg-gray-200 text-gray-700',
  'In Progress': 'bg-sky-100 text-sky-700',
  Done: 'bg-green-100 text-green-700',
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-amber-50 text-amber-800',
  Low: 'bg-green-100 text-green-700',
  todo: 'bg-sky-100 text-sky-700',
  pending: 'bg-amber-50 text-amber-800',
  completed: 'bg-green-100 text-green-700',
  'Within Appetite': 'bg-green-100 text-green-700',
  'Out of Appetite': 'bg-red-100 text-red-600',
  Effective: 'bg-green-100 text-green-700',
  'Partially Effective': 'bg-amber-50 text-amber-800 border border-amber-400',
  Ineffective: 'bg-red-100 text-red-600',
  Approve: 'bg-green-100 text-green-700',
  Reject: 'bg-red-100 text-red-600',
};

/**
 * @param {{ status: string, className?: string }} props
 */
const StatusBadge = ({ status, className = '' }) => {
  const { t } = useTranslation('grc');
  const style = STATUS_STYLES[status] ?? 'bg-surface text-text border border-border';

  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${style} ${className}`}>
      {t(status)}
    </span>
  );
};

export default StatusBadge;
