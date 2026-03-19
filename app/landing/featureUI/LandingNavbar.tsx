'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Wallet, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Docs', href: '/#docs' },
  { label: 'Workflow', href: '/workflow' },
];

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10  backdrop-blur-sm">
            <Wallet className="h-4 w-4 text-foreground/90" />
          </div>
          <span className="forum-regular text-lg font-semibold  text-foreground/90">
            OneYield
          </span>
        </a>

        <nav className="hidden md:block">
          <div className="backdrop-blur-xl rounded-xl flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-foreground/60 transition-colors hover:text-foreground/90"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <a
          href="/dashboard"
          className="bg-white/10 hidden items-center gap-2 rounded-full border border-white/20 backdrop-blur-xl px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5 md:flex"
        >
          <Wallet className="h-3.5 w-3.5 text-white/70 font-bold" />
          <span className="text-white/90 ">Launch App</span>
        </a>

        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="flex gap-1.5 p-2 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-foreground/80" />
          ) : (
            <Menu className="h-5 w-5 text-foreground/80" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white overflow-hidden rounded-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground/90"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/dashboard"
                className="  mt-2 flex items-center justify-center gap-2 rounded-full  px-5 py-3 text-sm font-medium text-foreground/90 "
              >
                <Wallet className="h-3.5 w-3.5" />
                Launch App
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
