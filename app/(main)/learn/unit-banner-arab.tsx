
import { Button } from "@/components/ui/button";
import { challenges, lessons, units } from "@/db/schema";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
    title: string,
    description: string,
};




export const UnitBannerArab = ({title,description}: Props) => {



  return (
      
    <div className="w-full rounded-xl bg-blue-500 p-5 text-white flex justify-end">
      
      
      <div className="space-y-2.5">
        <h3 className="text-3xl font-bold font-Messiri text-end ">{title}</h3>
        <p className="text-2xl font-bold font-Messiri text-center ">{description}</p>
      </div>
    </div>
)
 
  

};


<Link href='/lesson'>
         <Button size='lg' variant='secondary'
         className="hidden xl:flex border-2 border-b-4 active:border-b-2">

            <NotebookPen className="mr-2"/>
            <p className="text-2xl font-Messiri">
            إستمر
            </p>

         </Button>
      </Link>
