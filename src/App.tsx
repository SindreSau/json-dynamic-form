import MainLayout from '@layouts/main-layout';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

import { useState } from 'react';
import { Select } from './components/ui/select';

const App = () => {
  const [value, setValue] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (value) {
      formData.set('property_type', value);
    }
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted with: ', data);
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit}>
        <Select
          label="Select Property Type"
          items={[
            { label: 'House', value: 'house' },
            { label: 'Apartment', value: 'apartment' },
            { label: 'Condo', value: 'condo' },
          ]}
          labelExtractor={(item) => item.label}
          valueExtractor={(item) => item.value}
          value={value || ''}
          id="property_type"
          name="property_type"
          onValueChange={(newValue, selectedItem) => {
            setValue(newValue);
            console.log('Selected item:', selectedItem);
          }}
        />

        <Input
          type="text"
          placeholder="Write your name here"
          label="Name"
          name="name"
          id="name"
        />

        <Input
          type="email"
          placeholder="Write your email here"
          label="Email"
          name="email"
          id="email"
        />

        <div className="flex gap-2 mt-4">
          <Button type="submit">Click me</Button>

          <Button variant="secondary" size="lg">
            Click me
          </Button>

          <Button variant="accent" size="sm">
            Click me
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default App;
