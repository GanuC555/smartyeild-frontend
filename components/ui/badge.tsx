import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', {
  variants: {
    variant: {
      success: 'bg-green-500/20 text-green-400 border border-green-500/30',
      warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      error: 'bg-red-500/20 text-red-400 border border-red-500/30',
      neutral: 'bg-white/10 text-white/70 border border-white/20',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
