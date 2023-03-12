import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import TicketPopup from "../component/TicketPopup";
import styles from "../styles/Ticket.Id.module.css";

export default function Ticket() {
    const router = useRouter();
    const [showTicketPopPup, setShowTicketPopPup] = useState(false);
    const [contributors, setContributors] = useState([]);
    const[ ticket, setTicket ] = useState({});
    const[assignees, setAssignee] = useState([]);
    const[fetchData, setFetchData] = useState(false);
    const { ticket_id,project_id } = router.query;
    
    const[saveTicketId,setSaveTicketId] = useState(ticket_id);

    useEffect(() => {
        if (ticket_id) {
            setSaveTicketId(ticket_id);
            localStorage.setItem('ticketId', ticket_id);
        } else {
            const savedTicketId = localStorage.getItem('ticketId');
            if (savedTicketId) {
                setSaveTicketId(savedTicketId);
            }
        }

        if (saveTicketId) {
            fetch(`http://192.168.0.26:5000/ticket?ticket_id=${saveTicketId}`)
                .then(res => res.json())
                .then((data) => {
                    setTicket(data.ticket);
                    setAssignee(data.assigners);
                
                });

            fetch('http://192.168.0.26:5000/users')
                .then(res => res.json())
                .then(data => setContributors(data.users));
        }
    }, [saveTicketId,fetchData]);

    const handlePopup = () => {
        setShowTicketPopPup(!showTicketPopPup);
    }


    return (
        <main class={`${styles.container} container col`}>
            <div class="card mt-4 shadow-lg">
                <div class={`${styles.card_header} row card-header bg-white`}>
                    <h3 class="col card-title text-dark">Bug #{ticket_id}:{ticket&& ticket.title}</h3>
                    <button onClick={handlePopup} className="col-1 btn btn-primary">Edit <i className="bi bi-pencil-square"></i> </button>
                </div>
                <div class={`${styles.card_body} card-body bg-light`}>
                    <div class="row">
                        <div class="col-md-2 mr-2 badge badge-success">
                            <p>Status: {ticket&& ticket.status}</p>
                        </div>
                        <div class="col-md-2 badge badge-danger">
                            <p>Priority: {ticket&& ticket.priority}</p>
                        </div>
                        <div class="col-md-4">
                            <p>Project: {ticket&& ticket.name}</p>
                        </div>
                        <div class="col-md-6">
                            <p>Reported by: {ticket&& ticket.username}</p>
                        </div>
                        <div class="col-md-6">
                            <p>Assigned to: {assignees && assignees.map((assignee)=>{return assignee.username+", "})}</p>
                        </div>
                        <div class="col-md-6">
                            <p>Created at: {ticket&& ticket.created_at}</p>
                        </div>
                        <div class="col-md-6">
                            <p>Updated at: {ticket&& ticket.updated_at}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>Description:</p>
                            <p>
                               {ticket&& ticket.description}
                            </p>
                           
                        </div>
                    </div>
                </div>
            </div>

            {
                showTicketPopPup && <TicketPopup contributors={contributors} setContributors={setContributors} ticket={ticket} setShowTicketPopPup={setShowTicketPopPup} btnTxt="Edit" method="PUT" assignees ={assignees} ticket_id={ticket_id} project_id={project_id} setFetchData={setFetchData} fetchData={fetchData}/>
            }
        </main>



    )


}


