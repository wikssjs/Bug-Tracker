import { getTodos, addTodo, checkTodo } from '../model/todo.js';


export const getUser = async (req, res) => {
   res.status(200).json({nom: "James", age: 25});
}


export const inscrireUser = async (request, response,next) => {
       // Valider les données reçu du client
       if(true) {
        try {
            await addUtilisateur(request.body.nomUtilisateur, request.body.motDePasse);
            response.status(201).end();
        }
        catch(error) {
            if(error.code === 'SQLITE_CONSTRAINT') {
                response.status(409).end();
            }
            else {
                next(error);
            }
        }
    }
    else {
        response.status(400).end();
    }
}


export const connecterUser = async (request, response,next) => {
   // Valider les données reçu du client
   if(true) {
    passport.authenticate('local', (error, utilisateur, info) => {
        if(error) {
            next(error);
        }
        else if(!utilisateur) {
            response.status(401).json(info);
        }
        else {
            request.logIn(utilisateur, (error) => {
                if(error) {
                    next(error);
                }
                else {
                    response.status(200).end();
                }
            });
        }
    })(request, response, next);
}
else {
    response.status(400).end();
}}


export const deconnecterUser = async (request, response,next) => {
    request.logOut((error) => {
        if(error) {
            next(error);
        }
        else {
            response.redirect('/');
        }
    });
}