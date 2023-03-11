import { useState, useEffect } from "react";
import styles from "../styles/TicketPopup.module.css";



export default function TicketPopup({ setShowTicketPopPup,project_id,setFetchData}) {
    const [contributors, setContributors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Open");
    const [priority, setPriority] = useState("Low");
    const [chekedBoxes, setChekedBoxes] = useState([]);
    

    useEffect(() => {
        fetch('http://192.168.0.26:5000/users')
            .then(res => res.json())
            .then(data => setContributors(data.users))

           
    }, [])

    useEffect(() => {
      
    }, [])



    function handleCheck(event) {
        if (!event.currentTarget.classList.contains('checked')) {
            console.log(chekedBoxes)
            setChekedBoxes(chekedBoxes.filter(box => box !== Number(event.currentTarget.dataset.id)));
        }
        else {
            console.log(chekedBoxes)
            setChekedBoxes([...chekedBoxes, Number(event.currentTarget.dataset.id)]);
        }
    }


    function closePopup() {
        setShowTicketPopPup(false);    }

   async function handleSumit(event) {
        event.preventDefault();


        const ticket = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            project_id: project_id,
            assigned_users: chekedBoxes
        }
        
        console.log(ticket)
        let response = await fetch('http://192.168.0.26:5000/add-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        })

        if(response.ok){
            setShowTicketPopPup(false);
            setFetchData(true);
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
        <div className={`${styles.popup} shadow-lg row  position-absolute`}>
            <div className={`${styles.popup_inner} d-flex flex-column text-center`}>
                <div className="popup-header">
                    <h3 className="popup-title">Add Ticket</h3>
                    <button className={styles.popup_close} onClick={closePopup}>X</button>
                </div>
                <div className="popup-content">
                    <form className="popup-form  d-flex flex-column" onSubmit={handleSumit}>
                        <label htmlFor="">
                            <input className='form-control' type="text" placeholder='Title' required onChange={handleTitleChange} />
                        </label>
                        <label htmlFor="">
                            <textarea name="" id="" cols="30" rows="10" placeholder='Description' required onChange={handleDescriptionChange}></textarea>
                        </label>
                    

                        <label htmlFor=""  className={styles.status}>
                            <select required  name="" id="" onChange={handleStatusChange} className={styles.select}>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <i className={`bi bi-caret-down ${styles.arrow}`}></i>

                        </label>
                       
                        <label  htmlFor="" className={styles.status}>
                            <select required name="" id="" onChange={handlePriorityChange} className={styles.select}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            <i className={`bi bi-caret-down ${styles.arrow1}`}></i>

                        </label>

                        <label htmlFor="">
                            <div className={styles.users}>
                                <div class="select-btn open">
                                    <span class="btn-text">Assigned Users</span>
                                    <span class="arrow-dwn">
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </span>
                                </div>

                                <ul className={`${styles.listes_users} list-items overflow-scroll open`}>

                                    {
                                        contributors.map((contributor) => {

                                            return (
                                                <li data-id={contributor.id} onClick={(event) => { event.currentTarget.classList.toggle("checked"); event.currentTarget.classList.contains("checked" ? handleCheck(event) : "") }} className={`item `}>
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

                        <button className={`${styles.submit} align-self-center btn-success`} type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>




    )
}
