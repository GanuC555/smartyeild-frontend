import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[linear-gradient(180deg,hsl(219,40%,56%)_0%,hsl(220,38%,50%)_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_24px_-16px_rgba(103,128,181,0.9)] hover:bg-[linear-gradient(180deg,hsl(219,42%,60%)_0%,hsl(220,40%,54%)_100%)]',
        secondary:
          'border border-foreground/10 bg-foreground/5 text-foreground/85 hover:bg-foreground/10',
        danger: 'bg-red-500/85 text-white hover:bg-red-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
