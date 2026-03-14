'use client';

import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
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

export default function LandingQuoteSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="spotlight pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-4xl px-4 text-center">
        <ScrollReveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2">
            <Star className="h-3.5 w-3.5 text-foreground/60" />
            <span className="text-xs font-medium uppercase tracking-widest text-foreground/60">
              Smart Yield, Real Spending
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-2xl leading-relaxed text-foreground/50 md:text-3xl lg:text-4xl">
            &quot;You don&apos;t have to{' '}
            <span className="font-serif-italic text-foreground/70">withdraw</span> to spend.
            Swipe your card, and the protocol liquidates just enough earned yield in
            <span className="font-serif-italic text-foreground/70"> real time</span>.&quot;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
