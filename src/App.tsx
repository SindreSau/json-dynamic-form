import MainLayout from '@layouts/main-layout';
import DynamicForm from './components/ui/dynamic-form';
import exampleSchema from '@schemas/example.json';

const App = () => {
  const schema = JSON.parse(JSON.stringify(exampleSchema));

  return (
    <MainLayout>
      <DynamicForm schema={schema} />
    </MainLayout>
  );
};

export default App;
