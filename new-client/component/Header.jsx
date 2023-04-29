import Link from 'next/link';
import styles from '../styles/Header.module.css'
import Image from 'next/image';
import bug from '../public/bug.png'
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import AccountMenu from './AccountMenu';




export default function Header({ user }) {

  const [headers, setHeaders] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(user);
  }, [user])





  return (
    <header className=''>
      <nav className={`${styles.navbar} navbar navbar-expand-lg`}>
        <Link className={` ${styles.navbar_brand} navbar-brand`} href="/">
          <Image className={styles.img} src={bug} width="60" height="60" alt="Logo du site web" />
          BugTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`${styles.navbar_nav} navbar-nav ml-auto mr-5 align-items-center`}>
            <li className="nav-item active">
              {
                currentUser ?
                  <Link className={`${styles.nav_link} nav-link`} href="/">
                    Dashboard
                  </Link>
                  : ""
              }
            </li>
            <li className="nav-item">
              {
                currentUser ?
                  <Link className={`${styles.nav_link} nav-link`} href="/tickets">
                    Tickets
                  </Link>
                  : ""

              }
            </li>
            <li className="nav-item">
              {!currentUser ? (
                <Link className={`${styles.nav_link} nav-link`} href="/connexion">
                  Connexion
                </Link>
              )
                : ""
              }
            </li>

            {
              currentUser ?
              <li><Link
              className={`${styles.nav_link} nav-link`}
              href="/admin">Admin</Link>
            </li>
            :""
          }
          {currentUser ?
            <li>
              {/* <form
                onSubmit={handleLogout}>
                <button className={`${styles.logOut} btn btn-danger`}
                  type='submit'><i class="bi bi-box-arrow-right"></i>
                  LogOut
                </button>
              </form> */}

              <AccountMenu set/>
            </li>
            : ""
          }
          </ul>
        </div>
      </nav>
    </header>
  );
};

