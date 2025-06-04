import cn from '@/utils/cn';
import {
  validateFormSchema,
  type FieldSchema,
  type FormSchema,
} from '@/utils/validation/form-schema';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Select } from '@components/ui/select';
import { useState, useMemo } from 'react';

type DynamicFormProps = {
  schema?: FormSchema;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

const DynamicForm = ({ schema, className, handleSubmit }: DynamicFormProps) => {
  const [selectValues, setSelectValues] = useState<Record<string, string>>({});

  const fieldsWithIds = useMemo(() => {
    if (!schema?.fields) return [];

    return schema.fields.map((field) => ({
      ...field,
      id: `field-${field.name}-${crypto.randomUUID().substring(0, 13)}`,
    }));
  }, [schema?.fields]);

  const isValidSchema = validateFormSchema(schema as object);
  if (!isValidSchema.valid) {
    console.error('Invalid schema:', isValidSchema.errors);
    return (
      <div>
        <h2 className="text-destructive">Invalid form schema</h2>
        {isValidSchema.errors && isValidSchema.errors.length > 0 && (
          <ul>
            {isValidSchema.errors.map((error, index) => (
              <li className="text-destructive" key={index}>
                {error.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const handleSelectChange = (fieldName: string, value: string) => {
    setSelectValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-4', className)}
    >
      {fieldsWithIds.map((field: FieldSchema & { id: string }) => {
        switch (field.type) {
          case 'text':
          case 'email':
            return (
              <Input
                key={field.id}
                id={field.id}
                name={field.name}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
              />
            );
          case 'select':
            return (
              <Select
                key={field.id}
                id={field.id}
                name={field.name}
                label={field.label}
                options={field.options}
                value={selectValues[field.name] || ''}
                onValueChange={(value) => handleSelectChange(field.name, value)}
              />
            );
          default:
            return null;
        }
      })}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DynamicForm;
