'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

const footerLinks = {
  Product: ['Vault', 'Strategies', 'SpendBuffer', 'Card'],
  Protocol: ['OneDex', 'OnePredict', 'OneChain', 'Docs'],
  Company: ['About',  'Contact'],
};

const socialLinks = ['Twitter', 'Discord', 'GitHub'];

export default function LandingFooter() {
  return (
    <footer className="forum-regular relative overflow-hidden bg-black px-4 pb-8 pt-20 md:pt-28">
      {/* Subtle top border glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Large brand statement */}
        <div className="mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl text-4xl font-light leading-[1.15] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Deposit once.{' '}
            <span className="font-serif-italic text-white/60">
              Earn continuously.
            </span>
            <br />
            Spend{' '}
            <span className="font-serif-italic text-white/60">freely.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Launch App
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Links grid */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:mb-20 md:grid-cols-4 md:gap-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'Docs' ? '/docs' : '#'}
                      className="text-sm text-white/50 transition-colors hover:text-white/90"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">
              Community
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white/90"
                  >
                    {link}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive brand watermark */}
        <div className="pointer-events-none relative h-full select-none overflow-hidden md:h-[19rem]">
          <div className="absolute inset-0">
            <FlickeringGrid
              text="OneYield&Spend"
              fontSize={160}
              className="h-full w-full"
              squareSize={2}
              gridGap={3}
              color="#6B7280"
              maxOpacity={0.28}
              flickerChance={0.09}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Bottom bar */}
        
      </div>
    </footer>
  );
}
