import * as React from 'react';

import { cn } from '@/utils/cn';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ className, type, label, ...props }, ref) => {
  return (
    <>
      <label className="mb-2 text-sm text-muted">{label || 'Input'}</label>
      <input
        type={type}
        className={cn(
          'border rounded px-4 py-2 flex w-full bg-background-muted disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        {...props}
      />
    </>
  );
});
Input.displayName = 'Input';

export { Input };
