import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { mockPermissions, roleDescriptions } from '../data/mockPermissions';

/** Simple SoD: Admin+Auditor same person-level conflict is simulated as module pairs */
const SOD_RULES = [
  { a: 'Audits', b: 'Policies', message: 'Policy authors should not solely own Audit approvals (SoD).' },
  { a: 'Risks', b: 'Audits', message: 'Risk owners approving their own audits creates SoD conflict.' },
];

const UsersAndRoles = () => {
  const { t } = useTranslation('grc');
  const [grants, setGrants] = useState(() => JSON.parse(JSON.stringify(mockPermissions.grants)));
  const [permissionLevel, setPermissionLevel] = useState('Write');

  const enabledCount = useMemo(() => {
    let n = 0;
    Object.values(grants).forEach(roles => {
      Object.values(roles).forEach(v => {
        if (v) n += 1;
      });
    });
    return n;
  }, [grants]);

  const sodConflicts = useMemo(() => {
    const conflicts = [];
    SOD_RULES.forEach(rule => {
      mockPermissions.roles.forEach(role => {
        if (grants[rule.a]?.[role] && grants[rule.b]?.[role] && role !== 'Admin') {
          conflicts.push({ role, ...rule });
        }
      });
    });
    return conflicts;
  }, [grants]);

  const totalCells = mockPermissions.modules.length * mockPermissions.roles.length;

  const toggle = (module, role) => {
    setGrants(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [role]: !prev[module][role],
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-text m-0">{t('Users and Roles')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('RBAC matrix with least privilege and segregation-of-duties checks.')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-3">
          <p className="text-xs text-text-muted m-0">{t('Module')}</p>
          <p className="text-xl font-semibold text-text m-0">{mockPermissions.modules.length}</p>
        </div>
        <div className="card p-3">
          <p className="text-xs text-text-muted m-0">{t('Roles')}</p>
          <p className="text-xl font-semibold text-text m-0">{mockPermissions.roles.length}</p>
        </div>
        <div className="card p-3">
          <p className="text-xs text-text-muted m-0">{t('Permissions matrix')}</p>
          <p className="text-xl font-semibold text-text m-0">
            {enabledCount}/{totalCells}
          </p>
        </div>
        <div className="card p-3">
          <p className="text-xs text-text-muted m-0">{t('SoD conflicts')}</p>
          <p className={`text-xl font-semibold m-0 ${sodConflicts.length ? 'text-red-600' : 'text-text'}`}>
            {sodConflicts.length}
          </p>
        </div>
      </div>

      {sodConflicts.length > 0 && (
        <div className="card p-3 border-red-300">
          <p className="m-0 text-sm font-semibold text-red-600">{t('SoD conflicts')}</p>
          <ul className="m-0 mt-2 ps-5 text-xs text-text-muted space-y-1">
            {sodConflicts.map((c, i) => (
              <li key={`${c.role}-${i}`}>
                {t(c.role)}: {t(c.a)} + {t(c.b)} — {t(c.message)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card p-4">
        <h3 className="text-text font-semibold m-0 mb-3">{t('Role legend')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockPermissions.roles.map(role => (
            <div key={role} className="border border-border rounded-lg p-3 bg-surface">
              <p className="m-0 font-semibold text-text text-sm">{t(role)}</p>
              <p className="m-0 mt-1 text-xs text-text-muted">{t(roleDescriptions[role])}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-3 flex flex-wrap items-center gap-3">
        <label className="text-sm text-text-muted">{t('Permission level')}</label>
        <select className="input-base w-auto" value={permissionLevel} onChange={e => setPermissionLevel(e.target.value)}>
          <option value="Read">{t('Read')}</option>
          <option value="Write">{t('Write')}</option>
          <option value="Approve">{t('Approve')}</option>
        </select>
        <span className="text-xs text-text-muted">{t('Matrix toggles apply to selected permission level (simulated).')}</span>
      </div>

      <div className="card overflow-x-auto">
        <div className="px-4 pt-4">
          <h3 className="text-text font-semibold m-0 mb-1">{t('Permissions matrix')}</h3>
          <p className="text-xs text-text-muted m-0 mb-3">{t('Save note')}</p>
        </div>
        <table className="w-full border-collapse text-text">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-3 py-2 text-start text-xs font-semibold text-text-muted">{t('Module')}</th>
              {mockPermissions.roles.map(role => (
                <th key={role} className="px-3 py-2 text-center text-xs font-semibold text-text-muted">
                  {t(role)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockPermissions.modules.map(module => (
              <tr key={module} className="border-b border-border last:border-b-0">
                <td className="px-3 py-3 text-sm font-medium">{t(module)}</td>
                {mockPermissions.roles.map(role => (
                  <td key={role} className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-[var(--color-brand)]"
                      checked={Boolean(grants[module]?.[role])}
                      onChange={() => toggle(module, role)}
                      aria-label={`${module} ${role} ${permissionLevel}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAndRoles;
