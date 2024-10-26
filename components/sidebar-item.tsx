'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


type Props ={
    label: string,
    iconsSource: string,
    href: string;
}

export function SidebarItem({label,iconsSource,href}:Props){
    const pathname = usePathname();
    const active = pathname === href;
    return(
        <Button variant={active ? 'sidbarOutline' : 'sidebar'} className="justify-start h-[52px]" asChild>
          <Link href={href}>
              <Image 
               src={iconsSource}
               alt={label}
               className="mr-5"
               height={32}
               width={32}
              />

              {label} 
          </Link> 
        </Button>
    )
}