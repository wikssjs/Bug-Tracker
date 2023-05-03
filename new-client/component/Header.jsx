import styles from '../styles/Header.module.css'
import Link from 'next/link';
import Image from 'next/image';
import bug from '../public/bug.png'
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import AccountMenu from './AccountMenu';
import { useCurrentUser } from '../component/CurrentUserContext';




export default function Header() {

  const { currentUser } = useCurrentUser();
  useEffect(() => {
  }, [currentUser])


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
                currentUser && currentUser.username ?
                  <Link className={`${styles.nav_link} nav-link`} href="/">
                    Dashboard
                  </Link>
                  : ""
              }
            </li>
            <li className="nav-item">
              {
                currentUser && currentUser.username ?
                  <Link className={`${styles.nav_link} nav-link`} href="/tickets">
                    Tickets
                  </Link>
                  : ""

              }
            </li>
            <li className="nav-item">
              {!currentUser && !currentUser ? (
                <Link className={`${styles.nav_link} nav-link`} href="/connexion">
                  Connexion
                </Link>
              )
                : ""
              }
            </li>

            {
              currentUser && currentUser.username ? 
              <li><Link
                className={`${styles.nav_link} nav-link`}
                href="/admin">Admin</Link>
              </li>
                : ""
            }
            {currentUser && currentUser.username ?
              <li>
                <AccountMenu />
              </li>
              : ""
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};

