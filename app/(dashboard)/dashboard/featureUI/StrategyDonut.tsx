'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useStrategyBreakdown } from '../featureService/useStrategyBreakdown';

export default function StrategyDonut() {
  const { data, isLoading, blendedAPY } = useStrategyBreakdown();

  return (
    <div>
      {/* Blended APY floats above as ambient context — solid blue, no gradient */}
      {blendedAPY != null && (
        <div className="mb-6">
          <p className="art-label mb-1">Blended APY</p>
          <p
            className="text-4xl font-semibold"
            style={{ letterSpacing: '-0.03em', color: 'hsl(217, 80%, 56%)' }}
          >
            {blendedAPY}%
          </p>
        </div>
      )}

      {isLoading ? (
        <p className="text-[11px] text-foreground/30">Loading allocation…</p>
      ) : (
        <div className="flex items-center gap-8">
          {/* Donut — the shape is the identity */}
          <div className="h-48 w-48 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={52}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${Number(value ?? 0)}%`, 'Allocation']}
                  contentStyle={{
                    background: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  cursor={false}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend — rhythmic list, right column */}
          <div className="flex-1 space-y-4">
            {data.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: entry.color }}
                  />
                  <span className="text-sm text-foreground/60">{entry.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground/80 tabular-nums">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
