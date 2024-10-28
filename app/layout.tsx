import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { PremiumModal } from "@/components/modals/premium-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JihawiGo",
  description: "Transformez vos révisions en succès avec JihawiGo",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="fr">
      <body className={font.className}>
        <Toaster/>
        <ExitModal/>
        <HeartsModal/>
        <PracticeModal/>
        <PremiumModal/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
