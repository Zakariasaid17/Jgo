import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    title: string;
    id: number;
    imageSrc: string;
    onClick: (id: number) => void;
    disabled?: boolean;
    active?: boolean;


};


export function Card({title,id,imageSrc,onClick,disabled,active}:Props){
    
    return(
        <div
          onClick={()=> onClick(id)}
          className={cn('h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[157px] min-w-[150px]',disabled && 'pointer-events-none opacity-50')}
          >
         
            <div className="min-[24px] w-full flex items-center justify-end">
                 
                {active && 
                <div className="  bg-blue-600 rounded-md flex items-center justify-center p-1.5">
                    <Check className="text-white stroke-[4] h-3 w-3"/>
                </div> 
                }

            </div>

            <Image
               src={imageSrc}
               alt={title}
               height={150}
               width={150.33}
               className="rounded-lg object-cover"
            />

            

        </div>
    )
}