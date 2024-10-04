import * as React from 'react';

import {cn} from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-mountainAsh-6 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-pashBlack-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-darkLime-7 focus-visible:ring-offset-0 focus-visible:bg-sweetLime-10 disabled:cursor-not-allowed disabled:bg-mountainAsh-10 disabled:text-pashBlack-6 text-pashBlack-1 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export {Input};
