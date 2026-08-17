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
import { biaCompletionByDepartment } from '../../data/mockBcms';

/** Same stacked-bar tokens/design as Executive Dashboard DepartmentBarChart. */
export default function BiaCompletionChart() {
  const { t } = useTranslation('bcms');

  const chartData = biaCompletionByDepartment.map(d => ({
    ...d,
    department: t(d.department),
  }));

  return (
    <Card className="border-border gap-0">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{t('BIA Completion Status by Department')}</CardTitle>
        <p className="text-sm text-muted-foreground m-0">{t('Business Impact Analyses segmented by review status')}</p>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap={20} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
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
              <Bar
                dataKey="completed"
                name={t('Completed')}
                stackId="bia"
                fill="var(--color-low)"
                radius={[0, 0, 4, 4]}
              />
              <Bar dataKey="inProgress" name={t('In Progress')} stackId="bia" fill="var(--color-medium)" />
              <Bar
                dataKey="overdue"
                name={t('Overdue')}
                stackId="bia"
                fill="var(--color-high)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
