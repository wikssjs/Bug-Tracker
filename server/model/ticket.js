import { promesseConnexion } from './connexion.js';


export const getAllTickets = async () => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.all(
        `SELECT t.title,t.status,t.priority,t.created_at,t.id,p.name,p.id as project_id,u.username FROM tickets t
        INNER JOIN projects p ON p.id = t.project_id
        INNER JOIN users u ON u.id = t.reported_by
        `
    )
    return resultat;
}


export const addTicketModel = async (title, description, status,priority,project_id, reported_by,assignees_users) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.run(
        `INSERT INTO tickets (title, description, status, priority,project_id,reported_by)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, status,priority,project_id, reported_by]
    );

    for (let i = 0; i < assignees_users.length; i++) {

        let resultat2 = await connexion.run(
            `INSERT INTO ticket_user (ticket_id,user_id)
            VALUES (?, ?)`,
            [resultat.lastID, assignees_users[i]]
        );
    }
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

export const deleteMemberModel = async (project_id,user_id) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.run(
        `delete from project_user where project_id = ? and user_id = ?`,
        [project_id,user_id]

    );
}


export const getTicketByIdModel = async (id) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.get(
        `SELECT t.title,t.id,t.status,t.priority,t.reported_by,t.created_at,t.description,
            p.name,t.updated_at,u.username ,
            CASE 
            WHEN status = 'Closed' THEN 'badge-danger'
            WHEN status = 'In Progress' THEN 'badge-warning'
            ELSE 'badge-success'
          END AS status_badge,
            CASE
            WHEN priority = 'High' THEN 'badge-danger'
            WHEN priority = 'Medium' THEN 'badge-warning'
            ELSE 'badge-success'
            END AS priority_badge
           FROM tickets t 
        Inner join projects p on p.id = t.project_id
        Inner join users u on u.id = t.reported_by
        WHERE t.id = ?`,
        [id]
    )
    return resultat;
}

export const getAssignersModel = async (id) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.all(
       `Select u.username,u.id from users u
       Inner join ticket_user tu on tu.user_id = u.id
       inner join tickets t on t.id = tu.ticket_id
       where tu.ticket_id = ?`,[id]
    )
    return resultat;
}

export const editTicketModel = async (id,title, description, status,priority,project_id, reported_by,assignees_users) => {
    let connexion = await promesseConnexion;

    let resultat = await connexion.run(
        `UPDATE tickets SET title = ?, description = ?, status = ?, priority = ?,project_id = ?,reported_by = ?
        WHERE id = ?`,
        [title, description, status,priority,project_id, reported_by,id]

    );

    console.log(id,title, description, status,priority,project_id, reported_by,assignees_users);

    let resultat2 = await connexion.run(
        `delete from ticket_user where ticket_id = ?`,
        [id]

    );

    for (let i = 0; i < assignees_users.length; i++) {

        let resultat3 = await connexion.run(
            `INSERT INTO ticket_user (ticket_id,user_id)
        VALUES (?, ?)`,
            [id, assignees_users[i]]
        );
    }
    return resultat.lastID;
}