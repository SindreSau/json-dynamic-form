import MainLayout from '@layouts/main-layout';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

import { useState } from 'react';
import { Select } from './components/ui/select';

const App = () => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted with: ', data);
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Select
          label="Velg boligtype"
          options={[
            { label: 'Velg boligtype...', value: '' },
            { label: 'Leilighet', value: 'leilighet' },
            { label: 'Enebolig', value: 'enebolig' },
            { label: 'Rekkehus', value: 'rekkehus' },
            { label: 'Hytte', value: 'hytte' },
          ]}
          value={value}
          id="property_type"
          name="property_type"
          onValueChange={(newValue, selectedItem) => {
            setValue(newValue);
            console.log('Selected item:', selectedItem);
          }}
        />

        <Input
          type="text"
          placeholder="F.eks. Karl Johans gate 1"
          label="Adresse (der du bruker strøm)"
          name="address_street_name"
          id="address_street_name"
        />

        <Input
          type="text"
          placeholder="Ola Nordmann"
          label="Navn"
          name="name"
          id="name"
        />

        <Input
          type="email"
          placeholder="ola@example.com"
          label="E-post"
          name="email"
          id="email"
        />

        <Button type="submit">Submit</Button>
      </form>
    </MainLayout>
  );
};

export default App;
