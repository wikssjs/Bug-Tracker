import { promesseConnexion } from './connexion.js';
import { hash } from 'bcrypt';

export const addUtilisateur = async (nomUtilisateur, motDePasse) => {
    let connexion = await promesseConnexion;

    let motDePasseHash = await hash(motDePasse, 10);

    await connexion.run(
        `INSERT INTO utilisateur (nom_utilisateur, mot_de_passe, acces)
        VALUES (?, ?, 0)`,
        [nomUtilisateur, motDePasseHash]
    );
}

export const getUtilisateurByNom = async (nomUtilisateur) => {
    let connexion = await promesseConnexion;

    let utilisateur = await connexion.get(
        `SELECT id_utilisateur, nom_utilisateur, mot_de_passe, acces
        FROM utilisateur
        WHERE nom_utilisateur = ?`,
        [nomUtilisateur]
    )

    return utilisateur;
}