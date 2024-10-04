import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300',
  {
    variants: {
      variant: {
        received: 'border-transparent bg-[#EEFFF4] text-[#16A34A]',
        pending: 'border-transparent bg-[#FFF7E9] text-[#D98D01]',
        failed:
          'border-transparent bg-[#FFF2EA] text-[#F15046] hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80',
      },
    },
    defaultVariants: {
      variant: 'received',
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
          variant == 'received' && 'bg-[#16A34A]',
          variant === 'pending' && 'bg-[#D98D01]',
          variant === 'failed' && 'bg-[#F15046]',
        )}
      ></div>
      {children}
    </div>
  );
}

export {Badge, badgeVariants};
