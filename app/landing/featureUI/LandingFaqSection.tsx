'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, HelpCircle } from 'lucide-react';
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

const faqs = [
  {
    q: 'How is my yield generated?',
    a: 'Deposited USDC is deployed across whitelisted protocols on OneChain and rebalanced by AI.',
  },
  {
    q: 'Can the AI steal my funds?',
    a: 'No. The design is non-custodial. AI can allocate only within strict strategy permissions.',
  },
  {
    q: 'How does the virtual card work?',
    a: 'Card settlement requests trigger real-time liquidation of earned yield only.',
  },
  {
    q: 'Can I withdraw at any time?',
    a: 'Yes. The vault maintains idle reserve to support user withdrawals.',
  },
];

export default function LandingFaqSection() {
  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2">
              <HelpCircle className="h-3.5 w-3.5 text-foreground/60" />
              <span className="text-xs font-medium uppercase tracking-widest text-foreground/60">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl font-light md:text-5xl lg:text-6xl">
              <span className="text-gradient-bright">Frequently Asked</span>{' '}
              <span className="font-serif-italic text-gradient">Questions</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid items-start gap-6 md:grid-cols-[1fr_1.5fr]">
          <ScrollReveal delay={0.1}>
            <div className="glass-card-subtle p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10">
                <HelpCircle className="h-6 w-6 text-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-foreground/90">Still Have Questions?</h3>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 px-5 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-foreground/5"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                Ask A Question
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${index}`}
                  className="glass-card-subtle rounded-xl border-none px-6"
                >
                  <AccordionTrigger className="py-5 text-sm text-foreground/80 hover:no-underline hover:text-foreground/95">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
