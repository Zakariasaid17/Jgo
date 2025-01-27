import Head from 'next/head';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>JihawiGo | Révisions interactives</title>
        <meta name="description" content="Transformez vos révisions en succès 🚀" />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="flex flex-1 flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
