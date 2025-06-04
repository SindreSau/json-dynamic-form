import { describe, expect, it } from 'vitest';
import { validateFormSchema } from './form-schema';
import exampleSchema from '@schemas/example.json';
import shouldFailSchema from '@schemas/should-fail.json';

describe('Form Schema Validation', () => {
  it('example json file should parse without errors', () => {
    const parsedSchema = JSON.parse(JSON.stringify(exampleSchema));
    // console.log('Parsed Schema:', parsedSchema);
    expect(parsedSchema).toBeDefined();
  });

  it('example.json should be a valid form schema', () => {
    const validationResult = validateFormSchema(exampleSchema);
    console.log('Validation Result:', validationResult);
    expect(validationResult.valid).toBe(true);
  });

  it('should-fail.json should not be a valid form schema', () => {
    const validationResult = validateFormSchema(shouldFailSchema);
    // console.log('Validation Result:', validationResult);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors?.length).toBeGreaterThan(0);
  });
});
