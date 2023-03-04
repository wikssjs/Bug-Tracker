import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

let promesseConnexion = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

promesseConnexion = promesseConnexion.then((connexion) => {
    connexion.exec(
        `CREATE TABLE IF NOT EXISTS todo (
            id_todo INTEGER PRIMARY KEY,
            texte TEXT NOT NULL,
            est_coche INTEGER NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS utilisateur (
            id_utilisateur INTEGER PRIMARY KEY,
            nom_utilisateur TEXT NOT NULL UNIQUE,
            mot_de_passe TEXT NOT NULL,
            acces INTEGER NOT NULL
        );
        
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin INTEGER NOT NULL
          );

          CREATE TABLE projects (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT
          );
          
          
          CREATE TABLE tickets (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL,
            priority TEXT NOT NULL,
            project_id INTEGER NOT NULL,
            reported_by INTEGER NOT NULL,
            assigned_to INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects (id),
            FOREIGN KEY (reported_by) REFERENCES users (id),
            FOREIGN KEY (assigned_to) REFERENCES users (id)
          );


          CREATE TABLE comments (
            id INTEGER PRIMARY KEY,
            text TEXT NOT NULL,
            ticket_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ticket_id) REFERENCES tickets (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
          );
          
          
        `


    )

    return connexion;
});

export {promesseConnexion};
