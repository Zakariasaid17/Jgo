'use client'

import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { Header } from "./header";
import { useEffect, useState, useTransition } from "react";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti';
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { QuestionBubbleLesson } from "./question-bubble-lesson";
import { Video } from "lucide-react";

import { Lalezar } from "next/font/google";



type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    subscription: typeof userSubscription.$inferSelect & {
        isActive: boolean;
    } | null;
    isArabic: Boolean;
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    subscription,
    isArabic
}: Props) => {

    const {open: openHeartsModal} = useHeartsModal();
    
    const {open: openPracticeModal} = usePracticeModal();

    useMount(()=> {
       if(initialPercentage === 100) {
         openPracticeModal();
       }
    });



    const {width, height} = useWindowSize()

    const router = useRouter();

    const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true});
    
    const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav'});

    const [incorrectAudio, _i, incorrectControls] = useAudio({src: '/incorrect.wav'});

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(()=>{
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

     

    const handleShowResponseClick = () => {
        setShowResponse(true); // Show the response text
        setShowResultClicked(true); // Enable the button in the footer
    };

   

    useEffect(() => {
        console.log("Current status in Quiz:", status);
    }, [status]);

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const [showResponse, setShowResponse] = useState(false);
   const [showResultClicked, setShowResultClicked] = useState(false);
  

    const onNext = () => {
        setActiveIndex((current) => {
            const nextIndex = current + 1;
            console.log("Next activeIndex:", nextIndex);
            return nextIndex;
        });
    };

    const onSelect = (id: number) => {
        if (status !== 'none') return;
        setSelectedOption(id);
    };

    const onContinue = () => {
        console.log("onContinue called, challenge type:", challenge.type);
        if (!selectedOption) return;

        if (status === 'wrong') {
            setStatus('none');
            setSelectedOption(undefined);
            return;
        }

        if (status === 'correct') {
            onNext();
            setStatus('none');
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error === 'hearts') {
                        openHeartsModal();
                        return;
                    }

                    correctControls.play()

                    setStatus('correct');
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        //setHearts((prev) => Math.min(prev + 1, 5));
                    }

                }).catch(() => toast.error('Something went wrong. Please try again'));
            });
        } else {
             startTransition(()=> {
                reduceHearts(challenge.id).then((response)=>{
                    if(response?.error === 'hearts') {
                        openHeartsModal();
                        return;
                    }

                    incorrectControls.play()
                    setStatus('wrong');

                    if(!response?.error) {
                        setHearts((prev)=> Math.max(prev - 1, 0));
                    }
                }).catch(() => toast.error('Something went wrong, Please try again.'))
             })
        }
    };


    

    

    const onLessonContinue = () => {
        startTransition(() => {
            upsertChallengeProgress(challenge.id).then((response) => {
                if (response?.error === 'hearts') {
                    openHeartsModal();
                    return;
                }
    
                setStatus('correct');
                setPercentage((prev) => prev + 100 / challenges.length);
    
                if (initialPercentage === 100) {
                    //setHearts((prev) => Math.min(prev + 1, 5));
                }
    
                setActiveIndex((current) => {
                    const nextIndex = current + 1;
                    return nextIndex;
                });
                setStatus('none');
                setSelectedOption(undefined);
                setShowResponse(false);
                setShowResultClicked(false);
            }).catch(() => toast.error('Something went wrong. Please try again'));
        });
    };

    useEffect(() => {
        console.log("Active Index Changed:", activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        console.log("Hearts Updated:", hearts);
    }, [hearts]);

    useEffect(() => {
        console.log("Percentage Updated:", percentage);
    }, [percentage]);


    if(!challenge){
        return(
            <>
              {finishAudio}
                <Confetti
                   width={width}
                   height={height}
                   recycle={false}
                   numberOfPieces={500}
                   tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image 
                     src='/finish.svg'
                     alt='finish'
                     className="hidden lg-block"
                     height={170}
                     width={170}
                    />

                    <Image 
                     src='/finish.svg'
                     alt='finish'
                     className="block lg-hidden"
                     height={70}
                     width={70}
                    />

                    <h1 className="text-xl lg:text-3xl font-bold font-Poppins text-neutral-700 ">
                    Bon travail ! <br /> Tu as terminé la leçon.
                    </h1>

                    <div className="flex items-center gap-x-4 w-full ">
                       <ResultCard
                        variant='points'
                        value={challenges.length * 10}

                       />

                       {subscription?.isActive? null : <ResultCard
                        variant='hearts'
                        value={hearts}
                       />}
                    </div>
                </div>
                <Footer
                  lessonId={lessonId}
                  status="completed"
                  onCheck={()=> router.push('/learn')}
                 
                />
            </>
        )
    }

    
     const title = challenge.type === 'LESSON' ? challenge.question : challenge.question ;

    console.log("Challenge type:", challenge.type);

    return (
        <>


        {incorrectAudio}
        {correctAudio}
           <Header     
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!subscription?.isActive}
            />
           


           
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[550px] lg:w-[800px] w-full px-6 lg:px-0 flex flex-col gap-y-5">

                    
                           
                    {challenge.type === 'LESSON' && (
                        
                                 
                            
                           
                      <div className="flex-1  mt-20 mb-20 lg:mt-20 lg:mb-20 ">

                       

                          { challenge.isArabic ? <> {challenge.titleChallenge ? <h1 className="text-end font-bold lg:text-6xl text-5xl font-Messiri text-blue-600 mt-10">{challenge.titleChallenge}</h1> : null}

                                {challenge.question !== ' ' ? <div className="mt-[50px]">
                                    <h2 className=" text-end font-bold font-Messiri lg:text-4xl text-3xl text-blue-900">: الشرح النصي</h2>

                                    <p className="text-end mt-[20px] font-bold font-Messiri text-xl lg:text-2xl">{challenge.question}</p>

                                    {challenge.sousQuestion ? <h3 className="text-end mt-[40px] font-bold font-Messiri text-2xl lg:text-3xl">{challenge.sousQuestion}</h3> : null}

                                    {challenge.one ?<div className="mt-7">
                                        {challenge.one ? <p className="font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.one}</p> : null}
                                        {challenge.two ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.two}</p> : null}
                                        {challenge.three ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.three}</p> : null}
                                        {challenge.four ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.four}</p> : null}
                                        {challenge.five ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.five}</p> : null}
                                        {challenge.six ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.six}</p> : null}

                                    </div> : null}

                                    {challenge.sousQuestionTwo ? <h3 className="text-end mt-[40px] font-bold font-Messiri text-2xl lg:text-3xl">{challenge.sousQuestionTwo}</h3> : null}

                                    {challenge.one2 ?<div className="mt-7">
                                        {challenge.one2 ? <p className="font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.one2}</p> : null}
                                        {challenge.two2 ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.two2}</p> : null}
                                        {challenge.three2 ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.three2}</p> : null}
                                        {challenge.four2 ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.four2}</p> : null}
                                        {challenge.five2 ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.five2}</p> : null}
                                        {challenge.six2 ? <p className="mt-[15px] font-Messiri font-bold lg:text-xl text-end text-xl ">{challenge.six2}</p> : null}

                                    </div> : null}


                                    
                                  </div> : null}

                                  { challenge.example ? <div className="mt-[50px] bg-blue-500 p-5 rounded-xl">
                                  <h2 className="text-end mb-5 font-bold font-Messiri lg:text-4xl text-3xl text-white">: مثال</h2>

                                  {challenge.aiImage ? <Image className="m-auto mt-[20px] rounded-xl"
                                         src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.aiImage}`}
                                         alt="image"
                                         height={220}
                                         width={420}
                                         /> : null}

                                  <p className="text-center mt-[20px] font-bold font-Messiri lg:text-3xl text-xl text-white">{challenge.example}</p>

                                  { challenge.sousExemple ? <p className="mt-[20px] font-bold font-Messiri lg:text-xl text-xl text-white">{challenge.sousExemple}</p> : null}

                                    {challenge.a ?<div className="mt-7">
                                        {challenge.a ? <p className="text-end font-Messiri font-bold text-xl text-white lg:text-2xl ">{challenge.a}</p> : null}
                                        {challenge.b ? <p className="text-end mt-[25px] font-Messiri text-xl text-white font-bold lg:text-2xl ">{challenge.b}</p> : null}
                                        {challenge.c ? <p className="text-end mt-[25px] font-Messiri text-white font-bold lg:text-2xl ">{challenge.c}</p> : null}
                                        {challenge.d ? <p className="text-end mt-[25px] font-Messiri text-white font-bold lg:text-2xl ">{challenge.d}</p> : null}
                                        {challenge.e ? <p className="text-end mt-[25px] font-Messiri text-white font-bold lg:text-2xl ">{challenge.e}</p> : null}
                                        {challenge.f ? <p className="text-end mt-[25px] font-Messiri text-white font-bold lg:text-2xl ">{challenge.f}</p> : null}

                                    </div> : null}

                                    <p className="mt-[40px] font-bold font-Messiri lg:text-2xl text-xl text-white">{challenge.example2}</p>

                                  { challenge.sousExemple2 ? <p className="mt-[20px] font-bold font-Messiri lg:text-xl text-xl text-white">{challenge.sousExemple2}</p> : null}

                                    {challenge.a2 ?<div className="mt-7">
                                        {challenge.a2 ? <p className="font-Messiri font-bold text-white lg:text-xl ">{challenge.a2}</p> : null}
                                        {challenge.b2 ? <p className="mt-[10px] font-Messiri text-white font-bold lg:text-xl ">{challenge.b2}</p> : null}
                                        {challenge.c2 ? <p className="mt-[10px] font-Messiri text-white font-bold lg:text-xl ">{challenge.c2}</p> : null}
                                        {challenge.d2 ? <p className="mt-[10px] font-Messiri text-white font-bold lg:text-xl ">{challenge.d2}</p> : null}
                                        {challenge.e2 ? <p className="mt-[10px] font-Messiri text-white font-bold lg:text-xl ">{challenge.e2}</p> : null}
                                        {challenge.f2 ? <p className="mt-[10px] font-Messiri text-white font-bold lg:text-xl ">{challenge.f2}</p> : null}

                                    </div> : null}

                                    


                                  </div> : null}






                                  {challenge.exempleImage ? <div className="mt-[50px]">
                                  
                                  

                                  <Image className="mt-[20px] rounded-xl"
                                         src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.exempleImage}`}
                                         alt="image"
                                         height={120}
                                         width={980}
                                         />

                                  </div> : null}


                                  {challenge.exempleImage2 ? <div className="mt-[10px]">
                                  
                                  

                                  <Image className="mt-[20px] rounded-xl"
                                         src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.exempleImage2}`}
                                         alt="image"
                                         height={120}
                                         width={980}
                                         />

                                  </div> : null}



                                  {challenge.video ? <div className="mt-[50px]">
                                  <h2 className="mb-5 font-bold font-Messiri lg:text-3xl text-2xl text-blue-900">Vidéo Explicative:</h2>

                                  <video className="mt-[20px] rounded-xl"
                                         src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.video}`}
                                         controls
                                         controlsList="nodownload"
                                         onContextMenu={(e) => e.preventDefault()}
                                         />

                                  </div> : null}





                                  { challenge.aretenir ? <div className="mt-[50px] bg-blue-500 p-5 rounded-xl">
                                  <h2 className="text-end font-bold font-Messiri lg:text-4xl text-3xl text-white">: أهم النقاط</h2>

                                  {challenge.aretenir !== ' ' ?<p className="mt-[10px] font-bold font-Messiri text-md lg:text-xl text-white">{challenge.aretenir}</p> : null}

                                  { challenge.retenirA ? <div className="mt-5">
                                        {challenge.retenirA ? <p className="text-end font-Messiri font-bold text-white lg:text-2xl text-xl ">{challenge.retenirA}</p> : null}
                                        {challenge.retenirB ? <p className="mt-5 text-end font-Messiri font-bold text-white lg:text-2xl text-xl ">{challenge.retenirB}</p> : null}
                                        {challenge.retenirC ? <p className="mt-5 text-end font-Messiri font-bold text-white lg:text-2xl text-xl ">{challenge.retenirC}</p> : null}
                                        {challenge.retenirD ? <p className="mt-5 text-end font-Messiri font-bold text-white lg:text-2xl text-xl ">{challenge.retenirD}</p> : null}
                                  </div> : null}
                                  </div> : null}   


                                  </> : <> {challenge.titleChallenge ? <h1 className="text-start font-bold lg:text-6xl text-4xl font-Poppins text-blue-600 mt-10">{challenge.titleChallenge}</h1> : null}

                                {challenge.question !== ' ' ? <div className="mt-[50px]">
                                      <h2 className="font-bold font-Poppins lg:text-3xl text-2xl text-blue-900">Explication:</h2>

                                      <p className=" mt-[20px] font-bold font-Poppins text-[18px] lg:text-xl">{challenge.question}</p>

                                {challenge.one ?<div className="mt-7">
                                      {challenge.one ? <p className="font-Poppins text-lg ">{challenge.one}</p> : null}
                                      {challenge.two ? <p className="mt-[10px] font-Poppins text-lg ">{challenge.two}</p> : null}
                                      {challenge.three ? <p className="mt-[10px] font-Poppins text-lg ">{challenge.three}</p> : null}
                                      {challenge.four ? <p className="mt-[10px] font-Poppins text-lg ">{challenge.four}</p> : null}
                                      {challenge.five ? <p className="mt-[10px] font-Poppins text-lg ">{challenge.five}</p> : null}
                                      {challenge.six ? <p className="mt-[10px] font-Poppins text-lg ">{challenge.six}</p> : null}

                                </div> : null}


    
                                 </div> : null}

                             { challenge.example ? <div className="mt-[50px] bg-blue-500 p-5 rounded-xl">
                                        <h2 className="mb-5 font-bold font-Poppins lg:text-3xl text-2xl text-white">Exemples:</h2>

                             {challenge.aiImage ? <Image className="m-auto mt-[20px] rounded-xl"
                                     src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.aiImage}`}
                                     alt="image"
                                     height={220}
                                     width={420}
                             /> : null}

                         <p className="mt-[20px] font-bold font-Poppins lg:text-2xl text-xl text-white">{challenge.example}</p>

                             { challenge.sousExemple ? <p className="mt-[20px] font-bold font-Poppins lg:text-xl text-xl text-white">{challenge.sousExemple}</p> : null}

                             {challenge.a ?<div className="mt-7">
                                 {challenge.a ? <p className="font-Poppins text-white lg:text-xl ">{challenge.a}</p> : null}
                                 {challenge.b ? <p className="mt-[10px] font-Poppins text-white lg:text-xl ">{challenge.b}</p> : null}
                                 {challenge.c ? <p className="mt-[10px] font-Poppins text-white lg:text-xl ">{challenge.c}</p> : null}
                                 {challenge.d ? <p className="mt-[10px] font-Poppins text-white lg:text-xl ">{challenge.d}</p> : null}
                                 {challenge.e ? <p className="mt-[10px] font-Poppins text-white lg:text-xl ">{challenge.e}</p> : null}
                                 {challenge.f ? <p className="mt-[10px] font-Poppins text-white lg:text-xl ">{challenge.f}</p> : null}

                             </div> : null}

                        <p className="mt-[40px] font-bold font-Poppins lg:text-2xl text-xl text-white">{challenge.example2}</p>

                             { challenge.sousExemple2 ? <p className="mt-[20px] font-bold font-Poppins lg:text-xl text-xl text-white">{challenge.sousExemple2}</p> : null}

                             {challenge.a2 ?<div className="mt-7">
                                {challenge.a2 ? <p className="font-Poppins font-bold text-white lg:text-xl ">{challenge.a2}</p> : null}
                                {challenge.b2 ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.b2}</p> : null}
                                {challenge.c2 ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.c2}</p> : null}
                                {challenge.d2 ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.d2}</p> : null}
                                {challenge.e2 ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.e2}</p> : null}
                                {challenge.f2 ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.f2}</p> : null}

                            </div> : null}

    


                             </div> : null}


                            {challenge.exempleImage ? <div className="mt-[50px]">
  

                             <Image className="mt-[20px] rounded-xl"
                                  src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.exempleImage}`}
                                  alt="image"
                                  height={120}
                                  width={980}
                             />

                            </div> : null}



                          {challenge.video ? <div className="mt-[50px]">
                                <h2 className="mb-5 font-bold font-Poppins lg:text-3xl text-2xl text-blue-900">Vidéo Explicative:</h2>

                                <video className="mt-[20px] rounded-xl"
                                   src={`https://jihawigocom.s3.eu-west-3.amazonaws.com/${challenge.video}`}
                                   controls
                                   controlsList="nodownload"
                                   onContextMenu={(e) => e.preventDefault()}
                                />

                             </div> : null}





                      { challenge.aretenir ? <div className="mt-[50px] bg-blue-500 p-5 rounded-xl">
                                <h2 className=" font-bold font-Poppins lg:text-3xl text-2xl text-white">A retenir :</h2>

                        {challenge.aretenir !== ' ' ?<p className="mt-[10px] font-bold font-Poppins text-md lg:text-xl text-white">{challenge.aretenir}</p> : null}

                            { challenge.retenirA ? <div className="mt-5">
                                {challenge.retenirA ? <p className="font-Poppins font-bold text-white lg:text-xl ">{challenge.retenirA}</p> : null}
                                {challenge.retenirB ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.retenirB}</p> : null}
                                {challenge.retenirC ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.retenirC}</p> : null}
                                {challenge.retenirD ? <p className="mt-[10px] font-Poppins text-white font-bold lg:text-xl ">{challenge.retenirD}</p> : null}
                            </div> : null}
                        </div> : null}   


                      </> }

                               


                                                             
                    </div>)} 


                    <div>
                {challenge.type === 'SELECT' && (
                    <div className="mb-20"> 
                        <div className="flex flex-col justify-center items-center">
                            {challenge.isArabic ? (
                                <h1 className="font-bold font-Messiri text-4xl lg:text-4xl text-red-600 lg:mt-10">test</h1>
                            ) : (
                                <h1 className="font-extrabold font-Poppins text-xl lg:text-2xl text-red-600 lg:mt-10">{challenge.note}</h1>
                            )}

                            <div className="mt-10 flex items-center bg-blue-500 p-2 text-white justify-center text-center font-Poppins font-bold text-[14px] lg:text-2xl">
                                {challenge.question}
                               

                            </div>


                            {challenge.one ? 
                                <div className="flex flex-col justify-center mt-[20px]">
                                     <p className="text-[12px] lg:text-[16px] font-Poppins font-semibold">{challenge.one}</p>
                                     <p className="text-[10px] lg:text-[12px] font-Poppins font-extrabold text-start mt-[8px]">{challenge.two}</p>
                                </div>
                            : null}

                            
                            {/* Conditional rendering for response */}
                            <div className="mt-10 flex items-center justify-center text-center font-Poppins font-bold text-[14px] lg:text-2xl">
                                {showResponse ? (
                                    <span>{challenge.sousQuestion}</span> // Text to show after button click
                                ) : (
                                    <span>______________</span> // Text to show when the response is hidden
                                )}
                            </div>

                            <div className="mt-10 flex items-center justify-center text-center font-Poppins font-bold text-xl lg:text-2xl">
                                {!showResponse && ( // Show the button only if the response is hidden
                                    <button onClick={handleShowResponseClick} className="bg-green-500 text-white p-2 rounded">
                                        Afficher la réponse
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>


                            
                            
                        
                 
                <div >  
                <>
                {challenge.type === 'ASSIST' && (
                                <div className="mb-[45px]"> 
                                <div className="flex justify-center">           
                                {challenge.isArabic ?<h1 className="font-bold font-Messiri text-4xl lg:text-4xl text-red-600  lg:mt-10">{challenge.note}</h1> : <h1 className=" font-extrabold font-Poppins text-3xl lg:text-4xl text-red-600  lg:mt-10">{challenge.note}</h1>}
                                </div>
                                < QuestionBubble  question={title}  status={status} isArabic={isArabic} />                                         
                                </div>
                )}</>

                                 
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={challenge.type}
                                isArabic={isArabic}
                                
                            />

                  </div>
                        
                </div>
                                   
                </div>
            </div>

            
            
            <Footer
    disabled={
        challenge.type === 'LESSON' 
            ? pending 
            : challenge.type === 'SELECT'
                ? !showResultClicked
                : pending || !selectedOption
    }
    status={
        challenge.type === 'LESSON'
            ? 'LESSON'
            : challenge.type === 'SELECT'
                ? showResultClicked ? 'SELECT' : 'none'
                : status
    }
    onCheck={
        challenge.type === 'LESSON' || challenge.type === 'SELECT'
            ? onLessonContinue
            : onContinue
    }
    lessonId={lessonId}
/>
        </>
    );
};
