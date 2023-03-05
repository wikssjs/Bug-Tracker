import styles from '../styles/ProjectPopup.module.css'
import { useEffect, useState } from 'react';

export default function ProjectPopup({ setShowPopup,setNotification, setAddProject }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contributors, setContributors] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);



    useEffect(() => {
        fetch('http://192.168.0.26:5000/users')
            .then(res => res.json())
            .then(data => setContributors(data.users))
    }, [])

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
        if(event){

            event.preventDefault();
        }

        let data = {
            name: name,
            description: description,
            contributors: users
        }

        //post request
        let response = await fetch('http://192.168.0.26:5000/add-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if (response.ok) {
            setNotification({ show: true, name: name });
            setShowPopup(false);
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
    }


    return (<>

<div className={`${styles.popup} popup shadow-lg text-center row rounded-3`}>
    <button onClick={closePopup} className='btn'><i class="bi bi-x-circle-fill abosolute"></i></button>
    <form className='d-flex flex-column align-items-center' onSubmit={handleSumit}>
        <h1>Add a new Project</h1>
        <label htmlFor="">
            <input className='form-control' type="text" placeholder='Project' required onChange={handleNameChange} />
        </label>


        <label htmlFor="">
            <textarea name="" id="" cols="30" rows="10" placeholder='Description' required onChange={handleDescriptionChange}></textarea>
        </label>

        <div className='w-100'>
            <select required className={`${styles.select} w-75 text-center`} multiple={true} onChange={handleOptionSelect}>
                {contributors.map((option) => (
                    <option data-id={option.id} key={option.id} value={option.username} className={`${styles.option} ${selectedOptions.includes(option.username) ? 'bg-info' : ''} ${option.id}`}>
                        {option.username}
                    </option>
                ))}
            </select>
        </div>
        <input id='primary' className='w-50 btn btn-success mt-3' type="submit" value="Add" />

    </form>
</div>
   
    </>

    )
}

