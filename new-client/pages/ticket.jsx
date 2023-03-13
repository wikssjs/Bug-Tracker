import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TicketPopup from "../component/TicketPopup";
import styles from "../styles/Ticket.Id.module.css";

export default function Ticket() {
    const router = useRouter();
    const [showTicketPopPup, setShowTicketPopPup] = useState(false);
    const [contributors, setContributors] = useState([]);
    const [ticket, setTicket] = useState({});
    const [assignees, setAssignee] = useState([]);
    const [fetchData, setFetchData] = useState(false);
    const { ticket_id, project_id } = router.query;

    const [saveTicketId, setSaveTicketId] = useState(ticket_id);
    const [comment, setComment] = useState("");

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


    }, [saveTicketId, fetchData]);

    const handlePopup = () => {
        setShowTicketPopPup(!showTicketPopPup);
    }

    const handleClick = (event) => {
        const id = event.currentTarget.htmlFor;
        const elemtn = document.getElementById(id);
        elemtn.readOnly = false;
        
    }

    return (
        <main class={`${styles.container} container col`}>
            <div class="card mt-4 shadow-lg">
                <div class={`${styles.card_header} row card-header`}>
                    <h3 class="col card-title text-dark">Bug #{ticket_id}:{ticket && ticket.title}</h3>
                    <button onClick={handlePopup} className="col-1 btn btn-primary">Edit <i className="bi bi-pencil-square"></i> </button>
                </div>
                <div class={`${styles.card_body} card-body bg-light`}>
                    <div class="row">
                        <div className={`col-md-2 mr-2 badge ${ticket && ticket.status_badge}`}>
                            <p> <span className={styles.title}>Status:</span> {ticket && ticket.status}</p>
                        </div>
                        <div className={`col-md-2 badge ${ticket && ticket.priority_badge}`}>
                            <p> <span className={styles.title}>Priority:</span>{ticket && ticket.priority} </p>
                        </div>
                        <div className="col-md-4">
                            <p> <span className={styles.title}>Project:</span> {ticket && ticket.name}</p>
                        </div>
                        <div className="col-md-6">
                            <p> <span className={styles.title}>Reported by:</span> {ticket && ticket.username}</p>
                        </div>
                        <div className="col-md-6">
                            <p> <span className={styles.title}>Assigned to:</span> {assignees && assignees.map((assignee) => { return assignee.username + ", " })}</p>
                        </div>
                        <div className="col-md-6">
                            <p><span className={styles.title}>Created at:</span> {ticket && ticket.created_at}</p>
                        </div>
                        <div className="col-md-6">
                            <p><span className={styles.title}>Updated at:</span> {ticket && ticket.updated_at}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-12">
                            <p className={styles.title}>Description:</p>
                            <p>
                                {ticket && ticket.description}
                            </p>

                        </div>
                    </div>
                    <div class="container mt-5">
                        <h2>Comments</h2>
                        <hr />
                        <div class="row">
                            <div class="col">
                                <div className="row shadow-lg">

                                    <div class="comment-list  h-25 col-md-6">
                                        <div className="overflow-scroll">

                                            <div class="comment">
                                                <div class="comment-header">
                                                    <h4 class="comment-author">John Doe</h4>
                                                    <span class="comment-date">March 12, 2023</span>
                                                </div>
                                                <div class="comment-body">
                                                    <textarea readOnly={true} name="" id="" >
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, praesentium? Velit deserunt alias odio consectetur! Architecto, fugit debitis harum qui reprehenderit tenetur nobis asperiores ipsum aperiam, beatae optio ullam ex.</textarea>
                                                </div>
                                                <label htmlFor="text" onClick={handleClick}>
                                                    <button className="btn position-absolute"> <i className="bi bi-pencil-square"></i></button>
                                                </label>
                                            </div>
                                            <div class="comment position relative">
                                                <div class="comment-header">
                                                    <h4 class="comment-author">Jane Doe</h4>
                                                    <span class="comment-date">March 11, 2023</span>
                                                </div>
                                                <div class="comment-body">
                                                        <textarea readOnly id="text" name="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, praesentium? Velit deserunt alias odio consectetur! Architecto, fugit debitis harum qui reprehenderit tenetur nobis asperiores ipsum aperiam, beatae optio ullam ex.</textarea>
                                                </div>
                                            </div>
                                            <button className="btn position-absolute top-0"> <i className="bi bi-pencil-square"></i></button>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-primary justify-content-center">Edit <i className="bi bi-pencil-square"></i></button>

                                        </div>
                                    </div>
                                    <div class="comment-form col-md-6">
                                        <h4>Leave a Comment</h4>
                                        <form>
                                            <div class="form-group">
                                                <label for="comment">Comment</label>
                                                <textarea class="form-control" id="comment" rows="5" required></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary align-seft-end">Submit</button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            {
                showTicketPopPup && (
                    <TicketPopup
                        contributors={contributors}
                        setContributors={setContributors}
                        ticket={ticket} setShowTicketPopPup={setShowTicketPopPup}
                        btnTxt="Edit"
                        method="PUT"
                        assignees={assignees}
                        ticket_id={ticket_id}
                        project_id={project_id}
                        setFetchData={setFetchData}
                        fetchData={fetchData} />
                )
            }
        </main>



    )


}


