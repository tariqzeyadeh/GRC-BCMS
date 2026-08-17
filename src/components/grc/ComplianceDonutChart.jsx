import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const CHART_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

/**
 * Donut: compliance by framework — ported from executive-grc-dashboard (sans ChartContainer).
 */
export default function ComplianceDonutChart({ data = [], title, subtitle }) {
  const { t } = useTranslation('grc');
  const rows = data.map(d => ({
    name: d.name,
    value: d.value ?? d.percent ?? 0,
  }));
  const average = rows.length ? Math.round(rows.reduce((s, i) => s + i.value, 0) / rows.length) : 0;

  return (
    <Card className="border-border gap-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title || t('Compliance by framework')}</CardTitle>
        <p className="text-sm text-muted-foreground m-0">
          {subtitle || t('Average adherence across active frameworks')}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="mx-auto aspect-square h-56 w-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={val => [`${val}%`, '']}
                contentStyle={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Pie
                data={rows}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={90}
                strokeWidth={3}
                stroke="var(--color-card)"
              >
                {rows.map((entry, index) => (
                  <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
                <Label
                  position="center"
                  content={({ viewBox }) => {
                    if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) - 6}
                          className="fill-foreground"
                          style={{ fontSize: 28, fontWeight: 600, fontFamily: 'ui-monospace, monospace' }}
                        >
                          {average}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 16}
                          className="fill-muted-foreground"
                          style={{ fontSize: 11 }}
                        >
                          {t('Avg. score')}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex w-full flex-col gap-2.5 sm:w-auto sm:min-w-40 m-0 p-0 list-none">
          {rows.map((item, index) => (
            <li key={item.name} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  aria-hidden="true"
                />
                {item.name}
              </span>
              <span className="font-mono font-medium text-muted-foreground tabular-nums">{item.value}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
