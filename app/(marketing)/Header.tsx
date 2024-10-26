
import { Button } from '@/components/ui/button';
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Header(){
    return(
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
        <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
            
            <Link href='/'>
             <div className='pt-8 pl-4 pb-7 flex items-center gap-3'>
               <Image src={'/mini-logo.webp'} width={50} height={50} alt='iam'/>
               <h1 className='text-2xl font-extrabold text-blue-500 tracking-wide'>JihawiGo</h1>
               </div>
            </Link>
            

            <ClerkLoading>
                <Loader className='h-5 w-5 text-muted-foreground animate-spin'/>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <SignedOut>
                    <SignInButton
                     mode='modal'
                    >
                     <Button size='lg' variant='ghost'>Login</Button>

                    </SignInButton>
                </SignedOut>
            </ClerkLoaded>
        </div>
    </header>
    )
}