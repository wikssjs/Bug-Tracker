import { promesseConnexion } from './connexion.js';


export const getProjects = async () => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.all(
        `SELECT * FROM projects`
    )
    return resultat;
}


export const getOpenBugs = async ()=> {
    let connexion = await promesseConnexion;

    let resultat = await connexion.get(
        `select count(*) as openBugs from tickets t 
        where t.status = "Open"`
    )

    return resultat
}

export const getInProgressBugs = async ()=> {
    let connexion = await promesseConnexion;

    let resultat = await connexion.get(
        `select count(*) as inProgressBugs from tickets t
        where t.status = "In Progress"`
    )
    return resultat
}

export const getClosedBugs = async ()=> {
    let connexion = await promesseConnexion;

    let resultat = await connexion.get(
        `select count(*) as closedBugs from tickets t
        where t.status = "Closed"`
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

    for (let i = 0; i < contributors.length; i++) {

        let resultat2 = await connexion.run(
            `INSERT INTO project_user (project_id,user_id)
        VALUES (?, ?)`,
            [id_project, contributors[i]]
        );
    }

    return resultat.lastID;
}

export const editProjectModel = async (id, name, description, contributors) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.run(
        `UPDATE projects SET name = ?, description = ?
        WHERE id = ?`,
        [name, description, id]
    );

    let tour = 0;
    let resultat2 = await connexion.run(
        `delete from project_user where project_id = ?`,
        [id]

    );
    for (let i = 0; i < contributors.length; i++) {


        let resultat4 = await connexion.run(
            `INSERT INTO project_user (project_id,user_id)
            VALUES (?, ?)`,
            [id, contributors[i]]
        );
        console.log(id)
    }


    console.log(contributors);
    return resultat.lastID;
}



export const getProjectByIdModel = async (id) => {
    let connexion = await promesseConnexion;
    let resultat = await connexion.all(
        `SELECT u.username,t.description,t.id,u.username,t.reported_by,t.title FROM TICKETS t 
        INNER JOIN projects p ON p.id = t.project_id
        INNER JOIN users u ON u.id = t.reported_by
        WHERE p.id = ?`, [id]
    )
    return resultat;
}

export const getTeamByProjectIdModel = async (id) => {
    let connexion = await promesseConnexion;
    console.log(id)
    let resultat = await connexion.all(
        `SELECT u.id,u.username, u.email,p.name FROM project_user
        inner join users u on u.id = project_user.user_id
        inner join projects p on p.id = project_user.project_id
                WHERE project_id = ?`, [id]
    )
    return resultat;
}