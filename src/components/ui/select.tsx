import React, { useCallback } from 'react';
import { cn } from '@/utils/cn';
import Label from '@components/ui/label';

interface Props<DataType> {
  label: string;
  items: Array<DataType>;
  value: string;
  labelExtractor: (item: DataType) => string;
  valueExtractor: (item: DataType) => string;
  onValueChange: (value: string, selectedItem: DataType) => void;
  className?: string;
  id?: string;
  name?: string;
}

const Select = <DataType,>({
  label,
  items,
  value,
  onValueChange,
  labelExtractor,
  valueExtractor,
  className,
  id = `select-${Math.random().toString(36).substring(2, 9)}`,
  name,
}: Props<DataType>) => {
  const handleOnValueChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const {
        target: { value: selectedValue },
      } = event;

      const item = items.find((i) => valueExtractor(i) === selectedValue);

      if (!item) return;

      onValueChange(selectedValue, item);
    },
    [items, onValueChange, valueExtractor]
  );

  return (
    <div className="flex flex-col w-full">
      <Label inputId={id}>{label}</Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleOnValueChange}
        className={cn(
          'w-full rounded border border-border bg-background-input px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed relative z-10',
          className
        )}
      >
        {items.map((item, index) => {
          const itemLabel = labelExtractor(item);
          const itemValue = valueExtractor(item);
          return (
            <option key={index} value={itemValue} className="capitalize">
              {itemLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.displayName = 'Select';

export { Select };
