import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} TabItem
 * @property {string} id
 * @property {string} label English key for t()
 */

/**
 * @param {object} props
 * @param {TabItem[]} props.tabs
 * @param {string} props.activeId
 * @param {(id: string) => void} props.onChange
 * @param {string} [props.ns]
 */
const TabsBar = ({ tabs = [], activeId, onChange, ns = 'grc' }) => {
  const { t } = useTranslation(ns);

  return (
    <div className="flex flex-wrap gap-1 border-b border-border mb-4" role="tablist">
      {tabs.map(tab => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer ${
              active
                ? 'bg-brand text-white border border-b-0 border-brand'
                : 'text-text-muted hover:text-text hover:bg-surface'
            }`}
          >
            {t(tab.label)}
          </button>
        );
      })}
    </div>
  );
};

export default TabsBar;
