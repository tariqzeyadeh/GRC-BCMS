import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { exerciseSuccessRate } from '../../data/mockBcms';

/** Matches Executive Dashboard residual-risk area chart (brand + gradient). */
export default function ExerciseSuccessChart() {
  const { t } = useTranslation('bcms');
  const latest = exerciseSuccessRate[exerciseSuccessRate.length - 1]?.rate ?? 0;
  const chartData = exerciseSuccessRate.map(d => ({ ...d, period: t(d.period) }));

  return (
    <Card className="border-border gap-0">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="text-base font-semibold">{t('Exercise Success Rate Over Time')}</CardTitle>
          <p className="text-sm text-muted-foreground m-0 mt-1">
            {t('Continuity drill pass rate')} · {t('latest')}{' '}
            <span className="font-mono font-medium text-brand tabular-nums">{latest}%</span>
          </p>
        </div>
        <TrendingUp size={16} className="text-brand shrink-0 mt-1" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="exerciseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                interval={0}
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                domain={[40, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                width={40}
                tickFormatter={v => `${v}%`}
              />
              <Tooltip
                formatter={val => [`${val}%`, t('Success rate')]}
                contentStyle={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--color-brand)"
                strokeWidth={2}
                fill="url(#exerciseFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
