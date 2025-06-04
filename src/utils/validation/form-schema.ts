import { z } from 'zod/v4';

const baseFieldSchema = {
  label: z
    .string()
    .min(1, 'Label cannot be empty')
    .max(60, 'Label cannot exceed 60 characters'),
  name: z
    .string()
    .min(1, 'Name cannot be empty')
    .max(30, 'Name cannot exceed 30 characters'),
  required: z.boolean(),
};

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const selectFieldSchema = z.object({
  ...baseFieldSchema,
  type: z.literal('select'),
  options: z.array(optionSchema),
});

const textOrEmailFieldSchema = z.object({
  ...baseFieldSchema,
  type: z.union([z.literal('text'), z.literal('email')]),
  placeholder: z.string().optional(),
});

const fieldSchema = z.discriminatedUnion('type', [
  selectFieldSchema,
  textOrEmailFieldSchema,
]);

const formSchema = z.object({
  title: z.string(),
  fields: z.array(fieldSchema),
});

const validateFormSchema = (data: object) => {
  try {
    formSchema.parse(data);
    return { valid: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.issues };
    }
    return { valid: false, errors: [{ message: 'Unknown validation error' }] };
  }
};

export { formSchema, validateFormSchema };
export type FormSchema = z.infer<typeof formSchema>;
export type FieldSchema = z.infer<typeof fieldSchema>;
export type SelectOption = z.infer<typeof optionSchema>;
