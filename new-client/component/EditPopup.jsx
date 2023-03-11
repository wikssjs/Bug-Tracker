import styles from '../styles/ProjectPopup.module.css'
import { useEffect, useState, useRef } from 'react';

export default function EditPopup({ setShowEditPopup, setNotification, editProject }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contributors, setContributors] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [chekedBoxes, setChekedBoxes] = useState([]);
    const itemRef = useRef(null);

    let array = [];
    let james = [];
    let tour = 0;

    useEffect(() => {
        fetch('http://192.168.0.26:5000/users')
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
            console.log(chekedBoxes)
            setChekedBoxes(chekedBoxes.filter(box => box !== Number(event.currentTarget.dataset.id)));
        }
        else {
            console.log(chekedBoxes)
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



        console.log(data);


        //post request
        let response = await fetch('http://192.168.0.26:5000/edit-project', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            setNotification({ show: true, name: name, message: 'has been edited' });
            setShowEditPopup(false);
        }
        else {
            alert('error')
        }

    }

    function handleOptionSelect(event) {
        const selectedOption = event.target.value;


        if (selectedOptions.includes(selectedOption)) {
            setSelectedOptions(selectedOptions.filter(option => option !== selectedOption));
        } else {
            setSelectedOptions([...selectedOptions, selectedOption]);
        }

        contributors.forEach((contributor) => {
            if (contributor.username === selectedOption) {
                if (users.includes(contributor)) {
                    setUsers(users.filter(user => user.username !== contributor.username));
                }
                else {

                    setUsers([...users, contributor]);
                }
            }
        });
        console.log("users")
        console.log(users)
        console.log("users")
    }


    return (<>

        <div className={`${styles.popup} popup shadow-lg text-center row rounded-3`}>
            <button onClick={closePopup} className='btn'><i class="bi bi-x-circle-fill abosolute"></i></button>
            <form className='d-flex flex-column' onSubmit={handleSumit}>
                <h1>Edit a Project</h1>
                <label>
                    <input defaultValue={editProject.project.name} contentEditable="false" className='form-control' type="text" placeholder='Project' required onChange={handleNameChange} />
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

