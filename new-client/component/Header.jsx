import Link from 'next/link';
import styles from '../styles/Header.module.css'
import Image from 'next/image';
import flag from '../public/haiti.png'


export default function Header() {
    return (
        <header>
        <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-light`}>
          <Link className={` ${styles.navbar_brand} navbar-brand`} href="/">
            <Image className={styles.img} src={flag} width="60" height="60" alt="Drapeau d'Haïti" />
            Haïti
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
            <ul className={`${styles.navbar_nav} navbar-nav ml-auto`}>
              <li className="nav-item active">
                <Link className={`${styles.nav_link} nav-link`} href="/tourisme">
                  Tourisme
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`${styles.nav_link} nav-link`} href="/affaire">
                  Affaires
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`${styles.nav_link} nav-link`} href="/gastronomie">
                  Gastronomie
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`${styles.nav_link} nav-link`} href="/culture">
                  Culture
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
};

