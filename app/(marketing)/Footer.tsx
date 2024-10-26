import { Button } from "@/components/ui/button";
import Image from "next/image";


export function Footer(){
     
    return(
        <footer className="hidden lg:block h-20 w-full p-2 border-t-2 border-slate-200 ">
             <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size='lg' variant='ghost' className="w-full">
                    <Image
                     src='/hr.svg'
                     alt="Croation"
                     height={32}
                     width={32}
                     className="mr-4 rounded-md"
                    />
                الجغرافيا
                </Button>

                <Button size='lg' variant='ghost' className="w-full">
                    <Image
                     src='/es.svg'
                     alt="Spanish"
                     height={32}
                     width={32}
                     className="mr-4 rounded-md"
                    />
                اللغة العربية
                </Button>

                <Button size='lg' variant='ghost' className="w-full">
                    <Image
                     src='/fr.svg'
                     alt="French"
                     height={32}
                     width={32}
                     className="mr-4 rounded-md"
                    />
                Francais
                </Button>

                <Button size='lg' variant='ghost' className="w-full">
                    <Image
                     src='/it.svg'
                     alt="Italian"
                     height={32}
                     width={32}
                     className="mr-4 rounded-md"
                    />
                التاريخ
                </Button>

                <Button size='lg' variant='ghost' className="w-full">
                    <Image
                     src='/jp.svg'
                     alt="Japenese"
                     height={32}
                     width={32}
                     className="mr-4 rounded-md"
                    />
                التربية الإسلامية
                </Button>
             </div>
        </footer>
    )

}