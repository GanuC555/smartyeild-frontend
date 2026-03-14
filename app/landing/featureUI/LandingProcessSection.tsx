'use client';

import { motion, useInView } from 'framer-motion';
import { BarChart3, ShoppingCart, TrendingUp } from 'lucide-react';
import { useRef, useState } from 'react';

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
    number: '01',
    title: 'Deposit USDC',
    desc: 'Connect your wallet and deposit USDC. Receipt Tokens track your growing balance.',
  },
  {
    number: '02',
    title: 'AI Routes Capital',
    desc: 'The AI analyzes protocols and deploys capital for the best risk-adjusted return.',
  },
  {
    number: '03',
    title: 'Yield & Spend',
    desc: 'Card swipes auto-liquidate only enough earned yield to settle purchases.',
  },
];

export default function LandingProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section id="process" className="relative z-20 px-4 py-24 md:py-32 ">
      <div className="spotlight pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center text-white">
            <h2 className="text-4xl font-light md:text-5xl lg:text-6xl">
              <span>How OneYield</span>{' '}
              <span className="font-serif-italic">Works</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card-subtle mb-8 rounded-2xl p-2 border border-white/10 bg-white/5 bg-black">
            <div className="grid grid-cols-3 gap-2 bg-black rounded-xl p-1">
              {steps.map((entry, index) => (
                <button
                  key={entry.number}
                  onClick={() => setActiveStep(index)}
                  className={`rounded-xl py-3 text-sm font-medium transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-white/10 text-white'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  STEP {index + 1}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card-subtle rounded-2xl p-8 md:p-12 border border-white/10 bg-white/5 text-white">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-4 bg-black rounded-xl p-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  {[
                    { name: 'OneDex Liquidity', score: 60, icon: BarChart3 },
                    { name: 'OnePredict Markets', score: 15, icon: TrendingUp },
                    { name: 'Aave Supply (Beta)', score: 25, icon: ShoppingCart },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3 border-t border-white/10 py-2.5 first:border-0 first:pt-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        <item.icon className="h-3.5 w-3.5 text-white/50" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-white/70">{item.name}</span>
                        <div className="mt-1 h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-white/30" style={{ width: `${item.score}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-6xl font-light text-white/20 md:text-8xl">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-2xl font-medium text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-white/80">{step.desc}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
