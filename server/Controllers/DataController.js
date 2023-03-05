import { getTodos } from '../model/todo.js';
import { getProjects,getContributors,addProjectModel} from '../model/bug.js';

export const getDonnees = async (request, response) => {
    response.status(200).json({
        titre: 'Todo',
        projects: await getProjects(),
        contributors: await getContributors(),
    });
}

export const addProject = async (request, response) => {
    console.log(request.body.name.toString())
    await addProjectModel(request.body.name, request.body.description, request.body.contributors);
    response.status(201).end();
}
