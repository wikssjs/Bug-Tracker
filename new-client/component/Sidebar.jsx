import Link from 'next/link';
import styles from '../styles/Sidebar.module.css'


export default function Sidebar() {
    const handleLogout = async (event) => {



        event.preventDefault();
        setIsLoggingOut(true);
        try {
          await fetch('https://james-bug-api.herokuapp.com/user/logout', { method: 'POST' });
          window.location.href = '192.168.0.26:3000/connexion';
        } catch (error) {
          console.error(error);
        }
      };


    return (
        <div className={`${styles.sidebar} col-sm-2 bg- text-center`}>
            <h5 className='text-warning mt-3'>In Development ...</h5>
            <h3 className="text-white mt-4 mb-4">Bug Tracker</h3>
            <ul className={`${styles.nav_menu} d-flex flex-column gap-5 text-start`}>
                <li><Link href="/" className="text-white"><i className='bi bi-laptop'></i> DashBoard</Link></li>
                <li><Link href="/tickets" className="text-white"> <i className='bi bi-ticket'></i> Tickets</Link></li>
                <li><Link href="/admin" className="text-white"> <i className='bi bi-person-badge-fill'></i> Administration</Link></li>
                <li><Link href="/connexion" className="text-white"> <i className='bi bi-person-badge-fill'></i> Connexion</Link></li>
                <li>
                    <form
                        onSubmit={handleLogout}>
                        <button className={`${styles.logOut} btn btn-danger`}
                            type='submit'><i class="bi bi-box-arrow-right"></i> 
                            LogOut
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
}