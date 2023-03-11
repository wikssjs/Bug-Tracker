import { promesseConnexion } from './connexion.js';


export const getAllTickets = async () => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.all(
        `SELECT *,p.name,u.username FROM tickets t
        INNER JOIN projects p ON p.id = t.project_id
        INNER JOIN users u ON u.id = t.reported_by
        `
    )
    return resultat;
}


export const addTicketModel = async (title, description, status,priority,project_id, reported_by,assigned_to) => {
    let connexion = await promesseConnexion;

    console.log(title, description, status,priority,project_id, reported_by,assigned_to)
    let resultat = await connexion.run(
        `INSERT INTO tickets (title, description, status, priority,project_id,reported_by,assigned_to)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, status,priority,project_id, reported_by,assigned_to]
    );
    return resultat.lastID;
}

export const addMemberModel = async (project_id,users) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.run(
        `delete from project_user where project_id = ?`,
        [project_id]

    );
    for (let i = 0; i < users.length; i++) {

        let resultat2 = await connexion.run(
            `INSERT INTO project_user (project_id,user_id)
        VALUES (?, ?)`,
            [project_id, users[i]]
        );
    }
}