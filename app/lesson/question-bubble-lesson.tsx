import Image from "next/image";
import { Challenge } from "./challenge";
import { challenges } from "@/db/schema";

type Props = {
    question: string;
    teacherImage: string;
    status: 'correct' | 'wrong' | 'none';
    isArabic: Boolean;
}



export const QuestionBubbleLesson = ({question, teacherImage, isArabic}: Props) => {


if(!isArabic){ 
    return (
        <div className="flex items-center gap-x-4 mb-6">

         <Image
           src={teacherImage}
           alt='Teacher'
           height={210}
           width={210}
           className="hidden lg:block"
         />

         <Image
           src={teacherImage}
           alt='Teacher'
           height={180}
           width={180}
           className="block lg:hidden"
         />
           <div className="relative py-2 px-4 border-2 rounded-xl font-bold text-sm lg:text-base">
              {question}
              <div
                className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"
              />
           </div>

        </div>
    )
  }



  return (
    <div className=" w-full flex items-center justify-end gap-x-4 mb-6">


<div className="relative py-2 justify-end px-4 border-2 rounded-xl font-bold text-md lg:text-base">

          <p className="text-end">{question}</p>
        
    

          <div
            className="absolute -right-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 -rotate-90"
          />
       </div>

     <Image
       src={teacherImage}
       alt='Teacher'
       height={210}
       width={210}
       className="hidden lg:block scale-x-[-1]"
     />

     <Image
       src={teacherImage}
       alt='Teacher'
       height={180}
       width={180}
       className="block lg:hidden scale-x-[-1]"
     />
      

    </div>
)




}