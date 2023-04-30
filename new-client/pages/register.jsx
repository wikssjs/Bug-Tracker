import { useState } from "react";
import Link from "next/link";
import styles from "../styles/authentification.module.css";

export default function Register() {
  //*State Variables
  const [firstname, setFirstName] = useState("");
  const [errorFirstname, setErrorFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!name) {
      return "Please enter a name";
    } else if (!nameRegex.test(name)) {
      return "Name can only contain letters";
    }
    return "";
  };

  //* Email validation function and state variables
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Please enter an email address";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };


  //* Username validation function and state variables
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!username) {
      return "Please enter a username";
    } else if (!usernameRegex.test(username)) {
      return "Username can only contain letters, numbers, and underscores";
    } else if (username.length < 3 || username.length > 16) {
      return "Username must be between 3 and 16 characters";
    }
    return "";
  };

  //* Password validation function and state variables
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const validatePassword = (password) => {
    if (!password) {
      return "Please enter a password";
    } else if (password.length < 4 || password.length > 32) {
      return "Password must be between 4 and 32 characters";
    }
    return "";
  };

  //*headers for the server request
  const [headers, setHeaders] = useState({});

  //* Handle the submit of the form to register the user
  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorFirstname = validateName(firstname);
    const errorLastname = validateName(lastname);
    const errorEmail = validateEmail(email);
    const errorUsername = validateUsername(username);
    const errorPassword = validatePassword(password);

    if (
      errorFirstname ||
      errorLastname ||
      errorEmail ||
      errorUsername ||
      errorPassword
    ) {
      setErrorFirstname(errorFirstname);
      setErrorLastname(errorLastname);
      setErrorEmail(errorEmail);
      setErrorUsername(errorUsername);
      setErrorPassword(errorPassword);
      return;
    }

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
    };

    const token = localStorage.getItem("token");
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `ksklkweiowekdl908w03iladkl ${token}`,
    });

    let response = await fetch(
      `http://192.168.0.53:5000/user/register`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user),
      }
    );

    if (response.ok) {
      window.location.href = "/connexion";
    } else {
      setError("Email or password incorrect");
    }
  };

  return (
    <main className="container">
      <div className="row d-flex h-100">
        <div className="col-md-6 mx-auto my-auto align-items-center d-flex justify-content-center">
          <div className={`${styles.card} card shadow-lg`}>
            <div className="card-header">
              <h3 className="text-center">SignUp</h3>
            </div>
            <div className="card-body">
              <form
                onSubmit={handleSubmit}
                className={styles.form_auth}
                noValidate
              >
                <div className="d-flex gap-2">
                  <div className={`${styles.form_group} form-group`}>
                    <label htmlFor="firtname">FirstName</label>
                    <input
                      required
                      type="text"
                      name="firstname"
                      id="firstName"
                      className="form-control"
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    {errorFirstname && (
                      <span className="text-danger">{errorFirstname}</span>
                    )}
                  </div>
                  <div className={`${styles.form_group} form-group`}>
                    <label htmlFor="lastname">LastName</label>
                    <input
                      required
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="form-control"
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    {errorLastname && (
                      <span className="text-danger">{errorLastname}</span>
                    )}
                  </div>
                </div>
                <div className={`${styles.form_group} form-group`}>
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  {errorEmail && (
                    <span className="text-danger">{errorEmail}</span>
                  )}
                </div>
                <div className={`${styles.form_group} form-group`}>
                  <label htmlFor="username">Username</label>
                  <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  {errorUsername && (
                    <span className="text-danger">{errorUsername}</span>
                  )}
                </div>
                <div className={`${styles.form_group} form-group`}>
                  <label htmlFor="password">Password</label>
                  <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {errorPassword && (
                    <span className="text-danger">{errorPassword}</span>
                  )}
                </div>
                <div
                  className={`${styles.form_group} form-group d-flex justify-content-center`}
                >
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <div>
                  <label htmlFor="username">
                    {" "}
                    <Link href="/connexion">
                      {" "}
                      Already have an account? Login
                    </Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
