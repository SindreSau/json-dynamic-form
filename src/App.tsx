import MainLayout from '@layouts/main-layout';
import DynamicForm from './components/ui/dynamic-form';
import exampleSchema from '@schemas/example.json';

const App = () => {
  const schema = JSON.parse(JSON.stringify(exampleSchema));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted with: ', data);
  };

  return (
    <MainLayout>
      <DynamicForm schema={schema} handleSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default App;
