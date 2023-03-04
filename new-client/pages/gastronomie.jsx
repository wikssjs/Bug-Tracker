import styles from '../styles/Gastronomie.module.css'
import Image from 'next/image'
import griot from '../public/griot.jpg'
import tassot from '../public/tassot.jpg'
import diri from '../public/diri.jpg'
import pen_patat from '../public/pen_patat.jpg'
import soup_joumou from '../public/soup_joumou.jpg'
import sos_pwa  from '../public/sos_pwa.jpg'

export default function Gastronomie() {

    return <main>
        <div class={`${styles.jumbotron} jumbotron jumbotron-fluid animate__animated animate__fadeIn`}>
            <div class={`${styles.container} container`}>
                <h1 class="display-4">Gastronomie d'Haïti</h1>
                <p class="lead animate__animated animate__fadeInUp">Découvrez la richesse culinaire d'Haïti à travers  de ses plats traditionnels.</p>
            </div>
        </div>
        <div class={`${styles.container} container`}>
            <div class="row">
                <div class="col-lg-6 animate__animated animate__fadeInLeft">
                    <div class="card mb-4 shadow-sm">
                        <Image className={styles.img} src={soup_joumou} alt="Soup joumou" class="card-img-top" />
                        <div class="card-body">
                            <h4 class="card-title">Soup joumou</h4>
                            <p class="card-text">La soupe joumou est une soupe haïtienne traditionnelle préparée à partir de courge, de viande, de légumes et d'épices. Le plat est étroitement associé à la fête de l'indépendance haïtienne, car pendant la période de l'esclavage, la soupe était réservée aux maîtres français et interdite aux esclaves. Après l'indépendance, la soupe est devenue un symbole de la liberté et de la fierté nationale en Haïti, et est maintenant un élément incontournable des célébrations du Nouvel An.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 animate__animated animate__fadeInRight">
                    <div class="card mb-4 shadow-sm">
                        <Image className={styles.img} src={griot} alt="Griot et pikliz" class="card-img-top" />
                        <div class="card-body">
                            <h4 class="card-title">Griot et pikliz</h4>
                            <p class="card-text">Le griot et le pikliz sont deux plats emblématiques d'Haïti. Le griot est une viande de porc marinée et frite, servie avec du riz et des haricots rouges. Le pikliz est un condiment piquant à base de chou, de carottes et de piments. Les deux plats sont souvent servis ensemble pour un repas complet et savoureux.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4 shadow-sm">
                        <Image className={styles.img} src={tassot} alt="Tassot" class="card-img-top" />
                        <div class="card-body">
                            <h4 class="card-title">Tassot</h4>
                            <p class="card-text">Le tassot est un plat de viande séchée et frite, généralement préparé avec de la viande de bœuf ou de chèvre. Il est souvent servi avec du riz et des haricots rouges, ainsi qu'une sauce piquante pour ajouter de la saveur. Le tassot est un plat populaire en Haïti et est souvent consommé lors de fêtes et d'occasions spéciales.</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card mb-4 shadow-sm">
                        <Image className={styles.img} src={diri} alt="Diri ak djon djon" class="card-img-top" />
                        <div class="card-body">
                            <h4 class="card-title">Diri ak djon djon</h4>
                            <p class="card-text">Le diri ak djon djon est un plat de riz noir créole haïtien, cuit avec des champignons djon djon. Le riz est souvent accompagné de haricots rouges, de viande, de bananes frites et d'une sauce épicée. Les champignons djon djon donnent au plat une couleur noire unique et une saveur délicate. Ce plat est souvent servi lors de mariages et d'autres événements festifs en Haïti.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4 shadow-sm">
                        <Image className={styles.img} src={pen_patat} alt="Pèlèn tèt" class="card-img-top" />
                        <div class="card-body">
                            <h4 class="card-title">Pèlèn tèt</h4>
                            <p class="card-text">Le pèlèn tèt est un plat traditionnel haïtien à base de bananes plantains vertes, souvent servi comme accompagnement. Les bananes sont pelées et râpées, puis mélangées avec de l'ail, du sel, du poivre et d'autres épices avant d'être frites jusqu'à ce qu'elles soient croustillantes et dorées. Le pèlèn tèt est souvent servi avec du poisson frit ou du poulet et est un plat savoureux et croquant, populaire dans la cuisine haïtienne.</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
    <div class="card mb-4 shadow-sm">
        <Image className={styles.img} src={sos_pwa} alt="Sòs pwa" class="card-img-top"/>
        <div class="card-body">
            <h4 class="card-title">Sòs pwa</h4>
            <p class="card-text">Sòs pwa is a hearty and nutritious Haitian bean soup that is typically made with red kidney beans, beef, and various vegetables like carrots, onions, and celery. The soup is seasoned with garlic, thyme, and other spices, and is usually served with rice and fried plantains. Sòs pwa is a popular dish in Haiti, especially during the colder months, and is known for its rich flavor and satisfying texture.</p>
        </div>
    </div>
</div>

            </div>
        </div>
    </main>


}