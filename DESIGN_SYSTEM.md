# OneYield&Spend Design System

## Colors

### Core
- `background`: `hsl(228, 30%, 4%)`
- `foreground`: `hsl(0, 0%, 95%)`
- `card`: `hsl(225, 20%, 7%)`
- `muted`: `hsl(220, 15%, 13%)`
- `primary`: `hsl(217, 80%, 56%)`
- `accent`: `hsl(220, 15%, 16%)`

### Strategy Colors
- Guardian: `#3b82f6`
- Balancer: `#8b5cf6`
- Hunter: `#f59e0b`

### Status Colors
- Success: `#22c55e`
- Warning: `#f59e0b`
- Error: `#ef4444`

## Typography
- H1: 36px / bold
- H2: 30px / semibold
- H3: 24px / semibold
- Body: 16px / regular
- Small: 14px / regular
- Caption: 12px / medium

## Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## Component Patterns
- Buttons: rounded-xl, strong contrast, subtle hover lift
- Cards: dark glass panel, border `white/10`, rounded-2xl
- Inputs: dark background, border `white/20`, focus accent ring
- Badges: small rounded chips with semantic coloring
- Modals: dark overlay + card shell, max width 480px mobile-first

## Breakpoints
- Mobile: < 768px (single-column layout)
- Tablet: 768px–1023px (2-column where useful)
- Desktop: >= 1024px (full dashboards)

## Rules
1. Dark mode is default.
2. Use strategy colors only for strategy-related UI.
3. Keep financial values high contrast and prominent.
4. Do not import wallet SDKs directly in UI components; use `useWallet()`.
