import styles from '../styles/ProjectPopup.module.css'
import { useEffect, useState, useRef } from 'react';

export default function EditPopup({ setShowEditPopup, setNotification, editProject,setFetchData,fetchData}) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contributors, setContributors] = useState([]);
    const [users, setUsers] = useState([]);
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



        setName(editProject.project.name);
        setDescription(editProject.project.description);
        setUsers(editProject.oldContributors);


        return () => {
        }
    }, [])

    useEffect(() => {
        
        if(tour === 0){
            const oldContributorIds = editProject.oldContributors.map(
                (oldContributor) => {
                    return oldContributor.user_id
                }
                );
                setChekedBoxes(oldContributorIds);
            }
                tour ++;

      }, [editProject.oldContributors]);
      


    function closePopup() {
        setShowEditPopup(false);
        // setSelectedOptions([]);
    }

    function handleCheck(event) {
        if (!event.currentTarget.classList.contains('checked')) {
            setChekedBoxes(chekedBoxes.filter(box => box !== Number(event.currentTarget.dataset.id)));
        }
        else {
            setChekedBoxes([...chekedBoxes, Number(event.currentTarget.dataset.id)]);
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    async function handleSumit(event) {
        if (event) {

            event.preventDefault();
        }
        let data = {
            id: editProject.project.id,
            name: name,
            description: description,
            contributors: chekedBoxes
        }




        //post request
        let response = await fetch('http://192.168.0.26:5000/edit-project', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        })

        if (response.ok) {
            setNotification({ show: true, name: name, message: 'has been edited' });
            setFetchData(!fetchData);
            setShowEditPopup(false);
        }
        else {
        }

    }

    return (<>

        <div className={`${styles.popup} popup shadow-lg text-center row rounded-3`}>
            <button onClick={closePopup} className='btn'><i class="bi bi-x-circle-fill abosolute"></i></button>
            <form className='d-flex flex-column' onSubmit={handleSumit}>
                <h1>Edit a Project</h1>
                <label>
                    <input defaultValue={editProject && editProject.project.name} contentEditable="false" className='form-control' type="text" placeholder='Project' required onChange={handleNameChange} />
                </label>


                <label htmlFor="">
                    <textarea defaultValue={editProject.project.description} name="" id="" cols="30" rows="10" placeholder='Description' required onChange={handleDescriptionChange}></textarea>
                </label>

               
                <div className={styles.users}>
                    <div class="select-btn open">
                        <span class="btn-text">Select Users</span>
                        <span class="arrow-dwn">
                            <i class="fa-solid fa-chevron-down"></i>
                        </span>
                    </div>

                    <ul className={`${styles.listes_users} list-items overflow-scroll open`}>

                        {
                            contributors.map((contributor) => {
                                const isOldContributor = editProject.oldContributors.find(
                                    (oldContributor) => oldContributor.user_id === contributor.id
                                  );


                                return(
                                <li data-id={contributor.id} onClick={(event) => { event.currentTarget.classList.toggle("checked"); event.currentTarget.classList.contains("checked" ? handleCheck(event) : "") }} className={`item ${isOldContributor ? "checked":""}`}>
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
                <input id='primary' className='w-50 btn btn-warning mt-3' type="submit" value="Edit" />

            </form>
        </div>

    </>

    )
}

