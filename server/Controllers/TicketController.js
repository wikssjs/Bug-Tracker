import { getAllTickets,addTicketModel,addMemberModel } from "../model/ticket.js";

export const getTickets = async (request, response) => {
    response.status(200).json({
        tickets: await getAllTickets(),
    });
}


export const addTicket = async (request, response) => {
    await addTicketModel(request.body.title, request.body.description, request.body.status, request.body.priority, request.body.project_id,4, request.body.assigned_to);
    response.status(201).end();
}

export const addMember = async (request, response) => {
    await addMemberModel(request.body.project_id,request.body.users);
    response.status(201).end();
}