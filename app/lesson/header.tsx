import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;

};


export const Header = ({
    hearts,
    percentage,
    hasActiveSubscription
}: Props) => {

    const { open } = useExitModal();

    return (
        <header className=" fixed  bg-white shadow-xl lg:py-[20px] md:py-[15px] py-[10px] px-10 flex gap-x-7 items-center justify-between mx-auto w-full ">
            
           <X
              onClick={open}
             className="text-slate-500 hover:opacity-75 transition cursor-pointer"
            />

            <Progress value={percentage}/>

            <div className="text-rose-500 flex items-center font-bold">
                <Image 
                src='/heart.svg'
                height={28}
                width={28}
                alt='Heart'
                className="mr-2"
                />
                {hasActiveSubscription ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0"/> : hearts}
            </div>

        </header>
    )

}