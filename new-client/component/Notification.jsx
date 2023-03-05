import styles from '../styles/Notification.module.css'
import { useEffect, useState } from 'react';

export default function Notification({name,show}) {
    const [notification, setNotification] = useState(true)
    
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
           setNotification(false);
         }, 3000);
     return () => clearInterval(timeoutId);
       }, [notification]);


    return (
        notification && (
        <div className={`${styles.notification} shadow-lg animate__animated animate__fadeInRight`}>
            <p>The project {name} has been created</p>
        </div>
        )
    )
}