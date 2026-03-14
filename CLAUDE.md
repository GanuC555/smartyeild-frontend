# Claude Project Instructions

## Architecture (Mandatory)

Features are **colocated with their routes**. Each route folder inside `app/(dashboard)/` IS the feature module — no separate features directory.

```
app/
├── layout.tsx              ← root layout (providers only)
├── page.tsx                ← landing route (thin: renders LandingPage)
├── landing/                ← landing feature module (featureUI, featureService, types, constants)
└── (dashboard)/            ← ONLY route group — provides AppShellLayout to all authenticated routes
    ├── layout.tsx          ← renders AppShellLayout from @/components/layout
    ├── dashboard/          ← /dashboard route + feature code
    ├── card/               ← /card route + feature code
    ├── vault/              ← /vault route + feature code
    │   └── strategy/       ← /vault/strategy sub-route + feature code
    ├── strategies/         ← /strategies route + feature code
    ├── history/            ← /history route + feature code
    └── settings/           ← /settings route + feature code
```

---

## Required Feature Structure

Every route folder must follow this layout:

```
app/(dashboard)/dashboard/
├── page.tsx            ← THIN: only renders the entry featureUI component, nothing else
├── featureUI/          ← presentational components only, no API calls
├── featureService/     ← hooks, API orchestration, business logic
├── types/              ← dashboard.types.ts
├── constants/          ← optional
├── actions/            ← server actions, only when needed
└── context.md          ← REQUIRED (see rules below)
```

---

## context.md Rules (Strictly Enforced)

- Every feature **must** have exactly one `context.md`
- **Max 150 words** — no exceptions
- Written in plain, humanized language — explain what the feature IS and DOES as if briefing a teammate
- Format: one short paragraph describing the feature, followed by bullet points of key responsibilities
- Update after every meaningful change to the feature

**Good example:**
```
The dashboard gives users a live overview of their DeFi portfolio.
It shows current yield earnings, active strategy allocations, and
AI agent status at a glance.

- Displays real-time yield counter (YieldCounter)
- Shows strategy breakdown as a donut chart
- Shows TwoPool visual for active pool positions
- Renders AgentStatusCards for each running AI agent
- Data fetched via useDashboardOverview and useStrategyBreakdown hooks
```

---

## Shared Components (components/)

```
components/
├── ui/         ← Shadcn/Radix primitives only (button, card, badge, etc.) — never feature-specific
├── layout/     ← AppShellLayout, AppHeader, useAppSession — shared across all dashboard routes
└── error/      ← ErrorBoundary, RouteErrorFallback
```

Rules:
- Do **not** put feature-specific components in `components/` — they belong colocated with the route
- Do **not** duplicate feature UI here

---

## Lib Structure (lib/)

```
lib/
├── api/
│   └── client.ts       ← ApiClient class + all domain API objects (authApi, vaultApi, etc.)
├── wallet/
│   ├── wallet-adapter.ts
│   └── wallet-context.tsx
├── providers.tsx        ← composes all React providers (Query, Wallet, Toaster)
├── store.ts             ← Zustand global store (auth, portfolio, decisions)
└── utils.ts             ← cn() and general utilities
```

---

## Naming Rules

| Thing | Convention |
|---|---|
| Components | `PascalCase.tsx` |
| Hooks | `useSomething.ts` |
| Types file | `feature-name.types.ts` |
| Zustand store | `feature-name.store.ts` |
| Route/feature folders | `kebab-case` |
| Identifiers | Use the feature's route name explicitly — `useDashboardOverview`, not `useOverview` |

---

## Guardrails

- `page.tsx` does ONE thing: renders the entry featureUI component. No logic, no hooks, no imports from lib.
- `featureUI/` components never call APIs directly — all data comes through `featureService/` hooks.
- Prefer server components where practical.
- Use Zustand only for shared state that multiple features need.
- Avoid prop drilling deeper than 2 levels — use context or a store.
- Internal feature imports use relative paths. `@/` alias for lib and components.
