import Image from "next/image";
import { Button } from '../../components/ui/button';
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="relative w-[340px] h-[340px] lg:w-[424px] lg:h-[424px] mb-4 lg:mb-0">
          <Image src='/book.webp' fill alt="home image" />
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[400px] text-center">
            Apprenez, pratiquez et maîtrisez en agissant avec JihawiGo
          </h1>

          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size='lg' variant='secondary' className="w-full">
                    Se lancer
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button size='lg' variant='primaryOutline' className="w-full">
                  Se connecter
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Button size='lg' variant='secondary' className="w-full" asChild>
                  <Link href='/learn'>
                    Reprendre 
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </>
  );
}
