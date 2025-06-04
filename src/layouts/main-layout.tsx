type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-8 bg-primary/10"></header>
      <main className="flex-grow container mx-auto my-8 md:my-12 px-4">
        {children}
      </main>
      <footer className="h-12 bg-primary/60"></footer>
    </div>
  );
};

export default MainLayout;
