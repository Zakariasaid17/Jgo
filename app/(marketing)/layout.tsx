import { Footer } from "./Footer";
import { Header } from "./Header";
import Head from 'next/head';

type Props = {
  children: React.ReactNode;
  noIndex?: boolean;  // Ajouter un prop pour contrôler l'indexation
}

function Layout({ children, noIndex }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center">
        {/* Utilisation du composant Head pour les métadonnées */}
        <Head>
          <title>{noIndex ? 'Page protégée | JihawiGo' : 'JihawiGo'}</title>
          <meta name="description" content="Transformez vos révisions en succès 🚀" />
          <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
        </Head>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
