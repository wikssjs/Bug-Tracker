import { promesseConnexion } from './connexion.js';
import { hash } from 'bcrypt';




export const getAllUsers = async () => {
    let connexion = await promesseConnexion;
    let resultat = await connexion.all(
        `SELECT *,
        Case
        when is_admin = 0 then 'Developer'
        when is_admin = 1 then 'Admin'
        end as role
         from users
        `)

        return resultat;
}

export const editUserModel = async (id,nom,prenom,username,email,role) => {
    let connexion = await promesseConnexion;

    const isAdmin = role === 'Admin' ? 1 : 0;

    console.log(id,nom,prenom,username,email,role,isAdmin)
    let resultat = await connexion.run(
        `UPDATE users SET nom = ?, prenom = ?, username = ?, email = ?, is_admin = ? WHERE id = ?`,
        [nom,prenom,username,email,isAdmin,id]
    );
    return resultat;
}


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