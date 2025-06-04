import * as React from 'react';

import { cn } from '@/utils/cn';
import Label from '@components/ui/label';

export interface TelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
}

const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full relative bg-inherit">
        <Label inputId={id}>{label || 'Phone Number'}</Label>
        <input
          type="tel"
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
  }
);

TelInput.displayName = 'TelInput';

export { TelInput };
