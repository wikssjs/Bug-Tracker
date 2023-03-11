import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { existsSync } from 'fs';

let promesseConnexion = open({
  filename: process.env.DB_FILE,
  driver: sqlite3.Database
});

if (!existsSync(process.env.DB_FILE)) {
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
            id char(36) PRIMARY KEY default (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
            name TEXT NOT NULL,
            description TEXT
          );
          
          Create table project_user (
            id INTEGER PRIMARY KEY,
            project_id char(36) NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (project_id) REFERENCES projects (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
          );
          
          CREATE TABLE tickets (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL,
            priority TEXT NOT NULL,
            project_id char(36) NOT NULL,
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

          INSERT INTO projects (name, description) VALUES ('React', 'A JavaScript library for building user interfaces');
          INSERT INTO projects (name, description) VALUES ('Django', 'A high-level Python web framework');
          INSERT INTO projects (name, description) VALUES ('TensorFlow', 'An open-source machine learning library');
          INSERT INTO projects (name, description) VALUES ('Vue.js', 'A progressive JavaScript framework for building user interfaces');
          INSERT INTO projects (name, description) VALUES ('Spring Boot', 'An open-source Java-based framework for building web applications and microservices');
          

          INSERT INTO users (username, email, password, is_admin) VALUES ('johndoe', 'johndoe@example.com', 'password123', 0);
          INSERT INTO users (username, email, password, is_admin) VALUES ('janedoe', 'janedoe@example.com', 'password456', 0);
          INSERT INTO users (username, email, password, is_admin) VALUES ('admin', 'admin@example.com', 'adminpassword', 1);
          INSERT INTO users (username, email, password, is_admin) VALUES ('bobsmith', 'bobsmith@example.com', 'password789', 0);
          INSERT INTO users (username, email, password, is_admin) VALUES ('sarahjones', 'sarahjones@example.com', 'password321', 0);

          INSERT INTO project_user (project_id, user_id)
          VALUES ("1697b194-8f6e-4a21-983a-35b979e9bc73", 1),
          ("ee05b4c6-c48d-451a-87f8-263044e8e9d6", 2),
          ("04fc6d34-3deb-46b8-9139-8f75ba4439de", 3),
          ("04fc6d34-3deb-46b8-9139-8f75ba4439de", 4),
          ("07a9f3ee-43fc-4017-917e-cbcf77271fd8", 4),
          ("07a9f3ee-43fc-4017-917e-cbcf77271fd8", 5),
          ("033e5256-eb10-4283-976d-ab364d9c3d4b", 5);

          INSERT INTO tickets (title, description, status, priority, project_id, reported_by, assigned_to)
VALUES
    ('Fix login button', 'The login button on the homepage is not working properly', 'Open', 'High', "1697b194-8f6e-4a21-983a-35b979e9bc73", 3, 2),
    ('Update pricing page', 'The pricing page needs to be updated with new plans', 'Open', 'Medium', "ee05b4c6-c48d-451a-87f8-263044e8e9d6", 4, 5),
    ('Add search feature', 'Add search functionality to the website', 'Closed', 'Low', "", "1697b194-8f6e-4a21-983a-35b979e9bc73", NULL),
    ('Fix broken links', 'Several links on the website are broken', 'Open', 'High', "04fc6d34-3deb-46b8-9139-8f75ba4439de", 1, NULL),
    ('Update logo', 'Replace the old logo with a new one', 'Open', 'Low', "ee05b4c6-c48d-451a-87f8-263044e8e9d6", 3, NULL),
    ('Add payment gateway', 'Integrate a payment gateway for online transactions', 'Open', 'High', "1697b194-8f6e-4a21-983a-35b979e9bc73", 2, 5),
    ('Improve performance', 'Optimize the website for faster loading times', 'In Progress', 'High', "04fc6d34-3deb-46b8-9139-8f75ba4439de", 1, 4),
    ('Fix formatting issues', 'Fix formatting issues on the about page', 'Open', 'Medium', "ee05b4c6-c48d-451a-87f8-263044e8e9d6", 4, NULL),
    ('Add social media links', 'Add links to social media profiles on the homepage', 'Open', 'Low', "1697b194-8f6e-4a21-983a-35b979e9bc73", 3, 2),
    ('Fix broken images', 'Several images on the website are not loading', 'In Progress', 'Medium', "04fc6d34-3deb-46b8-9139-8f75ba4439de", 5, NULL);

        `


    )

    return connexion;
  });
}

export { promesseConnexion };
