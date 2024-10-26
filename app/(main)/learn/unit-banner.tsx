
import { Button } from "@/components/ui/button";
import { challenges, courses, lessons, units } from "@/db/schema";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
    title: string,
    description: string,
};




export const UnitBanner = ({title,description}: Props) => {


  return (
  
    
    
    <div className="w-full rounded-xl bg-blue-600 p-5 text-white flex items-center justify-between">
      <div className="space-y-2.5 ">

     
      
       {<h3 className="text-2xl font-Poppins font-bold">{title}</h3>}
        <p className="text-lg font-Poppins">{description}</p>


      </div>
      
    </div>

  
)
  

};



<Link href='/lesson'>
         <Button size='lg' variant='secondary'
         className="hidden xl:flex border-2 border-b-4 active:border-b-2">

            <NotebookPen className="mr-2"/>
            Continue

         </Button>
      </Link>