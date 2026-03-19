# Dashboard Data-as-Art Redesign Implementation Plan

> **For Claude:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the dashboard presentational layer so every component has its own visual identity — data-appropriate layout, no generic card boxes, clean black canvas with electric blue + bright pink accent duality.

**Architecture:** Pure presentational-layer changes only. No hook logic, API calls, or data shape changes touched. Five components in `app/(dashboard)/dashboard/featureUI/` are rebuilt from scratch alongside one globals.css token addition. The `DashboardPage.tsx` layout becomes a borderless canvas where sections breathe independently.

**Tech Stack:** Next.js 14, Tailwind v4, Recharts (donut only), Inter + Instrument Serif fonts, Lucide icons (thin-stroke).

---

## Design Tokens (Reference for All Tasks)

```
Electric Blue:  hsl(217, 80%, 56%)   → primary, liquid pool, active agents
Bright Pink:    hsl(325, 90%, 65%)   → yield earned, strategy pool, warm accent
Blue→Pink grad: linear-gradient(135deg, hsl(217,80%,56%), hsl(325,90%,65%))
Background:     #000000 / bg-black
Foreground:     hsl(0,0%,95%)        → /90 primary text, /60 secondary, /35 label, /20 ghost
Divider:        rgba(255,255,255,0.08)  → thin section breaks (NO borders as containers)
```

**Anti-pattern check (run before every component):**
1. "Am I putting this in a box because I don't know where else to put it?" → No boxes.
2. "Does this layout respect the specific type of data it shows?" → Each component is bespoke.
3. "Is this bold because I'm lazy, or clear because I designed it well?" → Whitespace + scale, not bold headers.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/globals.css` | Modify | Add `art-stat-label`, `art-divider`, `art-row` utility classes + pink token |
| `app/(dashboard)/dashboard/featureUI/DashboardPage.tsx` | Modify | Borderless canvas layout, spacing rhythm `space-y-16` |
| `app/(dashboard)/dashboard/featureUI/YieldCounter.tsx` | Modify | Live temporal counter — blue→pink gradient digits, pulse dot |
| `app/(dashboard)/dashboard/featureUI/TwoPoolVisual.tsx` | Modify | 2px thin gradient bar, no heading, breathable stat row |
| `app/(dashboard)/dashboard/featureUI/StrategyDonut.tsx` | Modify | Floating donut, side-by-side legend, no container box |
| `app/(dashboard)/dashboard/featureUI/AgentStatusCards.tsx` | Modify | Rhythmic list rows, status dot, no nested boxes |

---

## Task 1: Add Design Tokens to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add pink token and art utility classes**

Add after the existing `:root {}` block and at the end of `@layer components {}`:

```css
/* In :root block, add: */
--pink: hsl(325, 90%, 65%);
--glow-pink: 325, 90%, 65%;
```

```css
/* In @layer components, append: */
.art-label {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 500;
}

.art-divider-v {
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
  align-self: stretch;
}

.art-divider-h {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  width: 100%;
}

.art-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 0;
}

.art-row + .art-row {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.text-gradient-bp {
  background: linear-gradient(135deg, hsl(217, 80%, 56%), hsl(325, 90%, 65%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pulse-dot-pink {
  position: relative;
}

.pulse-dot-pink::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: hsl(325, 90%, 65%);
  animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

- [ ] **Step 2: Verify no syntax errors**

```bash
cd /Users/kaushalchaudhari/Desktop/web3/projects/SmartYeild/frontend && pnpm build 2>&1 | head -30
```
Expected: builds without CSS parse errors (or starts without errors in dev).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "design: add art utility classes and pink token for data-as-art dashboard"
```

---

## Task 2: Redesign YieldCounter — Live Temporal Component

**Data nature:** Temporal, live, accruing. Should feel alive and dynamic.
**Treatment:** Gradient digits (blue→pink), monospaced feel, pulsing pink dot, no container.

**Files:**
- Modify: `app/(dashboard)/dashboard/featureUI/YieldCounter.tsx`

- [ ] **Step 1: Replace YieldCounter with bespoke temporal design**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function YieldCounter({
  initialYield,
  perSecondRate,
}: {
  initialYield: number;
  perSecondRate: number;
}) {
  const [current, setCurrent] = useState(initialYield);
  const startRef = useRef(Date.now());
  const initRef = useRef(initialYield);

  useEffect(() => {
    initRef.current = initialYield;
    startRef.current = Date.now();
    setCurrent(initialYield);
    if (perSecondRate <= 0) return;
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      setCurrent(initRef.current + elapsed * perSecondRate);
    }, 100);
    return () => clearInterval(id);
  }, [initialYield, perSecondRate]);

  const formatYield = (n: number) => {
    if (n >= 1) return n.toFixed(4);
    if (n >= 0.0001) return n.toFixed(6);
    return n.toFixed(8);
  };

  const formatRate = (n: number) => {
    if (n >= 0.01) return n.toFixed(6);
    return n.toFixed(10);
  };

  return (
    <div>
      <p
        className="text-gradient-bp text-3xl font-semibold tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        ${formatYield(current)}
      </p>
      {perSecondRate > 0 ? (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="relative inline-block h-1.5 w-1.5 rounded-full pulse-dot-pink"
            style={{ background: 'hsl(325, 90%, 65%)' }}
          />
          <p className="text-[11px] text-foreground/40 tabular-nums">
            +${formatRate(perSecondRate)}/sec
          </p>
        </div>
      ) : (
        <p className="mt-1 text-[11px] text-foreground/30">Accruing…</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser — counter ticks, gradient renders, pulse dot animates**

```bash
cd /Users/kaushalchaudhari/Desktop/web3/projects/SmartYeild/frontend && pnpm dev
```

- [ ] **Step 3: Commit**

```bash
git add app/(dashboard)/dashboard/featureUI/YieldCounter.tsx
git commit -m "design(dashboard): YieldCounter — gradient digits, pulse dot, temporal identity"
```

---

## Task 3: Redesign DashboardPage — Canvas Layout

**Treatment:** No `premium-surface` boxes for top stats. Three-column stat strip with 1px vertical dividers. Generous `space-y-16` between sections. Section identity through scale and whitespace, not labels.

**Files:**
- Modify: `app/(dashboard)/dashboard/featureUI/DashboardPage.tsx`

- [ ] **Step 1: Rewrite DashboardPage layout**

```tsx
'use client';

import Link from 'next/link';
import AgentStatusCards from './AgentStatusCards';
import StrategyDonut from './StrategyDonut';
import TwoPoolVisual from './TwoPoolVisual';
import YieldCounter from './YieldCounter';
import { useDashboardOverview } from '../featureService/useDashboardOverview';

export default function DashboardPage() {
  const { agents, hasDeposit, history, isLoading, portfolio, principal } =
    useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="art-label tracking-widest">Loading portfolio…</p>
      </div>
    );
  }

  if (!hasDeposit) {
    return (
      <div className="py-32 text-center">
        <p className="art-label mb-6 tracking-widest">OneYield&Spend</p>
        <h2
          className="mb-5 text-4xl font-light text-foreground/90"
          style={{ letterSpacing: '-0.02em' }}
        >
          Your yield is waiting.
        </h2>
        <p className="mx-auto mb-10 max-w-sm text-sm text-foreground/40 leading-relaxed">
          Deposit USDC. AI agents earn 5–35% APY. Spend your yield anywhere,
          instantly.
        </p>
        <Link href="/vault" className="premium-btn-primary inline-block px-8 py-3 text-sm">
          Make Your First Deposit →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">

      {/* ── Stat Strip: three numbers, no boxes ── */}
      <div className="flex items-stretch gap-0">
        {/* Principal */}
        <div className="flex-1 pr-8">
          <p className="art-label mb-3">Principal</p>
          <p
            className="text-4xl font-light text-foreground/90 tabular-nums"
            style={{ letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}
          >
            ${principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-2 text-[11px] text-foreground/30">100% intact</p>
        </div>

        <div className="art-divider-v" />

        {/* Yield Earned */}
        <div className="flex-1 px-8">
          <p className="art-label mb-3">Yield Earned</p>
          <YieldCounter
            initialYield={Number(portfolio?.totalYield || 0)}
            perSecondRate={Number(portfolio?.perSecondEarnRate || 0)}
          />
        </div>

        <div className="art-divider-v" />

        {/* Available to Spend */}
        <div className="flex-1 pl-8">
          <p className="art-label mb-3">Available to Spend</p>
          <p
            className="text-3xl font-semibold tabular-nums"
            style={{
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              color: 'hsl(217, 68%, 73%)',
            }}
          >
            ${Number(portfolio?.availableToSpend || 0).toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="mt-2 text-[11px] text-foreground/30">70% LTV + yield</p>
        </div>
      </div>

      {/* ── Two-Pool Architecture ── */}
      <TwoPoolVisual
        liquidBalance={Number(portfolio?.liquidBalance || 0)}
        strategyPool={Number(portfolio?.strategyPool || 0)}
        dailyEarnRate={Number(portfolio?.dailyEarnRate || 0)}
      />

      {/* ── Strategy + Agents ── */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <StrategyDonut />
        <AgentStatusCards agents={agents} />
      </div>

      {/* ── Recent Activity ── */}
      <div>
        <p className="art-label mb-6">Recent Activity</p>
        {history.length === 0 ? (
          <p className="text-sm text-foreground/30">No activity yet.</p>
        ) : (
          <div>
            {history.slice(0, 5).map((tx) => (
              <div
                key={tx._id || tx.id || `${tx.type}-${tx.createdAt}`}
                className="art-row"
              >
                <div className="flex items-center gap-4">
                  {/* Thin directional icon */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      color:
                        tx.type === 'deposit'
                          ? 'hsl(217, 80%, 56%)'
                          : 'hsl(325, 90%, 65%)',
                    }}
                  >
                    {tx.type === 'deposit' ? (
                      /* Arrow down */
                      <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      /* Arrow right */
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                  <div>
                    <p className="text-sm capitalize text-foreground/80">
                      {tx.type.replace('_', ' ')}
                    </p>
                    <p className="text-[11px] text-foreground/30">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className="text-sm font-medium tabular-nums"
                  style={{
                    color:
                      tx.type === 'deposit'
                        ? 'hsl(217, 68%, 73%)'
                        : 'hsl(325, 75%, 70%)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {tx.type === 'deposit' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
```

- [ ] **Step 2: Verify layout renders — three columns visible, no box borders**

- [ ] **Step 3: Commit**

```bash
git add app/(dashboard)/dashboard/featureUI/DashboardPage.tsx
git commit -m "design(dashboard): canvas layout — borderless stat strip, spacious rhythm"
```

---

## Task 4: Redesign TwoPoolVisual — Ratio Component

**Data nature:** Balance/proportion. Two halves of a whole.
**Treatment:** 2px gradient line (blue→pink), no heading, three whisper stats below. The bar *is* the identity.

**Files:**
- Modify: `app/(dashboard)/dashboard/featureUI/TwoPoolVisual.tsx`

- [ ] **Step 1: Rewrite TwoPoolVisual**

```tsx
export default function TwoPoolVisual({
  liquidBalance,
  strategyPool,
  dailyEarnRate,
}: {
  liquidBalance: number;
  strategyPool: number;
  dailyEarnRate: number;
}) {
  const total = liquidBalance + strategyPool;
  const liquidRatio = total > 0 ? (liquidBalance / total) * 100 : 50;
  const strategyRatio = 100 - liquidRatio;

  const formatRate = (n: number) => {
    if (n >= 1) return n.toFixed(2);
    if (n >= 0.01) return n.toFixed(4);
    return n.toFixed(6);
  };

  return (
    <div>
      {/* 2px thin gradient split bar — the component identity */}
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${liquidRatio}%`,
            background: 'hsl(217, 80%, 56%)',
          }}
        />
        <div
          className="absolute top-0 h-full"
          style={{
            left: `${liquidRatio}%`,
            right: 0,
            background: 'hsl(325, 90%, 65%)',
          }}
        />
      </div>

      {/* Three stats below — no boxes, just spacing */}
      <div className="mt-6 flex items-start gap-0">
        <div className="flex-1">
          <p className="art-label mb-2">Liquid Pool</p>
          <p
            className="text-xl font-light tabular-nums"
            style={{ color: 'hsl(217, 68%, 73%)', fontVariantNumeric: 'tabular-nums' }}
          >
            ${liquidBalance.toFixed(2)}
          </p>
          <p className="mt-1 text-[10px] text-foreground/25">{liquidRatio.toFixed(0)}% · instant access</p>
        </div>

        <div className="art-divider-v mx-8" />

        <div className="flex-1">
          <p className="art-label mb-2">Strategy Pool</p>
          <p
            className="text-xl font-light tabular-nums"
            style={{ color: 'hsl(325, 75%, 70%)', fontVariantNumeric: 'tabular-nums' }}
          >
            ${strategyPool.toFixed(2)}
          </p>
          <p className="mt-1 text-[10px] text-foreground/25">{strategyRatio.toFixed(0)}% · AI deployed</p>
        </div>

        <div className="art-divider-v mx-8" />

        <div className="flex-1">
          <p className="art-label mb-2">Daily Yield</p>
          <p
            className="text-gradient-bp text-xl font-semibold tabular-nums"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            +${formatRate(dailyEarnRate)}
          </p>
          <p className="mt-1 text-[10px] text-foreground/25">principal protected</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — thin bar visible with blue left / pink right split**

- [ ] **Step 3: Commit**

```bash
git add app/(dashboard)/dashboard/featureUI/TwoPoolVisual.tsx
git commit -m "design(dashboard): TwoPoolVisual — 2px gradient bar, architectural identity"
```

---

## Task 5: Redesign StrategyDonut — Proportional Component

**Data nature:** Proportional allocation across strategies.
**Treatment:** Chart floats with no wrapping box. Legend moves to right column. Blended APY as a large ambient number, not a badge.

**Files:**
- Modify: `app/(dashboard)/dashboard/featureUI/StrategyDonut.tsx`

- [ ] **Step 1: Rewrite StrategyDonut**

```tsx
'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useStrategyBreakdown } from '../featureService/useStrategyBreakdown';

export default function StrategyDonut() {
  const { data, isLoading, blendedAPY } = useStrategyBreakdown();

  return (
    <div>
      {/* Identity: the APY number floats above as ambient context */}
      {blendedAPY != null && (
        <div className="mb-6">
          <p className="art-label mb-1">Blended APY</p>
          <p
            className="text-gradient-bp text-4xl font-semibold"
            style={{ letterSpacing: '-0.03em' }}
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
                    className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: entry.color }}
                  />
                  <span className="text-sm text-foreground/65">{entry.name}</span>
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
```

- [ ] **Step 2: Verify — donut floats without box, legend aligns right, APY prominent**

- [ ] **Step 3: Commit**

```bash
git add app/(dashboard)/dashboard/featureUI/StrategyDonut.tsx
git commit -m "design(dashboard): StrategyDonut — floating chart, ambient APY, side legend"
```

---

## Task 6: Redesign AgentStatusCards — Rhythmic List Component

**Data nature:** Three discrete entities with status, APY, timing.
**Treatment:** Horizontal rows with status dots (not emojis, not boxes). Alignment creates the visual lines. Blue dot = active, pink dot = working, gray = idle.

**Files:**
- Modify: `app/(dashboard)/dashboard/featureUI/AgentStatusCards.tsx`

- [ ] **Step 1: Rewrite AgentStatusCards**

```tsx
const STRATEGY_META: Record<string, { label: string; description: string }> = {
  guardian: { label: 'Guardian', description: 'Risk management & capital protection' },
  balancer: { label: 'Balancer', description: 'Pool rebalancing & liquidity optimization' },
  hunter:   { label: 'Hunter',   description: 'Yield opportunity scanning' },
};

function statusDotColor(status?: string): string {
  if (!status || status === 'idle') return 'rgba(255,255,255,0.2)';
  if (status === 'running' || status === 'active') return 'hsl(217, 80%, 56%)';
  return 'hsl(325, 90%, 65%)';
}

export default function AgentStatusCards({
  agents,
}: {
  agents: Array<{ strategy: string; status?: string; apy?: number; nextRunInMinutes?: number }>;
}) {
  const strategies = ['guardian', 'balancer', 'hunter'];

  return (
    <div>
      <p className="art-label mb-6">AI Agents</p>

      <div>
        {strategies.map((strategy) => {
          const item = agents.find((a) => a.strategy === strategy);
          const meta = STRATEGY_META[strategy];
          const dot = statusDotColor(item?.status);

          return (
            <div key={strategy} className="art-row">
              {/* Left: status dot + name stack */}
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: dot, boxShadow: dot !== 'rgba(255,255,255,0.2)' ? `0 0 6px ${dot}` : 'none' }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground/85">{meta.label}</p>
                  <p className="text-[11px] text-foreground/35">{meta.description}</p>
                </div>
              </div>

              {/* Right: APY + next run */}
              <div className="text-right">
                <p
                  className="text-sm font-semibold tabular-nums"
                  style={{
                    color: item?.apy ? 'hsl(217, 68%, 73%)' : 'rgba(255,255,255,0.3)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item?.apy ?? 0}% APY
                </p>
                <p className="text-[11px] text-foreground/30 tabular-nums">
                  {item?.nextRunInMinutes ? `${item.nextRunInMinutes}m` : 'standby'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — three rows visible, status dots glow, no nested card boxes**

- [ ] **Step 3: Commit**

```bash
git add app/(dashboard)/dashboard/featureUI/AgentStatusCards.tsx
git commit -m "design(dashboard): AgentStatusCards — rhythmic list, status dots, identity rows"
```

---

## Task 7: Final Visual Review

- [ ] **Step 1: Open dashboard in browser with a funded portfolio (or use mock data)**

Check these criteria:
1. Zero `premium-surface` boxes on the dashboard — content breathes with whitespace
2. Three stat columns separated by hairline dividers only
3. TwoPool bar is 2px, split blue/pink
4. Donut chart floats without a container; APY number is large and gradient
5. Agent rows are clean horizontal items with glowing status dots
6. Recent activity is a borderless list with direction arrows
7. Electric blue and bright pink appear intentionally — blue for liquid/live, pink for yield/strategy

- [ ] **Step 2: Update context.md**

```bash
cat > app/(dashboard)/dashboard/context.md << 'EOF'
The dashboard is a clean, borderless canvas showing a user's live DeFi portfolio.
Components are designed per data type — no generic card boxes.

- Three-column stat strip: Principal (thin font), Yield (blue→pink gradient, live), Spend (blue tint)
- TwoPoolVisual: 2px gradient bar (blue=liquid, pink=strategy) with whisper stats below
- StrategyDonut: floating donut with ambient blended APY above, side legend list
- AgentStatusCards: rhythmic horizontal rows with glowing status dots (blue=active, pink=working)
- Recent Activity: borderless list with thin SVG arrows (blue=deposit, pink=spend)
- Palette: black canvas, electric blue hsl(217,80%,56%), bright pink hsl(325,90%,65%)
EOF
```

- [ ] **Step 3: Final commit**

```bash
git add app/(dashboard)/dashboard/context.md
git commit -m "docs(dashboard): update context.md for data-as-art redesign"
```

---

## Summary

All changes are **presentational only** — zero hook, API, or data shape changes. The dashboard transforms from a grid of bordered boxes into a gallery canvas where each component announces its own identity through data-appropriate form:

- **Numbers** → scale and typeface (Principal: thin, Yield: gradient, Spend: blue)
- **Ratios** → the 2px bar itself (TwoPool)
- **Proportions** → the circle shape (Donut)
- **Entities with status** → rhythmic rows with glow dots (Agents)
- **Chronology** → direction arrows in a clean list (Activity)
