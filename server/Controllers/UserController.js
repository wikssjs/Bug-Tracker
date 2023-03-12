import { getAllUsers,editUserModel } from '../model/utilisateur.js';

export const getUsers = async (req, res) => {
    res.status(200).json({
        users: await getAllUsers(),
    });
}


export const EditUser = async (req, res) => {
    await editUserModel(req.body.id,req.body.nom, req.body.prenom,req.body.username, req.body.email, req.body.role);
    res.status(201).end();
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