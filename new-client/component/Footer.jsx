import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Site officiel d&apos;Haïti</h3>
            <p>© James Bell 2023, tous droits réservés.</p>
          </div>
          <div className="col-md-6">
            <h3>Contactez-nous</h3>
            <p>
              <i className={`fas fa-map-marker-alt ${styles.icon}`}></i> Adresse: 123 Rue de la Liberté, Port-au-Prince, Haïti
            </p>
            <p>
              <i className={`fas fa-phone ${styles.icon}`}></i> Téléphone: +509 1234 5678
            </p>
            <p>
              <i className={`fas fa-envelope ${styles.icon}`}></i> Email: info@haiti.com
            </p>
            <div className={styles.socialIcons}>
              <a href="#">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
