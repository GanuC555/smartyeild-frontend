'use client';

import { motion, useInView } from 'framer-motion';
import {
  BarChart3,
  CheckCircle,
  Code,
  Mail,
  Network,
  RefreshCw,
  Settings,
  Sparkles,
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

export default function LandingServicesSection() {
  return (
    <section id="services" className="relative px-4 py-24 md:py-32">
      <div className="spotlight-blue pointer-events-none absolute inset-0" />
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
              <span className="text-gradient-bright">Smarter Yield,</span>{' '}
              <span className="font-serif-italic text-gradient">Built with AI</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          <ScrollReveal delay={0.1}>
            <div className="glass-card-subtle h-full p-8">
              <div className="mb-8 space-y-3">
                {[
                  { icon: '📊', label: 'Analyze Markets', status: 'done' },
                  { icon: '🧠', label: 'Compute AI Allocation', status: 'loading' },
                  { icon: '⚡', label: 'Move Capital On-Chain', status: 'done' },
                  { icon: '💳', label: 'Liquidate for Spend', status: 'loading' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-foreground/5 bg-foreground/[0.02] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-sm text-foreground/60">{item.label}</span>
                    </div>
                    {item.status === 'done' ? (
                      <CheckCircle className="h-4 w-4 text-primary/60" />
                    ) : (
                      <RefreshCw
                        className="h-4 w-4 animate-spin text-foreground/30"
                        style={{ animationDuration: '3s' }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-medium text-foreground/90">Autonomous Rebalancing</h3>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card-subtle h-full p-8">
              <div className="mb-8 flex items-center justify-center">
                <div className="relative flex h-48 w-full items-center justify-center">
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
                    <Sparkles className="h-8 w-8 text-foreground/50" />
                  </div>
                  {[Mail, Settings, Code, BarChart3, Network, Sparkles].map((Icon, index) => {
                    const angle = index * 60 * (Math.PI / 180);
                    const x = Math.cos(angle) * 80;
                    const y = Math.sin(angle) * 60;

                    return (
                      <div
                        key={`${Icon.displayName ?? 'icon'}-${index}`}
                        className="absolute flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/5 bg-foreground/[0.03]"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                      >
                        <Icon className="h-4 w-4 text-foreground/40" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <h3 className="text-xl font-medium text-foreground/90">Chain Agnostic Execution</h3>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
