import { Link } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

/**
 * KPI card with Recharts sparkline — ported from executive-grc-dashboard.
 */
export default function KpiCard({
  label,
  value,
  suffix = '',
  delta = 0,
  deltaLabel = '',
  trend = [],
  icon: Icon,
  invertDelta = false,
  to,
  ragLabel,
  ragClass = '',
  onClick,
}) {
  const isPositive = invertDelta ? delta <= 0 : delta >= 0;
  // Use hex — CSS vars often fail as SVG stopColor and render black fills.
  const trendColor = isPositive ? '#16a34a' : '#dc2626';
  // Parentheses / punctuation in labels break url(#id) for gradients (e.g. "(Actual)", "(30d)").
  const gradId = `spark-${String(label).replace(/[^a-zA-Z0-9]/g, '')}`;

  const body = (
    <Card className="relative overflow-hidden border-border p-5 gap-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            {ragLabel && (
              <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-semibold', ragClass)}>{ragLabel}</span>
            )}
          </div>
          <span className="font-mono text-3xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
            {suffix}
          </span>
        </div>
        {Icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <Icon className="size-4.5" aria-hidden="true" size={18} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className={cn('flex items-center gap-1 text-xs font-medium', isPositive ? 'text-success' : 'text-danger')}>
          {isPositive ? <ArrowUpRight className="size-3.5" size={14} aria-hidden="true" /> : <ArrowDownRight className="size-3.5" size={14} aria-hidden="true" />}
          <span>{deltaLabel}</span>
        </div>
        {trend.length > 0 && (
          <div className="h-8 w-20" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={trendColor} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={trendColor}
                  strokeWidth={1.75}
                  fill={`url(#${gradId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="no-underline block hover:opacity-95 transition-opacity">
        {body}
      </Link>
    );
  }

  return body;
}
