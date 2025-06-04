type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="h-8 bg-primary/10"></header> */}

      <main className="flex-grow container mx-auto my-6 md:my-8 px-4">
        {children}
      </main>

      <footer className="bg-primary/80">
        <div className="py-4 container mx-auto flex items-center justify-center h-full text-sm text-primary-foreground">
          © {new Date().getFullYear()} - Built by Sindre Sauarlia
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
