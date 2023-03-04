import { getTodos } from '../model/todo.js';

export const getDonnees = async (request, response) => {
    if(request.user){
    }
    response.status(200).json({
        titre: 'Todo',
        todos: await getTodos(),
    });
}
