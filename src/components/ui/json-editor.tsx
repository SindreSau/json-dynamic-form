import { useState, useEffect } from 'react';
import cn from '@/utils/cn';
import {
  currentSupportedTypes,
  validateFormSchema,
  type FormSchema,
} from '@/utils/validation/form-schema';
import DynamicForm from './dynamic-form';
import type { $ZodIssue } from 'zod/v4/core';

type JsonEditorProps = {
  initialSchema: FormSchema;
  className?: string;
};

const JsonEditor = ({ initialSchema, className }: JsonEditorProps) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [parsedSchema, setParsedSchema] = useState<FormSchema | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [schemaValidation, setSchemaValidation] = useState<{
    valid: boolean;
    errors: ($ZodIssue[] | { message: string }[]) | null;
  }>({ valid: true, errors: null });
  const [debouncedText, setDebouncedText] = useState<string>('');

  useEffect(() => {
    const prettyJson = JSON.stringify(initialSchema, null, 2);
    setJsonText(prettyJson);
    setDebouncedText(prettyJson);
    setParsedSchema(initialSchema);
  }, [initialSchema]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(debouncedText);
      setParsedSchema(parsed);
      setJsonError(null);
      const validation = validateFormSchema(parsed);
      setSchemaValidation(validation);
    } catch (error) {
      if (debouncedText.trim()) {
        setJsonError((error as Error).message);
        setParsedSchema(null);
      }
    }
  }, [debouncedText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(jsonText);
    }, 200);
    return () => clearTimeout(timer);
  }, [jsonText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonText(newText);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted with data:', data);
  };

  return (
    <>
      <div className="flex gap-2 items-center justify-center">
        Currently supprted field types:
        {currentSupportedTypes.map((type) => (
          <div
            key={type}
            className="px-2 rounded text-sm bg-card border border-primary"
          >
            {type}
          </div>
        ))}
      </div>
      <div
        className={cn('grid grid-cols-1 md:grid-cols-2 gap-6 mt-4', className)}
      >
        <div className="flex flex-col">
          <h2 className="mb-2 text-center">JSON Schema Editor</h2>
          <div className=" p-2 rounded mb-2">
            <textarea
              className="font-mono text-sm w-full min-h-[max(400px,70vh)] p-2 bg-background-input rounded border"
              value={jsonText}
              onChange={handleTextChange}
              spellCheck={false}
              area-label="JSON Schema Editor"
              placeholder="Paste or edit your JSON schema here..."
            />
          </div>
          {jsonError && (
            <div className=" border-destructive border p-2 rounded text-destructive text-sm">
              <strong>JSON Error:</strong> {jsonError}
            </div>
          )}
          {!jsonError && !schemaValidation.valid && schemaValidation.errors && (
            <div className="bg-background-muted border-warning border p-2 rounded text-warning text-sm">
              <strong>Schema Validation Errors:</strong>
              <ul className="list-disc pl-5">
                {schemaValidation.errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <section className="flex flex-col">
          <h2 className="mb-2 text-center">Form Preview</h2>
          <div className=" p-4 rounded">
            {parsedSchema && schemaValidation.valid ? (
              <DynamicForm
                schema={parsedSchema}
                handleSubmit={handleFormSubmit}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted">
                {jsonError
                  ? 'Fix JSON errors to see form preview'
                  : 'Fix schema validation errors to see form preview'}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default JsonEditor;
