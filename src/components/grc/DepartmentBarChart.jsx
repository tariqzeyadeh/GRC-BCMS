import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

/**
 * Stacked bar: risks by department × severity — from executive-grc-dashboard.
 */
export default function DepartmentBarChart({ data = [], title, subtitle }) {
  const { t } = useTranslation('grc');

  return (
    <Card className="border-border gap-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title || t('Top Risks by Department')}</CardTitle>
        <p className="text-sm text-muted-foreground m-0">{subtitle || t('Risk count segmented by severity')}</p>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap={20} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="department"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                interval={0}
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                width={28}
              />
              <Tooltip
                cursor={{ fill: 'var(--color-surface)' }}
                contentStyle={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend />
              <Bar dataKey="low" name={t('Low')} stackId="risk" fill="var(--color-low)" radius={[0, 0, 4, 4]} />
              <Bar dataKey="medium" name={t('Medium')} stackId="risk" fill="var(--color-medium)" />
              <Bar dataKey="high" name={t('High')} stackId="risk" fill="var(--color-high)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
