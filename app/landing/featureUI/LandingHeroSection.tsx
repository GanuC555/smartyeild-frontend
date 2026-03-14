'use client';

import ConnectWalletButton from './ConnectWalletButton';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function LandingHeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.4,
          filter:
            'brightness(0.5) contrast(1.2) saturate(0.7) hue-rotate(200deg)',
        }}
      >
        <video
          src="https://framerusercontent.com/assets/1g8IkhtJmlWcC4zEYWKUmeGWzI.mp4"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_hsl(var(--background))_70%)]" />
      </div>

      <div className="spotlight-blue pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass-card mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
      >
        <Wallet className="h-8 w-8 text-foreground/80" strokeWidth="1.5" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        className="mb-8 flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-2"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/70">
          Next-Gen Yield & Spend Protocol
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1.1, type: 'spring' }}
        className="mb-6 max-w-4xl text-center text-5xl font-light leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
      >
        <span className="text-gradient">Live Off Your</span>{' '}
        <span className="font-serif-italic text-gradient-bright">Yield</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-10 max-w-lg text-center text-base text-muted-foreground md:text-lg"
      >
        Non-custodial yield vault with a real-world spending layer. Deposit USDC,
        let AI optimize your returns on OneChain, and spend instantly worldwide.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <ConnectWalletButton label="Launch App" />
      </motion.div>
    </section>
  );
}
