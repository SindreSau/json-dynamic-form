import { cn } from '@/utils/cn';

type LabelProps = {
  inputId: string;
  className?: string;
  children?: React.ReactNode;
};

const Label = ({ inputId, className, children }: LabelProps) => {
  return (
    <label
      className={cn('text-sm font-semibold ', className)}
      htmlFor={inputId}
    >
      {children}
    </label>
  );
};

export default Label;
