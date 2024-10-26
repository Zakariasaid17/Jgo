'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useExitModal } from '@/store/use-exit-modal';

export const ExitModal = () => {
    const router = useRouter();
    const [isclient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

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
                          alt='Mascot'
                          height={100}
                          width={100}
                        />
                    </div>
                    <DialogTitle className='text-2xl font-bold text-center'>
                      Attends, ne pars pas !
                    </DialogTitle>

                    <DialogDescription className='text-center text-base'>
                      Tu es sur le point de quitter la leçon, es-tu sûr ?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='mb-4'>
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Button variant='primary' className='w-full' size='lg' onClick={close}>
                          Continue d&apos;apprendre.
                        </Button>
                        <Button variant='dangerOutline' className='w-full' size='lg' onClick={() => {close(); router.push('/learn')}}>
                          Terminer la session.  
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )

}