// layout.tsx

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { PremiumModal } from "@/components/modals/premium-modal";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Jihawigo",
    template: "%s - Jihawigo",
  },
  description: "Transformez vos révisions en succès avec JihawiGo.",
  keywords: [
    "éducation",
    "révision",
    "apprentissage",
    "Jihawigo",
    "cours en ligne",
    "matières scolaires",
  ],
  authors: [{ name: "Votre Nom", url: "https://www.jihawigo.com" }],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.jihawigo.com/",
    title: "Jihawigo - Transformez vos révisions en succès",
    description: "Avec Jihawigo, la révision Jihawi devient simple, interactive et efficace pour assurer votre réussite.",
    images: [
      {
        url: "https://www.jihawigo.com/book.webp",
        width: 800,
        height: 600,
        alt: "Learning illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jihawigo",
    title: "Jihawigo - Transformez vos révisions en succès",
    description: "Avec Jihawigo, la révision Jihawi devient simple, interactive et efficace pour assurer votre réussite.",
    images: ["https://www.jihawigo.com/book.webp"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  alternates: {
    canonical: "https://www.jihawigo.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr" className={font.className}>
        <Head>
          {/* Preload Inter Font for better performance */}
          <link
            rel="preload"
            href="/fonts/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <PremiumModal />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
