'use-client'

  import { useState } from "react";

import Image from "next/image";
import { Challenge } from "./challenge";
import { challenges } from "@/db/schema";

type Props = {
    question: string;
    status: 'correct' | 'wrong' | 'none';
    isArabic: Boolean;
}



export const QuestionBubble = ({question, status, isArabic}: Props) => {

     //const [source,setSource] = useState('/idle.svg');

    
     if(!isArabic){ 

    return (
        <div className=" mt-10 flex items-center justify-center text-center font-Poppins font-bold text-[15px] lg:text-2xl">
 
              {question}       

        </div>
    )
  }

  return (
    
    <div 
  className="mt-10 flex items-center justify-center text-center font-Messiri font-bold text-2xl lg:text-3xl"
  dir='rtl' // Dynamically set the direction
>
  {question}
</div>
    

)



}