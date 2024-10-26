'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {Dialog,
     DialogContent,
      DialogDescription,
       DialogFooter,
        DialogHeader,
         DialogTitle} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { useHeartsModal } from '@/store/use-hearts-modal';

export const HeartsModal = () => {
    const router = useRouter();
    const [isclient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    const onClick = () => {
        close();
        router.push('/shop');
    };

    if(!isclient) {
        return null;
    }

    return(

        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center justify-center mb-5 w-full'>
                        <Image
                          src='/teach.svg'
                          alt='Mascot'
                          height={100}
                          width={100}
                        />
                    </div>
                    <DialogTitle className='text-2xl font-bold text-center'>
                    Tu n'as plus de cœurs !
                    </DialogTitle>

                    <DialogDescription className='text-center text-base'>
                    Obtiens l'abonnement Pro pour des cœurs illimités dans la boutique.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='primary'className='w-full' size='lg' onClick={onClick}>
                        Obtiens des cœurs illimités.
                        </Button>
                        <Button variant='primaryOutline' className='w-full' size='lg' onClick={close}>
                         Non merci.
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )

}