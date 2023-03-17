import React, { useState } from 'react'
import styles from '../styles/authentification.module.css'

export default function Register() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-API-Key': `ksklkweiowekdl908w03iladkl`
          };


        let response = await fetch(`https://james-bug-api.herokuapp.com/user/register`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user)

        });

        if (response.ok) {
            window.location.href = "/connexion";
        }

        else {
            alert("user not created");
            setError("Email or password incorrect");
        }

    }

    return (
        <main className="container col">
            <div className="row d-flex h-100">
                <div className="col-md-6 mx-auto my-auto">
                    <div className={`${styles.card} card shadow-lg`}>
                        <div className="card-header">
                            <h3 className='text-center'>SignUp</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className={styles.form_auth}>
                                <div className='d-flex gap-2'>

                                <div className={`${styles.form_group} form-group`}>
                                    <label htmlFor="firtname">FirstName</label>
                                    <input type="text" name="firstname" id="firstName" className="form-control" onChange={(event) => setFirstName(event.target.value)} />
                                </div>
                                <div className={`${styles.form_group} form-group`}>
                                    <label htmlFor="lastname">LastName</label>
                                    <input type="text" name="lastname" id="lastname" className="form-control" onChange={(event) => setLastName(event.target.value)} />
                                </div>
                                </div>
                                <div className={`${styles.form_group} form-group`}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className="form-control" onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div className={`${styles.form_group} form-group`}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" onChange={(event) => setUsername(event.target.value)} />
                                </div>
                                <div className={`${styles.form_group} form-group`}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className={`${styles.form_group} form-group d-flex justify-content-center`}>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}