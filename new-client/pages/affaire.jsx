import styles from '../styles/Tourisme.module.css'


export default function Affaire  () {
    return (
        <main>
        <div class={`${styles.jumbotron} jumbotron jumbotron-fluid`}>
			<div class={`${styles.container} container`}>
				<h1 class="display-4">Investir en Haïti</h1>
				<p class="lead">Découvrez les opportunités d&apos;investissement et les avantages de faire des affaires en Haïti.</p>
			</div>
		</div>
		<div class={`${styles.container} container`}>
			<div class="row">
				<div class="col-lg-4">
					<div class="card mb-4 shadow-sm">
						<div class="card-body">
							<h4 class="card-title">Infrastructure</h4>
							<p class="card-text">Haïti dispose d&apos;une infrastructure moderne et en pleine croissance, avec des projets d&apos;expansion dans les transports, l&apos;énergie et les télécommunications.</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<a href="#" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
								</div>
								<small class="text-muted"><i class="fas fa-chevron-right"></i></small>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="card mb-4 shadow-sm">
						<div class="card-body">
							<h4 class="card-title">Main d&apos;oeuvre qualifiée</h4>
							<p class="card-text">Haïti possède une main d&apos;oeuvre qualifiée, avec un taux d&apos;alphabétisation en augmentation constante et des programmes de formation professionnelle en expansion.</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<a href="#" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
								</div>
								<small class="text-muted"><i class="fas fa-chevron-right"></i></small>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="card mb-4 shadow-sm">
						<div class="card-body">
							<h4 class="card-title">Soutien gouvernemental</h4>
							<p class="card-text">Le gouvernement haïtien offre des incitatifs fiscaux, des subventions et des programmes de soutien aux entreprises qui investissent dans le pays.</p>
							<div class="d-flex justify-content-between align-items-center">
								<div class="btn-group">
									<a href="#" class="btn btn-sm btn-outline-secondary">En savoir plus</a>
								</div>
								<small class="text-muted"><i class="fas fa-chevron-right"></i></small>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8">
					<h2>Opportunités d&apos;investissement</h2>
					<p>Haïti offre de nombreuses opportunités d&apos;investissement dans les secteurs de l&apos;agriculture, de l&apos;énergie, du tourisme, de la construction et de l&apos;industrie manufacturière.</p>
					<p>En raison de sa proximité avec les États-Unis et de son accès aux marchés de l&apos;Amérique latine, Haïti est également un choix stratégique pour les entreprises cherchant à pénétrer ces marchés.</p>
				</div>
				<div class="col-md-4">
					<h2>Contactez-nous</h2>
					<p>Pour en savoir plus sur les opportunités d&apos;investissement en Haïti, contactez notre équipe d&apos;experts.</p>
					<p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
					<p><i class="fas fa-envelope"></i> info@investinhaiti.com</p>
				</div>
			</div>
		</div>
	</main>
    );
};