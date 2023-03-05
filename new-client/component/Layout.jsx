import Sidebar from "./Sidebar";
import styles from "../styles/Layout.module.css";

export default function Layout({children,setPage}){
    return <>    
      <div className={`${styles.layout} container-fluid`}>

      <div className="row h-100">
    <Sidebar/>  

    {children}
      </div>
      </div>


    
    
    </>
}