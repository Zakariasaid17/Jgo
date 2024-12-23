import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SideBar } from "./sideBar";



export function MobileSidebar(){
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side='left'>
                <SideBar/>
            </SheetContent>
        </Sheet>
    )
}