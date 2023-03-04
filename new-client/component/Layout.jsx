import Footer from "./Footer"
import Header from "./Header"
export default function Layout({children,setPage}){
    return <>
    <Header setPage={setPage}/>
    
        
    {children}


    <Footer/>
    
    
    </>
}