import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { PremiumModal } from "@/components/modals/premium-modal";
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";


const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
      default: 'Jihawigo',
      template: '%s - Jihawigo'
  },
  description: "Transformez vos révisions en succès avec JihawiGo",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
    <ClerkProvider>

      <Head>
        <link rel="canonical" href="https://www.jihawigo.com/" />
        <meta name="robots" content="index, follow" />
      </Head>
    
    <html lang="fr">
      <body className={font.className}>
        <Toaster/>
        <ExitModal/>
        <HeartsModal/>
        <PracticeModal/>
        <PremiumModal/>
        {children}
        <Analytics />
        </body>
    </html>
   
    </ClerkProvider>
  );
}
