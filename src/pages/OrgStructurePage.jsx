import { useTranslation } from 'react-i18next';
import { useAppData } from '../context/AppDataContext';

const OrgStructurePage = () => {
  const { t } = useTranslation('grc');
  const { orgUnits } = useAppData();

  const roots = orgUnits.filter(u => !u.parentId);
  const childrenOf = id => orgUnits.filter(u => u.parentId === id);

  const renderNode = (unit, depth = 0) => (
    <li key={unit.id} className="list-none">
      <div
        className="flex items-center justify-between gap-3 border border-border rounded-lg bg-card px-3 py-2 mb-2"
        style={{ marginInlineStart: depth * 16 }}
      >
        <div>
          <p className="m-0 text-sm font-semibold text-text">{t(unit.name)}</p>
          <p className="m-0 text-xs text-text-muted">
            {t('Head')}: {t(unit.head)}
          </p>
        </div>
        <span className="font-mono text-[10px] text-text-muted">{unit.id}</span>
      </div>
      {childrenOf(unit.id).length > 0 && (
        <ul className="m-0 p-0">{childrenOf(unit.id).map(c => renderNode(c, depth + 1))}</ul>
      )}
    </li>
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('Organization Structure')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Governance hierarchy used for ownership, escalation, and accountability.')}
        </p>
      </div>
      <ul className="m-0 p-0">{roots.map(r => renderNode(r))}</ul>
    </div>
  );
};

export default OrgStructurePage;
