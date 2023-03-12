import styles from '../styles/ProjectPopup.module.css'
import { useEffect, useState, useRef } from 'react';

export default function ProjectPopup({ setShowPopup, setNotification, setAddProject }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contributors, setContributors] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [chekedBoxes, setChekedBoxes] = useState([]);
    const popupRef = useRef(null);




    useEffect(() => {
        fetch('http://192.168.0.26:5000/users')
            .then(res => res.json())
            .then(data => setContributors(data.users))
    }, [])

    useEffect(() => {
        // Add event listener to the document object
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Event handler to check if the click occurred outside of the popup
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

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
        setShowPopup(false);
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
            name: name,
            description: description,
            contributors: chekedBoxes
        }

        //post request
        let response = await fetch('http://192.168.0.26:5000/add-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log("datasend");

        console.log(data);
        console.log("datasend");

        if (response.ok) {
            setNotification({ show: true, name: name, message: 'has been created' });
            setShowPopup(false);
        }
        else {
            console.log('error')
        }

    }



    return (<>

        <div ref={popupRef} className={`${styles.popup} popup shadow-lg row rounded-3`}>
            <button onClick={closePopup} className='btn'><i class="bi bi-x-circle-fill abosolute"></i></button>
            <form className='d-flex flex-column' onSubmit={handleSumit}>
                <h1>Add a new Project</h1>
                <label htmlFor="">
                    <input className='form-control' type="text" placeholder='Project' required onChange={handleNameChange} />
                </label>


                <label htmlFor="">
                    <textarea name="" id="" cols="30" rows="10" placeholder='Description' required onChange={handleDescriptionChange}></textarea>
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
                <input id='primary' className='w-50 btn btn-success mt-3' type="submit" value="Add" />

            </form>
        </div>

    </>

    )
}

