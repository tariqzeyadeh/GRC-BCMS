import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileText,
  ShieldAlert,
  Timer,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  SimpleDataGrid,
  RiskHeatmap5x5,
  StatusBadge,
  KpiCard,
  ComplianceDonutChart,
  DepartmentBarChart,
  RiskLevelBadge,
} from '../components/grc';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
  kpiSummary,
  recentActivity,
  openAuditsList,
  residualRiskTrend,
  issueAging,
  complianceByFramework,
  risksByDepartmentStacked,
  kpiSparklines,
} from '../data/mockDashboard';
import { mockRisks } from '../data/mockRisks';
import { mockPolicies, getExpiringPolicies } from '../data/mockPolicies';
import { RISK_APPETITE_THRESHOLD, RAG_CLASSES, getAppetiteRag } from '../constants/riskScore';

const ExecutiveDashboard = () => {
  const { t } = useTranslation('grc');
  const navigate = useNavigate();

  const outOfAppetite = mockRisks.filter(r => !r.withinAppetite);
  const expiring = getExpiringPolicies(90);
  const topRisks = [...mockRisks].sort((a, b) => b.residualScore - a.residualScore).slice(0, 5);
  const pendingPolicies = mockPolicies.filter(p => p.status === 'Draft' || p.status === 'In Review').length;

  const recentColumns = useMemo(
    () => [
      { key: 'id', header: t('ID') },
      { key: 'title', header: t('Title'), render: row => t(row.title) },
      { key: 'category', header: t('Category'), render: row => t(row.category) },
      { key: 'inherentScore', header: t('Inherent Score') },
      {
        key: 'residualScore',
        header: t('Residual Score'),
        render: row => <RiskLevelBadge score={row.residualScore} />,
      },
      {
        key: 'withinAppetite',
        header: t('Within Appetite'),
        render: row => <StatusBadge status={row.withinAppetite ? 'Within Appetite' : 'Out of Appetite'} />,
      },
      { key: 'status', header: t('Status'), render: row => <StatusBadge status={row.status} /> },
    ],
    [t]
  );

  const deptChartData = useMemo(
    () => risksByDepartmentStacked.map(d => ({ ...d, department: t(d.department) })),
    [t]
  );

  const frameworkChartData = useMemo(
    () => complianceByFramework.map(d => ({ ...d, name: t(d.name) })),
    [t]
  );

  const residualTrendData = useMemo(
    () => residualRiskTrend.map(d => ({ ...d, month: t(d.month) })),
    [t]
  );

  const kpis = [
    {
      key: 'risks',
      label: t('Total Risks'),
      value: mockRisks.length,
      delta: -2,
      deltaLabel: `${outOfAppetite.length} ${t('Out of Appetite')}`,
      trend: kpiSparklines.risks,
      icon: AlertTriangle,
      to: '/risks',
      invertDelta: true,
      rag: getAppetiteRag(outOfAppetite[0]?.residualScore ?? 8),
    },
    {
      key: 'compliance',
      label: t('Compliance %'),
      value: kpiSummary.compliancePercent,
      suffix: '%',
      delta: 2,
      deltaLabel: `${t('Trend')}: +2%`,
      trend: kpiSparklines.compliance,
      icon: CheckCircle2,
      to: '/compliance',
      rag: 'amber',
    },
    {
      key: 'controls',
      label: t('Control effectiveness'),
      value: kpiSummary.controlEffectiveness,
      suffix: '%',
      delta: 4,
      deltaLabel: t('Design & operating'),
      trend: kpiSparklines.controls,
      icon: ShieldAlert,
      to: '/compliance',
      rag: kpiSummary.controlEffectiveness >= 80 ? 'green' : 'amber',
    },
    {
      key: 'mttr',
      label: t('Issue MTTR'),
      value: kpiSummary.issueMttrDays,
      suffix: 'd',
      delta: -2,
      deltaLabel: t('Mean time to remediate'),
      trend: kpiSparklines.mttr,
      icon: Timer,
      to: '/inbox',
      invertDelta: true,
      rag: kpiSummary.issueMttrDays <= 14 ? 'green' : 'red',
    },
    {
      key: 'audits',
      label: t('Open Audits'),
      value: openAuditsList.length,
      delta: 1,
      deltaLabel: `${kpiSummary.thirdPartyHighRisk} ${t('Third-party high risk')}`,
      trend: kpiSparklines.audits,
      icon: ClipboardList,
      to: '/inbox',
      invertDelta: true,
      rag: 'amber',
    },
    {
      key: 'policies',
      label: t('Pending Policies'),
      value: pendingPolicies,
      delta: -2,
      deltaLabel: `${expiring.length} ${t('Expiring soon')}`,
      trend: kpiSparklines.policies,
      icon: FileText,
      to: '/policies',
      invertDelta: true,
      rag: expiring.length > 3 ? 'amber' : 'green',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-text m-0">{t('Executive Dashboard')}</h1>
        <p className="text-text-muted text-sm mt-1 mb-0">
          {t('Outcome-focused GRC posture with appetite, trends, and remediation velocity.')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {kpis.map(kpi => (
          <KpiCard
            key={kpi.key}
            label={kpi.label}
            value={kpi.value}
            suffix={kpi.suffix}
            delta={kpi.delta}
            deltaLabel={kpi.deltaLabel}
            trend={kpi.trend}
            icon={kpi.icon}
            invertDelta={kpi.invertDelta}
            to={kpi.to}
            ragLabel={t(kpi.rag === 'green' ? 'On track' : kpi.rag === 'amber' ? 'Watch' : 'Action')}
            ragClass={RAG_CLASSES[kpi.rag]}
          />
        ))}
      </div>

      <RiskHeatmap5x5
        risks={mockRisks}
        onCellClick={cell => navigate('/risks', { state: { heatmapFilter: cell } })}
      />

      <Card className="border-border gap-0">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>{t('Residual risk trend')}</CardTitle>
          <TrendingUp size={16} className="text-brand" />
        </CardHeader>
        <CardContent>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={residualTrendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="residualFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={28}
                  tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-brand)"
                  strokeWidth={2}
                  fill="url(#residualFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-text-muted mt-2 mb-0">
            {t('Appetite threshold')}: {RISK_APPETITE_THRESHOLD}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ComplianceDonutChart data={frameworkChartData} />
        <DepartmentBarChart data={deptChartData} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card p-4">
          <h3 className="mb-3 text-text font-semibold">{t('Top residual risks')}</h3>
          <ul className="m-0 p-0 list-none space-y-2">
            {topRisks.map(r => (
              <li key={r.id}>
                <Link
                  to={`/risks/${r.id}`}
                  className="flex items-center justify-between gap-2 no-underline text-text hover:text-brand"
                >
                  <span className="text-sm truncate">
                    {r.id} · {t(r.title)}
                  </span>
                  <RiskLevelBadge score={r.residualScore} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-4">
          <h3 className="mb-3 text-text font-semibold">{t('Issue aging')}</h3>
          <div className="space-y-2">
            {issueAging.map(row => (
              <div
                key={row.severity}
                className="flex items-center justify-between text-xs border-b border-border pb-2 last:border-0"
              >
                <span className="text-text font-medium">{t(row.severity)}</span>
                <span className="text-text-muted">
                  {row.open} {t('Open')} · {t('Age')} {row.avgAgeDays}d · {t('MTTR')} {row.mttrDays}d
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="mb-3 text-text font-semibold">{t('Quick links')}</h3>
          <div className="flex flex-col gap-2">
            <Link to="/compliance" className="inline-flex items-center gap-1 text-brand text-sm no-underline font-medium">
              {t('Compliance Assessment')} <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
            <Link to="/risks" className="inline-flex items-center gap-1 text-brand text-sm no-underline font-medium">
              {t('Risk Register')} <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
            <Link to="/policies" className="inline-flex items-center gap-1 text-brand text-sm no-underline font-medium">
              {t('Policy Library')} <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
            <Link to="/inbox" className="inline-flex items-center gap-1 text-brand text-sm no-underline font-medium">
              {t('My Inbox')} <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="m-0 text-text font-semibold">{t('Recent Risks')}</h3>
            <Link to="/risks" className="text-xs text-brand no-underline font-medium">
              {t('Risk Register')} →
            </Link>
          </div>
          <SimpleDataGrid
            columns={recentColumns}
            rows={[...mockRisks].sort((a, b) => b.residualScore - a.residualScore)}
            pageSize={6}
            onRowClick={row => navigate(`/risks/${row.id}`)}
          />
        </div>

        <div className="card p-4">
          <h3 className="mb-3 text-text font-semibold">{t('Recent Activity')}</h3>
          <ul className="m-0 p-0 list-none space-y-3">
            {recentActivity.map(item => (
              <li key={item.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                <Link to={item.linkTo} className="text-sm text-text no-underline hover:text-brand font-medium block">
                  {t(item.text)}
                </Link>
                <span className="text-[11px] text-text-muted">{t(item.time)}</span>
              </li>
            ))}
          </ul>
          {expiring.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs font-semibold text-text m-0 mb-2">{t('Expiring soon')}</p>
              {expiring.slice(0, 4).map(p => (
                <Link key={p.id} to={`/policies/${p.id}`} className="block text-xs text-brand no-underline mb-1">
                  {p.id} · {p.expiryDate}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-text font-semibold">{t('Open Audits List')}</h3>
        <SimpleDataGrid
          columns={[
            { key: 'id', header: t('ID') },
            { key: 'title', header: t('Title'), render: row => t(row.title) },
            { key: 'owner', header: t('Owner') },
            { key: 'dueDate', header: t('Due') },
            { key: 'ageDays', header: t('Age'), render: row => `${row.ageDays}d` },
            { key: 'status', header: t('Status'), render: row => <StatusBadge status={row.status} /> },
          ]}
          rows={openAuditsList}
          pageSize={5}
          onRowClick={() => navigate('/inbox')}
        />
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
