import styles from '../styles/Notification.module.css'
import { useEffect, useState,useRef } from 'react';

export default function Notification({notification,setNotification}) {
    
    const notificationRef = useRef(null);
    
    useEffect(() => {
        const wait = setTimeout(() => {
            if (notificationRef.current)
            {
                notificationRef.current.classList.remove('animate__fadeInRight');
                notificationRef.current.classList.add('animate__fadeOutRight');
            }
        }, 2500);
        const timeoutId = setTimeout(() => {
           setNotification(false);
         }, 3500);
     return () => {
         clearTimeout(timeoutId);
            clearTimeout(wait);
     }
       }, [notification.show&& notificationRef.current]);


    return (
        notification.show && (
        <div ref={notificationRef} className={`${styles.notification} d-flex justify-content-center align-items-center shadow-lg animate__animated animate__fadeInRight`}>
            <p>The project <span className='text-info'> {notification.name} </span> {notification.message} SuccessFully</p>
        </div>
        )
    )
}