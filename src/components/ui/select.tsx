import React, { useCallback } from 'react';
import { cn } from '@/utils/cn';
import Label from '@components/ui/label';
import type { SelectOption } from '@/utils/validation/form-schema';

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string, selectedOption: SelectOption) => void;
  className?: string;
  id: string;
  name?: string;
}

const Select = ({
  label,
  options,
  value,
  onValueChange,
  className,
  id,
  name,
}: SelectProps) => {
  const handleOnValueChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      const selectedOption = options.find(
        (option) => option.value === selectedValue
      );
      if (!selectedOption) return;
      onValueChange(selectedValue, selectedOption);
    },
    [options, onValueChange]
  );

  return (
    <div className="flex flex-col w-full bg-inherit">
      <Label inputId={id}>{label}</Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleOnValueChange}
        className={cn(
          'w-full rounded border bg-background-input px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === ''}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.displayName = 'Select';

export { Select };
