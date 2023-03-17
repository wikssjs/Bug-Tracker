import { useEffect, useState, useRef } from 'react'
import styles from '../styles/Admin.module.css'


export default function Admin() {
    const[fetchData, setFetchData] = useState(false)
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const [LastName, setLastName] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Role, setRole] = useState('')
    const formRef = useRef(null);

    const [headers, setHeaders] = useState({});


    useEffect(() => {
        const token = localStorage.getItem('token');
        setHeaders({
            'Content-Type': 'application/json',
            'Authorization': `ksklkweiowekdl908w03iladkl ${token}`
        });

        fetch('http://192.168.0.26:5000/users', { headers: headers })
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }, [fetchData])


    function handleClick(event) {
        const id = event.currentTarget.dataset.id;
        const user = users.filter((user) => user.id === Number(id))[0];

        formRef.current.reset();
        setIndex(users.indexOf(user))
        setLastName(user.nom)
        setFirstName(user.prenom)
        setUsername(user.username)
        setEmail(user.email)
        setRole(user.role)
    }

    function handleChange(event) {
        setRole(event.currentTarget.value)
    }

    async function handleSubmit(event) {
        event.preventDefault();


        const user = {
            id: users[index].id,
            nom: LastName,
            prenom: FirstName,
            username:Username,
            email: Email,
            role: Role
        }

        const response = await fetch('http://192.168.0.26:5000/edit-user', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(user)
        })

        if(response.ok){
            setLastName('')
            setFirstName('')
            setUsername('')
            setEmail('')
            setRole('')
            setFetchData(!fetchData)
        }
    }



    return (
        <main className={`${styles.admin} col container-fluid px-5 mt-5`}>

            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header">
                            <h3 className="card-title">Users</h3>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user) => {
                                            return (
                                                <tr key={user.id} data-id={user.id} onClick={handleClick}>
                                                    <td>{user.nom} {user.prenom}</td>
                                                    <td>{user.role}</td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header">
                            <h3 className="card-title">Projects</h3>
                        </div>
                        <div className="card-body">
                            <form action="" ref={formRef} onSubmit={handleSubmit}>

                                <div className="form-group row">
                                    <label className='col' htmlFor="projectName">
                                        LastName
                                        <input defaultValue={LastName} type="text" className="form-control" required/>
                                    </label>

                                    <label htmlFor="" className='form-group col'>

                                        FirstName
                                        <input defaultValue={FirstName} type="text" className="form-control col" required />
                                    </label>
                                </div>
                                <div className="form-group row">
                                    <label className='col' htmlFor="projectName">
                                        Username
                                        <input defaultValue={Username} type="text" className="form-control" required />
                                    </label>

                                    <label htmlFor="" className='form-group col'>

                                        Email
                                        <input defaultValue={Email} type="text" className="form-control col" required />
                                    </label>
                                </div>
                        
                                <div>
                                    
                                    <select value={Role} onChange={handleChange} required name="" id="" className="form-control">
                                        <option value="Admin">Admin</option>
                                        <option value="Developer">Developer</option>
                                    </select>
                                    <label htmlFor="" className={styles.status}>
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            
        </main>

    )
}