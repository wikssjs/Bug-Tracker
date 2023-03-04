import Image from 'next/image';
import styles from '../styles/Tourisme.module.css'
import plage from '../public/plage.jpg'
import chute from '../public/chute.jpg'
import patrimoine from '../public/patrimoine.jpg'
import ville from '../public/ville.webp'


export default function Tourisme() {
    return (
        <main>
            <div className={`${styles.jumbotron} jumbotron jumbotron-fluid animate__animated animate__fadeIn`}>
                <div className="container">
                    <h1 className="display-4">Tourisme en Haïti</h1>
                    <p className="lead animate__animated animate__fadeInUp">Découvrez les merveilles de notre pays.</p>
                </div>
            </div>
            <div className={`${styles.container} container`}>
                <div className="row animate__animated animate__fadeInLeft">
                    <div className="col-md-6">
                        <h2>Plages de sable blanc</h2>
                        <Image className={styles.img} src={plage} width={600} height={320} alt="Plage de sable blanc" />
                        <p>Découvrez les plus belles plages de sable blanc du monde. Relaxez-vous sur nos plages ensoleillées, nagez dans nos eaux cristallines et explorez nos récifs coralliens. Que vous cherchiez des vacances relaxantes ou des aventures nautiques, nous avons quelque chose pour tous les goûts.</p>
                    </div>
                    <div className="col-md-6 animate__animated animate__fadeInRight">
                        <h2>Chutes d'eau spectaculaires</h2>
                        <Image className={styles.img} src={chute} width={600} height={320} alt="Chutes d'eau spectaculaires" />
                        <p>Découvrez nos chutes d'eau spectaculaires. Plongez dans nos bassins naturels, escaladez nos cascades, et profitez de vues imprenables sur la nature environnante. Que vous soyez un amateur de sensations fortes ou un simple admirateur de la beauté naturelle, nous avons quelque chose pour tous les goûts.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 animate__animated animate__fadeInLeft">
                        <h2>Patrimoine culturel</h2>
                        <Image className={styles.img} src={patrimoine} width={600} height={320} alt="Patrimoine culturel" />
                        <p>Découvrez notre riche patrimoine culturel. Visitez nos musées, assistez à nos festivals et goûtez à notre délicieuse cuisine locale. Que vous soyez un passionné d'histoire ou un amateur de gastronomie, nous avons quelque chose pour tous les goûts.</p>
                    </div>
                    <div className="col-md-6 animate__animated animate__fadeInRight">
                        <h2>Villes historiques</h2>
                        <Image className={styles.img} src={ville} width={600} height={320} alt="Villes historiques" />
                        <p>Découvrez nos villes historiques. Flânez dans nos rues pavées, visitez nos monuments historiques et découvrez notre architecture coloniale. Que vous cherchiez à en apprendre davantage sur notre histoire ou à admirer notre patrimoine architectural, nous avons quelque chose pour tous les goûts.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}