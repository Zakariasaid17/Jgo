'use client'

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import { Divide, Link } from "lucide-react";
import Image from "next/image";
import { Router } from "next/router";
import { useExitModal } from "@/store/use-exit-modal";
import { useTransition } from "react";
import { toast } from "sonner";
import { usePremiumModal } from "@/store/use-premium-modal";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";




type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const Items = ({hearts,points,hasActiveSubscription}:Props) => {

    //const [pending, startTransition] = useTransition();
    const [pending, startTransition] = useTransition();

    const {open} = usePremiumModal();


    const onRefillHearts = () => {
        if(pending || hearts === 5 || points < POINTS_TO_REFILL) {
            return;
        }

        startTransition(()=>{
            refillHearts().catch(()=> toast.error('Something went wrong'));
        }) 
    };

    const onUpgrade = () => {
        /*startTransition(()=> {
            window.location.href = 'https://wa.me/1234567890';
        })*/
       open()
    }



    return(
        <ul className="w-full">
          

           <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2 ">
                 <Image
                    src='/unlimited.svg'
                    alt='unlimited'
                    height={60}
                    width={60}
                 />

                 <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited hearts
                    </p>
                    
                 </div>
                 <Button
                   onClick={onUpgrade}
                   disabled={pending}
                 >
                    {hasActiveSubscription ? 'settings' : 'upgrade'}
                 </Button>
           </div>
        </ul>
    )
}