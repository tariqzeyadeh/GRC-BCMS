import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * @typedef {Object} DataGridColumn
 * @property {string} key
 * @property {string} header
 * @property {(row: object) => import('react').ReactNode} [render]
 */

/**
 * @param {object} props
 * @param {DataGridColumn[]} props.columns
 * @param {object[]} props.rows
 * @param {number} [props.pageSize]
 * @param {(row: object) => void} [props.onRowClick]
 */
const SimpleDataGrid = ({ columns = [], rows = [], pageSize = 5, onRowClick }) => {
  const { t } = useTranslation('grc');
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);

  const pageRows = useMemo(() => {
    const start = safePage * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, safePage, pageSize]);

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-text">
          <thead>
            <tr className="border-b border-border bg-surface">
              {columns.map(col => (
                <th key={col.key} className="px-3 py-2 text-start text-xs font-semibold text-text-muted whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length || 1} className="px-3 py-8 text-center text-text-muted">
                  {t('No records found')}
                </td>
              </tr>
            ) : (
              pageRows.map((row, idx) => (
                <tr
                  key={row.id ?? idx}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-border last:border-b-0 ${
                    onRowClick ? 'cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-100/10' : ''
                  }`}
                >
                  {columns.map(col => (
                    <td key={col.key} className="px-3 py-2 text-sm text-text">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
        <span className="text-xs text-text-muted">
          {t('Page')} {safePage + 1} {t('of')} {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost h-8 px-2"
            disabled={safePage <= 0}
            onClick={() => setPage(p => Math.max(0, p - 1))}
            aria-label={t('Previous')}
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            className="btn btn-ghost h-8 px-2"
            disabled={safePage >= totalPages - 1}
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            aria-label={t('Next')}
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDataGrid;
