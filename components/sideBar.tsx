import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { SidebarItem } from "./sidebar-item"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"

type Props = {
   
    className?: string
}


export function SideBar({className}:Props){
    

    return(
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",className)}>
          
        <Link href='/learn'>
           <div className='pt-8 pl-4 pb-7 flex items-center gap-3'>
               <Image src={'/mini-logo.webp'} width={50} height={50} alt='iam'/>
               <h1 className='text-2xl font-extrabold text-blue-500 tracking-wide'>JihawiGo</h1>
           </div>
        </Link>

        <div className="flex flex-col gap-y-2 flex-1">
            <SidebarItem 
            iconsSource="/learn.svg"
            label="Learn" 
            href="/learn"/>

            <SidebarItem 
            iconsSource="/leaderboard.svg"
            label="Leaderboard" 
            href="/leaderboard"/>

            <SidebarItem 
            iconsSource="/quests.svg"
            label="Quests" 
            href="/quests"/>

            <SidebarItem 
            iconsSource="/shop.svg"
            label="Premium" 
            href="/shop"/>
        </div>

        <div className="p-4">
           <ClerkLoading>
               <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
           </ClerkLoading>
           <ClerkLoaded>
                <UserButton/>
           </ClerkLoaded>
        </div>

        </div>
    )
}