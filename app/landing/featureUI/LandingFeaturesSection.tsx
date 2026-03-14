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
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2">
              <Sparkles className="h-3.5 w-3.5 text-foreground/60" />
              <span className="text-xs font-medium uppercase tracking-widest text-foreground/60">
                Features
              </span>
            </div>
            <h2 className="text-4xl font-light md:text-5xl lg:text-6xl">
              <span className="text-gradient-bright">Yield & Spend in</span>{' '}
              <span className="font-serif-italic text-gradient">one place</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.08}>
              <div className="glass-card-subtle group h-full p-8 transition-all duration-300 hover:border-foreground/15 hover:bg-foreground/[0.03]">
                <div className="mb-6 flex gap-2">
                  {feature.icons.map((Icon, iconIndex) => (
                    <div
                      key={`${feature.title}-${iconIndex}`}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/5 bg-foreground/[0.03] transition-colors group-hover:border-foreground/10"
                    >
                      <Icon className="h-5 w-5 text-foreground/40" />
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-medium text-foreground/90">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
