'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useExitModal } from '@/store/use-exit-modal';
import { usePremiumModal } from '@/store/use-premium-modal';

export const PremiumModal = () => {
    const router = useRouter();
    const [isclient, setIsClient] = useState(false);
    const { isOpen, close } = usePremiumModal();
    const [pending, startTransition] = useTransition();

    useEffect(() => setIsClient(true), []);

    const wtsp = () => {
      startTransition(()=> {
        window.open('https://wa.me/+212715150031', '_blank');
    })
    };

    if (!isclient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <div className='flex items-center justify-center mb-5 w-full'>
                        <Image
                          src='/angry.svg'
                          alt='Jihawigo Prof'
                          height={180}
                          width={180}
                        />
                    </div>
                    <DialogTitle className='text-2xl font-bold text-center'>
                    Révisez Sans Limites avec Premium !
                    </DialogTitle>

                    <DialogDescription className='text-center text-base'>
                    Pour 300 DH/an, profitez de cœurs illimités et d’un accès complet aux ressources.                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='whatsapp' className='w-full' size='lg' onClick={wtsp}>
                        Contactez-nous sur WhatsApp !
                        </Button>
                        
                    </div>

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )

}