import { Wallet } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="px-4 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/10">
            <Wallet className="h-3.5 w-3.5 text-foreground/70" />
          </div>
          <span className="font-serif text-sm font-semibold italic text-foreground/70">
            OneYield
          </span>
        </div>

        <p className="text-xs text-foreground/30">© 2026 OneYield. All rights reserved.</p>

        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-foreground/30 transition-colors hover:text-foreground/60"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
