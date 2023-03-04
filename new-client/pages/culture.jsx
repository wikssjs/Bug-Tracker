import styles from '../styles/Gastronomie.module.css'
import Image from 'next/image'
import art from '../public/art.jpg'
import musique from '../public/musique.jpg'
import fete from '../public/fete.jpg'


export default function Culture() {
    return <main>
        <div class={`${styles.jumbotron} jumbotron jumbotron-fluid animate__animated animate__fadeIn`}>
            <div class={`${styles.container} container`}>
                <h1 class="display-4">Culture</h1>
                <p class="lead animate__animated animate__fadeInUp">Découvrez la culture riche et vibrante d&apos;Haïti, avec ses danses, ses chants, ses histoires et ses croyances. Explorez notre art, notre musique, nos fêtes et nos traditions, et plongez dans un monde de couleurs, de rythmes et de joie de vivre.</p>
            </div>
        </div>
        <div class={`${styles.container} container`}>
            <h2>Art</h2>
            <div class="row">
                <div class="col-md-6">
                    <Image className={styles.img} src={art} alt="Haitian Artwork" />
                </div>
                <div class="col-md-6">
                    <p>Haïti est célèbre pour son art unique et coloré. Les peintures, les sculptures et les artisanats traditionnels sont souvent inspirés par la nature, la religion et l&apos;histoire haïtiennes. Les artistes haïtiens sont connus pour leur sens aigu de l&apos;esthétique, leur maîtrise des couleurs et des textures, et leur capacité à raconter des histoires à travers leur art.</p>
                </div>
            </div>
            <h2>Musique</h2>
            <div class="row">
                <div class="col-md-6">
                    <p>La musique est une partie intégrante de la culture haïtienne. Les rythmes de la musique haïtienne sont souvent entraînants et joyeux, combinant des instruments comme le tambour, le saxophone et la trompette. Les genres musicaux populaires incluent le kompa, le zouk, la rara et le mizik rasin.</p>
                </div>
                <div class="col-md-6">
                    <Image className={styles.img} src={musique} alt="Haitian Musician" />
                </div>
            </div>

            <h2>Fêtes et Traditions</h2>
            <div class="row">
                <div class="col-md-6">
                    <Image className={styles.img} src={fete} alt="Haitian Carnival" />
                </div>
                <div class="col-md-6">
                    <p>Les fêtes et les traditions sont très importantes en Haïti. Le Carnaval, qui se déroule chaque année avant le début du Carême, est l&apos;une des célébrations les plus connues du pays. Les traditions religieuses, comme le vodou, sont également très présentes en Haïti, avec des cérémonies et des rituels qui célèbrent les ancêtres, les esprits et les divinités.</p>
                </div>
            </div>
        </div>
    </main>
}