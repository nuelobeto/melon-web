import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

export type BadgeVariants = 'standard' | 'offer' | 'referral';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300',
  {
    variants: {
      variant: {
        standard: 'border-transparent bg-[#EEFFF4] text-[#16A34A]',
        offer: 'border-transparent bg-pink-10 text-pink-1',
      },
    },
    defaultVariants: {
      variant: 'standard',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({children, className, variant, ...props}: BadgeProps) {
  return (
    <div
      className={cn('w-fit', badgeVariants({variant}), className)}
      {...props}
    >
      <div
        className={cn(
          'w-2 h-2 rounded-full bg-black mr-2',
          variant == 'standard' && 'bg-[#16A34A]',
          variant === 'offer' && 'bg-pink-1',
        )}
      ></div>
      {children}
    </div>
  );
}

export {Badge, badgeVariants};
