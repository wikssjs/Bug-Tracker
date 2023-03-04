import Link from 'next/link';
import styles from '../styles/Accueil.module.css'

export default function Main() {
  return (
      <main>
        <div className={`${styles.jumbotron} jumbotron jumbotron-fluid animate__animated animate__fadeIn`}>
          <div className={`${styles.container} container`}>
            <h1 className="display-4">Bienvenue en Haïti</h1>
            <p className="lead animate__animated animate__fadeInUp">
              Découvrez notre riche culture, notre cuisine délicieuse et notre
              hospitalité chaleureuse.
            </p>
          </div>
        </div>
        <div className={`${styles.container} container`}>
          <div className="row">
            <div className="col-md-6 animate__animated animate__fadeInLeft">
              <h2>Tourisme</h2>
              <p>
                Haïti est une destination touristique unique avec une variété
                d&apos;attractions naturelles et culturelles. Découvrez nos plages de
                sable blanc, nos montagnes verdoyantes et nos sites historiques.
                Nous avons quelque chose pour tous les goûts.
              </p>
              <Link href="/tourisme" className="btn btn-secondary animate__animated animate__fadeInUp">
                En savoir plus
              </Link>
            </div>
            <div className="col-md-6 animate__animated animate__fadeInRight">
              <h2>Affaires</h2>
              <p>
                Haïti est un endroit idéal pour les investissements et les
                opportunités commerciales. Découvrez les secteurs clés de notre
                économie et les raisons pour lesquelles de plus en plus
                d&apos;entreprises choisissent de faire des affaires avec nous.
              </p>
              <Link href="/affaire" className="btn btn-secondary animate__animated animate__fadeInUp">
                En savoir plus
              </Link>
            </div>
          </div>
          <div className='row mt-5'>
            <div className="col-md-6 animate__animated animate__fadeInLeft">
              <h2>Gastronomie</h2>
              <p>
                Découvrez la riche cuisine haïtienne, avec ses saveurs uniques et
                ses influences africaines et créoles. De nos plats traditionnels
                comme le griot et le riz collé, à nos fruits tropicaux et notre
                café de haute qualité, vous allez adorer notre nourriture.
              </p>
              <Link href="/gastronomie" className="btn btn-secondary animate__animated animate__fadeInUp">
                En savoir plus
              </Link>
            </div>

            <div className="col-md-6 animate__animated animate__fadeInRight">
              <h2>Culture</h2>
              <p>
                Découvrez la culture riche et vibrante d&apos;Haïti, avec ses danses,
                ses chants, ses histoires et ses croyances. Explorez notre art,
                notre musique, nos fêtes et nos traditions, et plongez dans un
                monde de couleurs, de rythmes et de joie de vivre.
              </p>
              <Link href="/culture" className="btn btn-secondary animate__animated animate__fadeInUp">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
    
}
