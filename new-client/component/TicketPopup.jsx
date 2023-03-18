import { useState, useEffect, useRef } from "react";
import styles from "../styles/TicketPopup.module.css";



export default function TicketPopup({ setShowTicketPopPup, project_id, setFetchData, fetchData, popupRef, ticket, contributors, setContributors, btnTxt, method, assignees, ticket_id,user }) {
    // const [contributors, setContributors] = useState([]);
    const [title, setTitle] = useState(ticket && ticket.title);
    const [description, setDescription] = useState(ticket && ticket.description);
    const [status, setStatus] = useState(ticket ? ticket.status : "Open");
    const [priority, setPriority] = useState(ticket ? ticket.priority : "Low");
    const [chekedBoxes, setChekedBoxes] = useState([]);
    const [headers, setHeaders] = useState({});

    let tour = 0;

    useEffect(() => {

        const token = localStorage.getItem('token');
        setHeaders({
            'Content-Type': 'application/json',
            'Authorization': `ksklkweiowekdl908w03iladkl ${token}`
        });

        fetch('http://192.168.0.26:5000/users', { headers: headers })
            .then(res => res.json())
            .then(data => setContributors(data.users))


    }, [])

    useEffect(() => {

        if (tour === 0 && assignees) {
            const assignee = assignees && assignees.map(
                (oldContributor) => {
                    return oldContributor.id
                }
            );
            setChekedBoxes(assignee);
        }
        tour++;

    }, [assignees]);


    function handleCheck(event) {
        if (!event.currentTarget.classList.contains('checked')) {
            setChekedBoxes(chekedBoxes.filter(box => box !== Number(event.currentTarget.dataset.id)));
        }
        else {
            setChekedBoxes([...chekedBoxes, Number(event.currentTarget.dataset.id)]);
        }
    }


    function closePopup() {
        setShowTicketPopPup(false);
    }

    async function handleSumit(event) {
        event.preventDefault();


        const ticket = {
            id: ticket_id,
            title: title,
            description: description,
            status: status,
            priority: priority,
            project_id: project_id,
            assignees_users: chekedBoxes
        }


        let response = await fetch(`http://192.168.0.26:5000/${btnTxt}-ticket`, {
            method: `${method}`,
            headers: headers,
            body: JSON.stringify(ticket)
        })

        if (response.ok) {
            setShowTicketPopPup(false);
            setFetchData(!fetchData);
        }


    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleStatusChange(event) {
        setStatus(event.target.value);
    }

    function handlePriorityChange(event) {
        setPriority(event.target.value);
    }






    return (
        <div ref={popupRef} className={`${styles.popup} shadow-lg row  position-absolute`}>
            <div className={`${styles.popup_inner} d-flex flex-column text-center`}>
                <div className="popup-header">
                    <h3 className="popup-title">Add Ticket</h3>
                    <button className={styles.popup_close} onClick={closePopup}>X</button>
                </div>
                <div className={`${styles.popup_content}  p-1`}>
                    <form className="popup-form  d-flex flex-column" onSubmit={handleSumit}>

                        <div className={`${styles.form_inner}`}>

                            <label htmlFor="">
                                <input defaultValue={ticket && ticket.title} className='form-control' type="text" placeholder='Title' required onChange={handleTitleChange} />
                            </label>
                            <label htmlFor="">
                                <textarea defaultValue={ticket && ticket.description} name="" id="" cols="30" rows="10" placeholder='Description' required onChange={handleDescriptionChange}></textarea>
                            </label>


                            <label htmlFor="" className={styles.status}>
                                <select defaultValue={ticket && ticket.status} required name="" id="" onChange={handleStatusChange} className={styles.select}>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                {/* <i className={`bi bi-caret-down ${styles.arrow}`}></i> */}

                            </label>

                            <label htmlFor="" className={styles.status}>
                                <select defaultValue={ticket && ticket.priority} required name="" id="" onChange={handlePriorityChange} className={styles.select}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>

                                {/* <i className={`bi bi-caret-down ${styles.arrow1}`}></i>
                                <a href="">james</a> */}
                            </label>

                            <label htmlFor="" className={styles.users}>
                                <div>
                                    <div class="select-btn open">
                                        <span class="btn-text">Assigned Users</span>
                                        <span class="arrow-dwn">
                                            <i class="fa-solid fa-chevron-down"></i>
                                        </span>
                                    </div>

                                    <ul className={`${styles.listes_users} list-items overflow-scroll open`}>

                                        {
                                            contributors.map((contributor) => {

                                                const isAssigned = assignees && assignees.find(assignee => assignee.id === contributor.id);

                                                return (
                                                    <li data-id={contributor.id} onClick={(event) => { event.currentTarget.classList.toggle("checked"); event.currentTarget.classList.contains("checked" ? handleCheck(event) : "") }} className={`item ${isAssigned ? "checked" : ""}`}>
                                                        <span class="checkbox">
                                                            <i class="bi bi-check-lg check-icon"></i>
                                                        </span>
                                                        <span class="item-text">{contributor.username}</span>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            </label>
                        </div>

                        <button className={`${styles.submit} align-self-center btn-success`} type="submit">{btnTxt}</button>
                    </form>
                </div>
            </div>
        </div>




    )
}
