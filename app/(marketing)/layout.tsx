import { Footer } from "./Footer";
import { Header } from "./Header";

   type Props = {
      children: React.ReactNode;
   }


function layout({children}:Props){
    return(
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex flex-1 flex-col justify-center items-center"> 
               {children}
            </main>
            <Footer/>
        </div>
    )
}

export default layout