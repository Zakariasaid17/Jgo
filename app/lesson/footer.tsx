import { useKey, useMedia} from 'react-use';
import {CheckCircle, XCircle} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { challengeOptions } from '@/db/schema';
import { Challenge } from './challenge';


type Props = {

    onCheck: () => void;
    status: 'correct' | 'wrong' | 'none' | 'completed' | 'LESSON';
    disabled?: boolean;
    lessonId?: number ;


};

export const Footer = ({onCheck, status, disabled, lessonId}: Props) => {
  console.log("Footer rendered with status:", status);

    useKey('Enter', onCheck, {}, [onCheck])
    const isMobile = useMedia('(max-width: 1024px)')

    return(
        <footer className={cn(' fixed bottom-0 w-full lg:h-[80px] h-[80px] ',
            status === 'correct' && 'border-transparent bg-green-100',
            status === 'wrong' && 'border-transparent bg-rose-100',
            status === 'LESSON' && 'border-transparent bg-blue-100'
        )}>
          <div className='max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10'>
               
              {status === 'LESSON' && (
                <div className='text-blue-500 font-bold text-base lg:text-xl flex items-center'>
                    Lesson in progress
                 </div>
              )}   

               {status === 'correct' && (
                <div className='text-green-500 font-bold text-base lg:text-2xl flex items-center'>
                  <CheckCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4'/>
                  Nicely Done!
                </div>
               )}

               {status === 'wrong' && (
                <div className='text-rose-500 font-bold text-base lg:text-2xl flex items-center'>
                  <XCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4'/>
                  Try Again!
                </div>
               )}

               {status === 'completed' && (
                <Button variant='default' size={isMobile ? 'sm' : 'lg'}
                onClick={()=> window.location.href = `/lesson/${lessonId}`}>
                  Practice Again
                </Button>
               )}

              
               <Button
               disabled={disabled} 
                 className='ml-auto'
                 onClick={onCheck}
                 size={isMobile ? 'sm' : 'lg'}
                 variant={status === 'wrong' ? 'danger' : 'secondary'}
               >
                  {status === 'none' && 'Check'}
                  {status === 'correct' && 'Next'}
                  {status === 'wrong' && 'Retry'}
                  {status === 'completed' && 'Continue'}
                  {status === 'LESSON' && 'Continue'}
               </Button>
          </div>
        </footer>
    )

}