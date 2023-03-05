import {promesseConnexion} from './connexion.js';


export const getProjects = async () => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.all(
        `SELECT * FROM projects`
    )
    return resultat;
}


export const getContributors = async () => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.all(
        `SELECT * FROM users
        INNER JOIN project_user ON users.id = project_user.user_id
        Inner JOIN projects ON projects.id = project_user.project_id`
    )
    return resultat;
}

export const addProjectModel = async (name, description, contributors) => {
    let connexion = await promesseConnexion;
    let id_project;

    let resultat = await connexion.run(
        `INSERT INTO projects (name, description)
        VALUES (?, ?)`,
        [name, description]
    );

    id_project = resultat.lastID;

    for(let i = 0;i<contributors.length;i++){

    let resultat2 = await connexion.run(
        `INSERT INTO project_user (project_id,user_id)
        VALUES (?, ?)`,
        [id_project, contributors[i].id]
    );
}

    return resultat.lastID;
}