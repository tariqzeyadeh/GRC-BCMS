import { Plus, Server, Trash2, Users, Truck } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dependencyLists } from '../../data/mockBia';

const iconMap = {
  systems: Server,
  personnel: Users,
  vendors: Truck,
};

function DependencyCard({ list }) {
  const { t } = useTranslation('bcms');
  const [items, setItems] = useState(list.items);
  const Icon = iconMap[list.icon];

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <Icon className="size-4" size={16} aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{t(list.title)}</span>
            <span className="text-xs text-muted-foreground">
              {items.length} {items.length === 1 ? t('item') : t('items')}
            </span>
          </div>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-2 p-3 m-0 list-none">
        {items.map(item => (
          <li
            key={item.id}
            className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2.5 transition-colors hover:bg-surface"
          >
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground">{t(item.name)}</span>
              <span className="truncate text-xs text-muted-foreground">{t(item.detail)}</span>
            </div>
            <button
              type="button"
              aria-label={`${t('Remove')} ${t(item.name)}`}
              onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
              className="btn btn-ghost h-8 w-8 p-0 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-danger"
            >
              <Trash2 size={14} />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
            {t('No items added yet.')}
          </li>
        )}
      </ul>

      <div className="border-t border-border p-3">
        <button type="button" className="btn btn-ghost w-full border border-border">
          <Plus size={14} />
          {t(list.addLabel)}
        </button>
      </div>
    </div>
  );
}

export default function DependenciesSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {dependencyLists.map(list => (
        <DependencyCard key={list.id} list={list} />
      ))}
    </div>
  );
}
