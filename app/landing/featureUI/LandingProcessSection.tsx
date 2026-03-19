'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Coins, CreditCard, Sparkles, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

const steps = [
  {
    title: 'Deposit once',
    desc: 'Users deposit USDC one time and keep full ownership of their principal position.',
    icon: Coins,
  },
  {
    title: 'Spend from yield first',
    desc: 'Daily payments use earned yield before touching advance, so savings stay productive longer.',
    icon: CreditCard,
  },
  {
    title: 'Grow with AI + protocol rails',
    desc: 'Smart routing feeds OneDex and OnePredict activity while improving user returns over time.',
    icon: Sparkles,
  },
  {
    title: 'OneChain flywheel',
    desc: 'More retained TVL, more transactions, more fees, and stronger daily user stickiness on-chain.',
    icon: TrendingUp,
  },
];

export default function LandingProcessSection() {
  return (
    <section id="workflow" className="forum-regular relative z-20 px-4 py-24 md:py-32 ">
      <div className="spotlight pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center text-white">
            <h2 className="text-4xl font-light md:text-5xl lg:text-6xl">
              <span>Workflow</span>{' '}
              <span className="font-serif-italic">That Feels Human</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              A simple value journey: users keep money productive, spend with less friction, and help OneChain grow
              through OneDex and OnePredict activity.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card-subtle rounded-3xl border border-white/10 bg-black/70 p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-7 md:items-stretch">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const showArrow = index < steps.length - 1;

                return (
                  <div key={step.title} className="contents">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left md:col-span-1"
                    >
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                        <Icon className="h-4 w-4 text-white/80" />
                      </div>
                      <h3 className="text-sm font-medium text-white md:text-base">{step.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/65 md:text-sm">{step.desc}</p>
                    </motion.div>

                    {showArrow ? (
                      <div className="hidden items-center justify-center text-white/40 md:col-span-1 md:flex">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card-subtle rounded-3xl border border-white/10 bg-white/5 p-8 text-white md:p-12">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">User Value</p>
                <h4 className="mt-3 text-lg font-medium">Save + Spend Together</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Users are not forced to choose between locked yield and daily liquidity.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Protocol Synergy</p>
                <h4 className="mt-3 text-lg font-medium">OneDex + OnePredict Utility</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Capital routing and market participation continuously feed activity into core OneChain tools.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Chain-Level Impact</p>
                <h4 className="mt-3 text-lg font-medium">Sustained On-Chain Growth</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Higher TVL retention, repeat payments, and recurring swaps create long-term ecosystem momentum.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-5">
              <p className="text-sm text-white/75 md:text-base">
                <span className="text-white">Narration tip:</span> “OneYield turns one deposit into a continuous value loop —
                users win with flexibility, OneDex and OnePredict win with sustained demand, and OneChain wins with deeper,
                stickier on-chain behavior.”
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-white/10 bg-black/40 p-4 text-center text-xs text-white/60 md:text-sm">
            Workflow = Deposit → Smart Routing → Yield-First Spending → Protocol Utility → OneChain Flywheel
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
