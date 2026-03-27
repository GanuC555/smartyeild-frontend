'use client';

import LandingNavbar from '@/app/landing/featureUI/LandingNavbar';
import AuroraBackground from '@/components/ui/aurora-background';
import Link from 'next/link';

type Section = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  problem: string;
  points: Array<{
    label: string;
    text: string;
  }>;
  accent: string;
};

const sections: Section[] = [
  {
    id: 'introduction',
    kicker: 'Introduction',
    title: 'The Problem OneYield Solves',
    intro:
      'OneYield is a OneChain-native protocol that lets users keep principal discipline while unlocking daily spending utility from yield-oriented flows.',
    problem:
      'Most DeFi products force a tradeoff: either lock funds for yield or withdraw everything to spend. That breaks continuity for real users who need both growth and liquidity in the same cycle.',
    points: [
      {
        label: 'Core Promise',
        text: 'Deposit once, track principal separately, and spend from approved spendable balances without repeatedly dismantling your entire position.',
      },
      {
        label: 'Product Direction',
        text: 'OneYield is built as a practical financial workflow, not a speculative dashboard. Every major state transition is intended to be observable and explainable to users.',
      },
      {
        label: 'Why It Matters',
        text: 'Users get a smoother everyday experience while preserving long-term capital behavior through explicit reserve and settlement rules.',
      },
    ],
    accent: 'cyan',
  },
  {
    id: 'architecture',
    kicker: 'Architecture',
    title: 'Layered System Design',
    intro:
      'OneYield is intentionally split into layers so economic truth, business orchestration, and user experience each stay cleanly separated.',
    problem:
      'Without layer boundaries, financial apps become fragile: UI guesses final state, backend over-assumes chain outcomes, and debugging critical money flows becomes risky.',
    points: [
      {
        label: 'Frontend Layer (Next.js)',
        text: 'Handles wallet UX, navigation, dashboard narratives, and spend actions while always reflecting lifecycle states like pending, confirmed, or failed.',
      },
      {
        label: 'Backend Layer (NestJS)',
        text: 'Orchestrates auth, queues, indexing, adapter calls, and reconciliation. It coordinates complexity but does not replace on-chain finality.',
      },
      {
        label: 'On-Chain Layer (Move)',
        text: 'Maintains reserve and settlement guarantees as the economic source of truth for deposits, credits, and spend-related transitions.',
      },
      {
        label: 'Realtime + Data Layer',
        text: 'MongoDB and event streams preserve history, explainability, and resilient retries for async operations across the protocol.',
      },
    ],
    accent: 'violet',
  },
  {
    id: 'protocols',
    kicker: 'Protocols',
    title: 'What Protocol Building Blocks Power OneYield',
    intro:
      'OneYield uses protocol-inspired building blocks for principal protection, yield routing, and spend settlement, adapted to OneChain-native design.',
    problem:
      'A protocol cannot claim reliability if integrations are ad-hoc. Structured adapters and bounded integrations are required to keep upgrades safe and operations auditable.',
    points: [
      {
        label: 'Vault + SpendBuffer Primitives',
        text: 'Vault-oriented reserve accounting protects principal pathways, while SpendBuffer-oriented logic handles spendable credits and settlement order.',
      },
      {
        label: 'Lane-Based Routing',
        text: 'Lane architecture introduces explicit capital paths so allocation logic is understandable, testable, and incrementally upgradeable.',
      },
      {
        label: 'Adapter Pattern',
        text: 'Integrations are accessed through interfaces, allowing safe migration from stubs to live protocol interactions without rewriting core business modules.',
      },
      {
        label: 'Transaction-Backed Accounting',
        text: 'Yield and spend claims should map to confirmed on-chain events or deterministic reconciliation logic, not purely simulated counters.',
      },
    ],
    accent: 'emerald',
  },
  {
    id: 'agent-system',
    kicker: 'Agents',
    title: 'How the Agent System Works',
    intro:
      'Agents in OneYield are orchestration assistants, not uncontrolled actors. They propose or execute bounded actions inside policy and contract constraints.',
    problem:
      'AI without guardrails is risky in finance. Strategy assistance must improve responsiveness while remaining subordinate to deterministic protocol rules.',
    points: [
      {
        label: 'Decision Scope',
        text: 'Agents evaluate lane conditions, available signals, and policy limits to produce allocation or operation suggestions.',
      },
      {
        label: 'Execution Boundaries',
        text: 'No agent path should bypass adapter checks, backend validation, or contract-level guarantees. Final economic state is always chain-anchored.',
      },
      {
        label: 'Auditability',
        text: 'Each meaningful agent-driven action must be observable through logs, events, transaction references, and resulting balance state changes.',
      },
      {
        label: 'User Trust Model',
        text: 'Users should see what changed, why it changed, and what impact it had — making automation transparent rather than opaque.',
      },
    ],
    accent: 'amber',
  },
  {
    id: 'user-journey',
    kicker: 'Experience',
    title: 'End-to-End User Flow',
    intro:
      'The user journey is intentionally linear: authenticate, deposit, configure, monitor, spend, and withdraw — with transparent status at every step.',
    problem:
      'Many DeFi apps hide complexity behind optimistic UI. OneYield instead surfaces operational truth so users understand lifecycle progression and source-of-funds behavior.',
    points: [
      {
        label: 'Connect + Sign',
        text: 'Wallet signature establishes identity and unlocks protected app routes tied to a verified session.',
      },
      {
        label: 'Deposit + Confirm',
        text: 'Deposit states move from submitted to confirmed, with backend reconciliation ensuring app state matches chain finality.',
      },
      {
        label: 'Monitor + Interpret',
        text: 'Dashboard and activity feeds present principal, yield, and spendability in a way that aligns with protocol constraints.',
      },
      {
        label: 'Spend + Settle',
        text: 'Spend actions follow source priority and settlement rules, producing traceable metadata for each transaction outcome.',
      },
      {
        label: 'Withdraw + Close',
        text: 'Exit flows resolve position state according to vault rules and preserve an auditable history of final transitions.',
      },
    ],
    accent: 'pink',
  },
  {
    id: 'onchain-wiring',
    kicker: 'Execution',
    title: 'Real On-Chain Wiring',
    intro:
      'OneYield is moving from simulation-style assumptions to transaction-backed operations for yield harvest, crediting, and settlement lifecycles.',
    problem:
      'If displayed balances are not traceable to chain events, trust erodes quickly. Economic credibility requires deterministic links between UI state and confirmed on-chain outcomes.',
    points: [
      {
        label: 'Critical Invariant',
        text: 'Principal reserve must remain protected; yield simulation should never consume user principal to fabricate performance.',
      },
      {
        label: 'Operational Readiness',
        text: 'Services need robust read/write paths: reserve queries, LP state checks, and safe transaction methods for harvest and credit routines.',
      },
      {
        label: 'Idempotent Cycles',
        text: 'Periodic jobs must tolerate retries and interruptions without double-crediting or irreversible inconsistencies.',
      },
      {
        label: 'Traceability',
        text: 'Every critical write should emit actionable logs and references so engineering teams and users can inspect outcomes confidently.',
      },
    ],
    accent: 'blue',
  },
  {
    id: 'safety',
    kicker: 'Reliability',
    title: 'Safety and Reliability Principles',
    intro:
      'Safety is enforced as a system-wide discipline: contract invariants, adapter boundaries, queue correctness, and user-facing truthfulness all work together.',
    problem:
      'Financial products fail when reliability is treated as a patch. OneYield treats reliability as architecture, not a post-release checklist.',
    points: [
      {
        label: 'Deterministic Spend Policy',
        text: 'Source order and fallback behavior are explicit so every settlement can be explained and audited.',
      },
      {
        label: 'Idempotent Infrastructure',
        text: 'Retry-safe jobs prevent duplicate credits and allow controlled recovery from partial workflow failures.',
      },
      {
        label: 'Chain-Reconciled Truth',
        text: 'Off-chain projections improve UX, but chain-confirmed state resolves final correctness for economic interpretation.',
      },
      {
        label: 'Operational Hardening',
        text: 'Typed transaction builders, guarded admin actions, and observability-first logging are baseline requirements for production maturity.',
      },
    ],
    accent: 'rose',
  },
];

export default function DocsPage() {
  const accentClasses: Record<string, string> = {
    cyan: 'from-cyan-400/25 to-transparent',
    violet: 'from-violet-400/25 to-transparent',
    emerald: 'from-emerald-400/25 to-transparent',
    amber: 'from-amber-400/25 to-transparent',
    pink: 'from-pink-400/25 to-transparent',
    blue: 'from-blue-400/25 to-transparent',
    rose: 'from-rose-400/25 to-transparent',
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-55">
        <AuroraBackground
          className="!h-full !w-full !items-start !justify-start"
          starCount={70}
          pulseDuration={10}
          gradientColors={[
            'var(--aurora-color1, rgba(99,102,241,0.2))',
            'var(--aurora-color2, rgba(139,92,246,0.2))',
          ]}
          ariaLabel="Docs aurora background"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/35" />

           <LandingNavbar/>


      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:px-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="rounded-2xl bg-white/[0.02] p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">On this page</p>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="space-y-8">
          <section className="rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-300/80">Documentation Hub</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">OneYield Protocol Documentation</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              Clean, structured documentation for the OneYield demo stack — from product problem and architecture to protocol model,
              agent operations, real on-chain wiring, and reliability principles.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60 md:text-base">
              Written in plain language so investors, users, and technical teams can all understand what the protocol does, how it works,
              and where value and risk are managed.
            </p>
          </section>

          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-b border-white/10 pb-10 pt-2"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${accentClasses[section.accent]} bg-cyan-300`} />
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                  {section.kicker} · Section {index + 1}
                </p>
              </div>

              <h2 className="text-2xl font-semibold leading-tight md:text-3xl">{section.title}</h2>

              <p className="mt-4 max-w-4xl text-[15px] leading-8 text-white/75">
                <strong className="font-semibold text-white">Overview: </strong>
                {section.intro}
              </p>

              <div className="mt-5 rounded-xl bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Problem Context</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{section.problem}</p>
              </div>

              <div className="mt-6 grid gap-3">
                {section.points.map((point) => (
                  <div key={point.label} className="rounded-lg bg-black/30 p-4">
                    <p className="text-sm leading-7 text-white/75">
                      <strong className="font-semibold text-white">{point.label}: </strong>
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
