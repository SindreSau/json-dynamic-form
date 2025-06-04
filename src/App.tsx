import React, { useState } from 'react';
import MainLayout from '@layouts/main-layout';
import JsonEditor from '@components/ui/json-editor';
import exampleSchema from '@schemas/extended-example.json';
import type { FormSchema } from '@utils/validation/form-schema';

const App = () => {
  const [schema, setSchema] = useState<FormSchema>(exampleSchema as FormSchema);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const json = JSON.parse(text);
          setSchema(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <MainLayout>
      <div className="text-center mb-4">
        <label htmlFor="json-uploader" className="mr-2">
          Upload JSON Schema:
        </label>
        <input
          type="file"
          name="json-uploader"
          id="json-uploader"
          accept=".json"
          className="bg-background-input border rounded px-4 py-2 text-sm "
          onChange={handleFileUpload}
        />
      </div>

      <h1 className="w-full text-center">JSON Dynamic Form Editor</h1>
      <JsonEditor initialSchema={schema} />
    </MainLayout>
  );
};

export default App;
