'use client';

import { motion, useInView } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Brain,
  Link2,
  Network,
  Sparkles,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useRef } from 'react';

const marqueeTerms = [
  'Fixed Receipt Token',
  'Yield Stream Token',
  'SpendBuffer',
  'Senior Lane',
  'Junior Lane',
  'AI Orchestrator',
  'QR Pay',
  'P2P Transfer',
  'Day-One Advance',
  'Principal Protection',
  'Yield Separation',
  'Confidence-Gated Leverage',
  'OneDex LP',
  'OnePredict',
  'Zero Liquidation Risk',
  'Move-Native',
  'Non-Custodial',
  'OneChain',
];

function TermsMarquee() {
  return (
    <div className="relative mb-16 w-full overflow-hidden py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeTerms, ...marqueeTerms].map((term, i) => (
          <span
            key={`${term}-${i}`}
            className="mx-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            {term}
          </span>
        ))}
      </div>
    </div>
  );
}

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

const features = [
  {
    title: 'One-Click Deposit',
    desc: 'Deposit USDC and instantly start earning optimized yield across multiple protocols.',
    icons: [Workflow, Brain],
  },
  {
    title: 'AI-Optimized Returns',
    desc: 'Claude continuously routes your capital to the highest risk-adjusted yield.',
    icons: [Bot, Sparkles],
  },
  {
    title: 'Spend as You Earn',
    desc: 'Your virtual card liquidates just enough yield for real-world purchases.',
    icons: [TrendingUp, Link2],
  },
  {
    title: 'Non-Custodial Design',
    desc: 'Only you can withdraw principal. AI can only allocate.',
    icons: [Link2, Brain],
  },
  {
    title: 'Chain Agnostic',
    desc: 'Built on OneChain and expanding to EVM opportunities.',
    icons: [Network, Sparkles],
  },
  {
    title: 'Auditable Decisions',
    desc: 'Every AI allocation decision and risk assessment is recorded.',
    icons: [BarChart3, Brain],
  },
];

export default function LandingFeaturesSection() {
  return (
    <div className="relative forum-regular z-10">
      <section id="about" className="sticky top-0 min-h-screen px-4 py-24 md:py-32 bg-black rounded-4xl">
        <div className="mx-auto max-w-7xl rounded">
          <TermsMarquee />

          <ScrollReveal>
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Sparkles className="h-3.5 w-3.5 text-white/60" />
                <span className="text-xs font-medium uppercase tracking-widest text-white/60">
                  Features
                </span>
              </div>
              <h2 className="text-4xl forum-regular md:text-5xl lg:text-6xl text-white">
                <span>Yield & Spend in</span>{' '}
                <span className="font-serif-italic">one place</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.08}>
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/20 p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="group relative h-full rounded-xl border-[0.75px] border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03]">
                    <div className="mb-6 flex gap-2">
                      {feature.icons.map((Icon, iconIndex) => (
                        <div
                          key={`${feature.title}-${iconIndex}`}
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] transition-colors group-hover:border-white/10"
                        >
                          <Icon className="h-5 w-5 text-white/40" />
                        </div>
                      ))}
                    </div>
                    <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{feature.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
