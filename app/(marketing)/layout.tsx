// layout.tsx
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Metadata } from 'next'

// Add metadata export
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  // Add other SEO metadata
  title: {
    template: '%s | JihawiGo',
    default: 'JihawiGo',
  },
  description: 'Transformez vos révisions en succès 🚀',
}

type Props = {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default layout