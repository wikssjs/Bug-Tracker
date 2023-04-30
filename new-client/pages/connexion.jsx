import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/authentification.module.css";
import { useLoader } from "../component/LoaderContext";
import { useCurrentUser } from "../component/CurrentUserContext";
import { Jwt } from "jsonwebtoken";

export default function Connexion() {
  //* State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [headers, setHeaders] = useState({});
  const {setCurrentUser,currentUser} = useCurrentUser();
  const { showLoader, hideLoader } = useLoader();

  //* Router
  const router = useRouter();

  //* Set Headers For the Api
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `ksklkweiowekdl908w03iladkl ${token}`,
    });
  }, [currentUser,router]);

  /**
   * *Handle the submit of the form to log the user
   * @param {The element that triggered the event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      let response = await fetch(
        `https://james-bug-api.herokuapp.com/user/login`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        showLoader();
        const { token } = await response.json();
        localStorage.setItem("token", token);
        window.location.href = "/";

      } else {
        setError("Email or password incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * *Log the demo user
   */
  const logDemoUser = async () => {
    const user = {
      email: "james@gmail.com",
      password: "james",
    };

    try {
      let response = await fetch(
        `https://james-bug-api.herokuapp.com/user/login`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        showLoader();
        const { token } = await response.json();
        localStorage.setItem("token", token);
      } else {
        setError("Email or password incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
      <div className="row d-flex container m-auto mt-5">
        <div className="col-md-6 mx-auto my-auto d-flex justify-content-center">
          <div className={`${styles.card} card shadow-lg`}>
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className={styles.form_auth}>
                <div className={`${styles.form_group} form-group`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className={`${styles.form_group} form-group`}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div
                  className={`${styles.form_group} form-group d-flex justify-content-center`}
                >
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div
                  className={`${styles.form_group} form-group d-flex justify-content-center`}
                >
                  <button
                    onClick={logDemoUser}
                    className="btn btn-primary btn-lg"
                  >
                    Demo Login
                  </button>
                </div>
                <div>
                  <label htmlFor="username">
                    {" "}
                    <Link href="/register">
                      {" "}
                      dont have an account? Register
                    </Link>
                  </label>
                </div>
                <div className="form-group text-center">
                  <p className="text-danger">{error}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
