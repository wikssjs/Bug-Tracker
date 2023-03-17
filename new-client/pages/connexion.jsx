import {useState } from 'react';
import Link from 'next/link';
import styles from '../styles/authentification.module.css';

export default function Connexion(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email: email,
            password: password
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-API-Key': `ksklkweiowekdl908w03iladkl`
          };
        let response  = await fetch(`https://james-bug-api.herokuapp.com/user/login`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user)

        });

        if(response.ok){
           
            window.location.href = "/";
        }

        else{
            setError("Email or password incorrect");
        }

    }

    return (
        <main className="container col">
            <div className="row d-flex h-100">
                <div className="col-md-6 mx-auto my-auto">
                    <div className={`${styles.card} card shadow-lg`}>
                        <div className="card-header">
                            <h3 className='text-center'>login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className={styles.form_auth}>
                                <div className={`${styles.form_group} form-group`}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" className="form-control" onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div  className={`${styles.form_group} form-group`}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div  className={`${styles.form_group} form-group d-flex justify-content-center`}>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <div>
                                <label htmlFor="username"> <Link href="/register"> dont have an account? Register</Link></label>
                                </div>
                                <div className="form-group text-center">
                                    <p className="text-danger">{error}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}