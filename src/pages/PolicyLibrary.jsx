import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Search, AlertTriangle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import {
  PolicyStatusBadge,
  PolicyEditorDrawer,
} from '../components/grc';
import { mockPolicies, getExpiringPolicies, POLICY_DEPARTMENTS } from '../data/mockPolicies';

const PolicyLibrary = () => {
  const { t } = useTranslation('grc');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuId, setMenuId] = useState(null);

  const expiring = useMemo(() => getExpiringPolicies(90), []);

  const stats = useMemo(() => {
    const count = s => mockPolicies.filter(p => p.status === s).length;
    const attPct = mockPolicies
      .filter(p => p.attestation?.required)
      .map(p => Math.round((p.attestation.completed / p.attestation.required) * 100));
    const avgAtt = attPct.length ? Math.round(attPct.reduce((a, b) => a + b, 0) / attPct.length) : 0;
    return {
      total: mockPolicies.length,
      published: count('Published'),
      inReview: count('In Review'),
      avgAttestation: avgAtt,
      expiringSoon: expiring.length,
    };
  }, [expiring]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockPolicies.filter(p => {
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchDept = departmentFilter === 'all' || p.department === departmentFilter;
      const matchSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q);
      return matchStatus && matchDept && matchSearch;
    });
  }, [search, statusFilter, departmentFilter]);

  const openPolicy = policy => {
    setSelectedPolicy(policy);
    setDrawerOpen(true);
    setMenuId(null);
  };

  const statCards = [
    { label: t('Total'), value: stats.total },
    { label: t('Published count'), value: stats.published },
    { label: t('In review count'), value: stats.inReview },
    { label: t('Avg attestation'), value: `${stats.avgAttestation}%` },
    { label: t('Expiring soon'), value: stats.expiringSoon },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-text m-0">{t('Policy Library')}</h1>
          <p className="text-text-muted text-sm mt-1 mb-0">
            {t('Author, review, and publish organizational policies across every department.')}
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/policies/new')}>
          <Plus size={18} />
          {t('Create New Policy')}
        </button>
      </div>

      {expiring.length > 0 && (
        <div className="card p-3 flex flex-wrap items-start gap-2">
          <AlertTriangle className="text-amber-600 shrink-0" size={18} />
          <div className="flex-1 min-w-0">
            <p className="m-0 text-sm font-semibold text-text">{t('Expiring soon')}</p>
            <p className="m-0 text-xs text-text-muted">
              {expiring
                .slice(0, 5)
                .map(p => `${p.id} (${p.expiryDate})`)
                .join(' · ')}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map(s => (
          <div key={s.label} className="card p-3">
            <p className="text-xs text-text-muted m-0">{s.label}</p>
            <p className="text-xl font-semibold text-text m-0">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="search"
            className="input-base ps-9"
            placeholder={t('Search by policy title or ID...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label={t('Search policies')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="input-base w-auto min-w-36"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            aria-label={t('Status')}
          >
            <option value="all">{t('All statuses')}</option>
            <option value="Draft">{t('Draft')}</option>
            <option value="In Review">{t('In Review')}</option>
            <option value="Published">{t('Published')}</option>
            <option value="Expired">{t('Expired')}</option>
          </select>
          <select
            className="input-base w-auto min-w-40"
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
            aria-label={t('Department')}
          >
            <option value="all">{t('All departments')}</option>
            {POLICY_DEPARTMENTS.map(d => (
              <option key={d} value={d}>
                {t(d)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-start">
                <th className="ps-4 py-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('ID')}
                </th>
                <th className="py-3 text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('Title')}
                </th>
                <th className="py-3 text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('Version')}
                </th>
                <th className="py-3 text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('Status')}
                </th>
                <th className="py-3 text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('Owner')}
                </th>
                <th className="py-3 text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('Next Review')}
                </th>
                <th className="pe-4 py-3 text-end text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  {t('Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(policy => (
                <tr
                  key={policy.id}
                  className="border-b border-border last:border-0 cursor-pointer hover:bg-surface/80"
                  onClick={() => openPolicy(policy)}
                >
                  <td className="ps-4 py-3 font-mono text-xs text-muted-foreground">{policy.id}</td>
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{t(policy.title)}</span>
                      <span className="text-xs text-muted-foreground">{t(policy.category)}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{policy.version}</td>
                  <td className="py-3">
                    <PolicyStatusBadge status={policy.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-brand/15 font-mono text-[10px] font-semibold text-brand">
                        {policy.ownerInitials}
                      </span>
                      <span className="text-sm text-foreground">{policy.owner}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">{policy.nextReview}</td>
                  <td className="pe-4 py-3 text-end relative" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      className="btn btn-ghost h-8 w-8 p-0 text-muted-foreground"
                      onClick={() => setMenuId(menuId === policy.id ? null : policy.id)}
                      aria-label={`${t('Actions')} ${policy.title}`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {menuId === policy.id && (
                      <div className="absolute end-4 top-10 z-20 min-w-36 rounded-lg border border-border bg-card shadow-md py-1">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-surface border-0 bg-transparent cursor-pointer"
                          onClick={() => openPolicy(policy)}
                        >
                          <Pencil size={14} /> {t('Edit')}
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-surface border-0 bg-transparent cursor-pointer"
                          onClick={() => setMenuId(null)}
                        >
                          <Trash2 size={14} /> {t('Delete')}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                    {t('No policies match your search or filters.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground m-0">
        {t('Showing')} {filtered.length} {t('of')} {mockPolicies.length} {t('policies')}
      </p>

      <PolicyEditorDrawer policy={selectedPolicy} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
};

export default PolicyLibrary;
