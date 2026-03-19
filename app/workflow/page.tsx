import Link from 'next/link';
import { ArrowRight, Coins, Sparkles, TrendingUp, Wallet } from 'lucide-react';

function WorkflowSvg() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-3 md:p-6">
      <svg viewBox="0 0 1200 760" className="h-auto w-full" role="img" aria-label="OneYield platform workflow diagram">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B1024" />
            <stop offset="100%" stopColor="#1A103A" />
          </linearGradient>
          <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8AB4FF" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <marker id="arrow" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto">
            <path d="M0,0 L0,11 L10,5.5 z" fill="#A78BFA" />
          </marker>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="1200" height="760" rx="28" fill="url(#bgGrad)" />

        <text x="600" y="56" textAnchor="middle" fill="#F9FAFB" fontSize="28" fontWeight="600">
          OneYield Workflow — User Value to OneChain Growth
        </text>
        <text x="600" y="84" textAnchor="middle" fill="#9CA3AF" fontSize="15">
          Human-first story flow (not technical architecture)
        </text>

        <rect x="70" y="140" width="280" height="140" rx="18" fill="url(#cardGrad)" stroke="#93C5FD" strokeOpacity="0.55" />
        <text x="95" y="178" fill="#E5E7EB" fontSize="14" fontWeight="600">1. Deposit Once</text>
        <text x="95" y="206" fill="#CBD5E1" fontSize="13">User deposits into OneYield and</text>
        <text x="95" y="228" fill="#CBD5E1" fontSize="13">keeps principal position intact.</text>

        <rect x="430" y="140" width="320" height="140" rx="18" fill="url(#cardGrad)" stroke="#C4B5FD" strokeOpacity="0.6" />
        <text x="455" y="178" fill="#F5F3FF" fontSize="14" fontWeight="600">2. Spend Without Breaking Growth</text>
        <text x="455" y="206" fill="#DDD6FE" fontSize="13">Yield is used first for daily payments.</text>
        <text x="455" y="228" fill="#DDD6FE" fontSize="13">Advance supports flexibility from day one.</text>

        <rect x="840" y="140" width="290" height="140" rx="18" fill="url(#cardGrad)" stroke="#6EE7B7" strokeOpacity="0.6" />
        <text x="865" y="178" fill="#ECFDF5" fontSize="14" fontWeight="600">3. Smart Growth Engine</text>
        <text x="865" y="206" fill="#D1FAE5" fontSize="13">AI-guided strategy optimization</text>
        <text x="865" y="228" fill="#D1FAE5" fontSize="13">adapts to market opportunity.</text>

        <rect x="820" y="380" width="310" height="150" rx="18" fill="url(#cardGrad)" stroke="#34D399" strokeOpacity="0.65" />
        <text x="845" y="418" fill="#ECFDF5" fontSize="14" fontWeight="600">4. Ecosystem Utility Boost</text>
        <text x="845" y="446" fill="#D1FAE5" fontSize="13">OneDex: deeper liquidity + more swaps</text>
        <text x="845" y="468" fill="#D1FAE5" fontSize="13">OnePredict: stronger participation flow</text>
        <text x="845" y="490" fill="#D1FAE5" fontSize="13">Both tools gain recurring demand.</text>

        <rect x="430" y="560" width="340" height="140" rx="18" fill="url(#cardGrad)" stroke="#F9A8D4" strokeOpacity="0.58" />
        <text x="455" y="598" fill="#FDF2F8" fontSize="14" fontWeight="600">5. OneChain Flywheel</text>
        <text x="455" y="626" fill="#FBCFE8" fontSize="13">Higher retained TVL + repeat transactions</text>
        <text x="455" y="648" fill="#FBCFE8" fontSize="13">= stronger network activity and growth.</text>

        <rect x="70" y="380" width="280" height="150" rx="18" fill="url(#cardGrad)" stroke="#60A5FA" strokeOpacity="0.55" />
        <text x="95" y="418" fill="#EFF6FF" fontSize="14" fontWeight="600">User Outcome</text>
        <text x="95" y="446" fill="#DBEAFE" fontSize="13">Save, spend, and grow in one loop</text>
        <text x="95" y="468" fill="#DBEAFE" fontSize="13">without leaving the chain.</text>

        <path d="M350 210 C395 210, 390 210, 430 210" stroke="url(#flowGrad)" strokeWidth="4" fill="none" markerEnd="url(#arrow)" filter="url(#softGlow)" />
        <path d="M750 210 C800 210, 790 210, 840 210" stroke="url(#flowGrad)" strokeWidth="4" fill="none" markerEnd="url(#arrow)" filter="url(#softGlow)" />
        <path d="M980 280 C980 330, 980 340, 980 380" stroke="url(#flowGrad)" strokeWidth="4" fill="none" markerEnd="url(#arrow)" filter="url(#softGlow)" />
        <path d="M820 615 C790 615, 785 615, 770 615" stroke="url(#flowGrad)" strokeWidth="4" fill="none" markerEnd="url(#arrow)" filter="url(#softGlow)" />
        <path d="M430 615 C360 615, 350 540, 350 455" stroke="url(#flowGrad)" strokeWidth="4" fill="none" markerEnd="url(#arrow)" filter="url(#softGlow)" />
        <path d="M210 380 C210 320, 210 300, 210 280" stroke="url(#flowGrad)" strokeWidth="4" fill="none" markerEnd="url(#arrow)" filter="url(#softGlow)" />
      </svg>
    </div>
  );
}

export default function WorkflowPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,0.16),transparent_42%)]" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-white/90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="forum-regular text-lg">OneYield</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5">
              Back to Home
            </Link>
            <Link href="/dashboard" className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
              Launch App
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Workflow
          </div>
          <h1 className="forum-regular text-4xl md:text-6xl">
            Beautiful Workflow, <span className="font-serif-italic">Clear Story</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            This page is built for live narration. It explains how OneYield helps users in daily life while creating
            stronger utility for OneDex, OnePredict, and the wider OneChain ecosystem.
          </p>
        </section>

        <WorkflowSvg />

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex rounded-lg bg-white/10 p-2">
              <Coins className="h-4 w-4 text-white/80" />
            </div>
            <h3 className="text-lg font-medium">Why users care</h3>
            <p className="mt-2 text-sm text-white/70">They no longer choose between growing savings and daily usability.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex rounded-lg bg-white/10 p-2">
              <ArrowRight className="h-4 w-4 text-white/80" />
            </div>
            <h3 className="text-lg font-medium">Why OneDex + OnePredict benefit</h3>
            <p className="mt-2 text-sm text-white/70">They receive recurring flow from routing, swaps, and strategy activity.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 inline-flex rounded-lg bg-white/10 p-2">
              <TrendingUp className="h-4 w-4 text-white/80" />
            </div>
            <h3 className="text-lg font-medium">Why OneChain grows</h3>
            <p className="mt-2 text-sm text-white/70">Higher TVL retention and repeat usage compound into stronger chain-level momentum.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
