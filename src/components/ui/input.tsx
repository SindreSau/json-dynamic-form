import * as React from 'react';

import { cn } from '@/utils/cn';
import Label from '@components/ui/label';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }
>(({ className, type, label, id, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full relative bg-inherit">
      <Label inputId={id}>{label || 'Input'}</Label>
      <input
        type={type}
        className={cn(
          'border rounded px-4 py-2 flex w-full bg-background-input disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
