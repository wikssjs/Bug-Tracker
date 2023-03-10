import { getAllTickets,addTicketModel,addMemberModel,deleteMemberModel,getTicketByIdModel,getAssignersModel,editTicketModel } from "../model/ticket.js";

export const getTickets = async (request, response) => {
    response.status(200).json({
        tickets: await getAllTickets(),
    });
}


export const addTicket = async (request, response) => {
    await addTicketModel(request.body.title, request.body.description, request.body.status, request.body.priority, request.body.project_id,4, request.body.assignees_users);
    response.status(201).end();
}

export const addMember = async (request, response) => {
    await addMemberModel(request.body.project_id,request.body.users);
    response.status(201).end();
}

export const deleteMember = async (request, response) => {
    await deleteMemberModel(request.body.project_id,request.body.user_id);
    response.status(201).end();
}

export const getTicketById = async (request, response) => {
    const idTicket =request.query.ticket_id;
    response.status(200).json({
        ticket: await getTicketByIdModel(idTicket),
        assigners: await getAssignersModel(idTicket)
    });
}

export const editTicket = async (request, response) => {
   await editTicketModel(request.body.id,request.body.title, request.body.description, request.body.status, request.body.priority, request.body.project_id,4, request.body.assignees_users);
   response.status(201).end();
}