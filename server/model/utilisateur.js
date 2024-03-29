import { promesseConnexion } from './connexion.js';
import pkg from 'bcryptjs';
const { hash } = pkg;




export const getAllUsers = async () => {
    let connexion = await promesseConnexion;
    let resultat = await connexion.all(
        `SELECT u.id,u.nom,u.prenom,u.username,u.email,u.is_admin,
        Case
        when is_admin = 0 then 'Developer'
        when is_admin = 1 then 'Admin'
        end as role
         from users u
        `)

        return resultat;
}

export const editUserModel = async (id,nom,prenom,username,email,role) => {
    let connexion = await promesseConnexion;
    const isAdmin = role === 'Admin' ? 1 : 0;

    let resultat = await connexion.run(
        `UPDATE users SET nom = ?, prenom = ?, username = ?, email = ?, is_admin = ? WHERE id = ?`,
        [nom,prenom,username,email,isAdmin,id]
    );
    return resultat;
}

export const editUserAccountModel = async (id,nom,prenom,username) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.run(
        `UPDATE users SET nom = ?, prenom = ?, username = ? WHERE id = ?`,
        [nom,prenom,username,id]
    );
    return resultat;
}

export const editUserPasswordModel = async (id,password) => {
    let connexion = await promesseConnexion;
    let motDePasseHash = await hash(password, 10);
    console.log(password);
    let resultat = await connexion.run(
        `UPDATE users SET password = ? WHERE id = ?`,
        [motDePasseHash,id]
    );
    return resultat;
}

export const addUserModel = async (firstname,lastname,email,username, password) => {
    let connexion = await promesseConnexion;

    let motDePasseHash = await hash(password, 10);

    await connexion.run(
        `INSERT INTO users (nom,prenom,email, username, password, is_admin)
        VALUES (?, ?, ?,?,?, 0)`,
        [firstname,lastname,email, username, motDePasseHash]
    );
}

export const getUserByEmail = async (email) => {
    let connexion = await promesseConnexion;

    let user = await connexion.get(
        `SELECT id, email, password, is_admin,username,nom,prenom
        FROM users
        WHERE email = ?`,
        [email]
    )

    return user;
}