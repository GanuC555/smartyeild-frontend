The dashboard is a borderless black canvas showing a live snapshot of the user's DeFi portfolio.
Each component has its own visual identity based on the data type it represents — no generic boxes.

- Three-column stat strip: Principal (thin white font), Yield Earned (solid pink, live pulse dot), Available to Spend (solid blue)
- TwoPoolVisual: 2px split bar (blue=liquid, pink=strategy) with whisper stats below — no heading, no box
- StrategyDonut: large solid-blue APY above, floating donut chart, side legend list — no container
- AgentStatusCards: rhythmic rows with glowing status dots (blue=active, pink=working, dim=idle)
- Recent Activity: borderless list with thin SVG arrows (blue=deposit, pink=spend)
- If no deposit yet, shows minimal onboarding CTA — no heavy headers
- Data refreshed every 30s via TanStack Query · palette: black / blue hsl(217,80%,56%) / pink hsl(325,90%,65%)
