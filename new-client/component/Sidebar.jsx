import Link from 'next/link';
import styles from '../styles/Sidebar.module.css'

export default function Sidebar() {
    return (
        <div className={`${styles.sidebar} col-sm-2 bg-primary text-center shadow-lg`}>
            <h3 className="text-white mt-4 mb-4">Bug Tracker</h3>
            <ul className={`${styles.nav_menu} d-flex flex-column gap-5 text-start`}>
                <li><Link href="/" className="text-white"><i className='bi bi-laptop'></i> DashBoard</Link></li>
                <li><Link href="/tickets" className="text-white"> <i className='bi bi-ticket'></i> Tickets</Link></li>
                <li><Link href="/admin" className="text-white"> <i className='bi bi-person-badge-fill'></i> Administration</Link></li>
            </ul>
        </div>
    );
}