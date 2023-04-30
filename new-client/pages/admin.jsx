import { useEffect, useState, useRef } from "react";
import styles from "../styles/Admin.module.css";
import { useCurrentUser } from "../component/CurrentUserContext";
import { useRouter } from "next/router";

export default function Admin() {

     const router = useRouter();
     const {currentUser} = useCurrentUser();

    useEffect(() => {
      if(!currentUser){
        router.push("/connexion");
    }
    }, [currentUser])


  //*State Variables
  const [fetchData, setFetchData] = useState(false);
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const formRef = useRef(null);
  const [headers, setHeaders] = useState({});

  //*Fetch Data when the FetchData state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `ksklkweiowekdl908w03iladkl ${token}`,
    });

    fetch("http://192.168.0.53:5000/users", { headers: headers })
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, [fetchData]);

  //*Handle Click on a user in the table
  function handleClick(event) {
    const id = event.currentTarget.dataset.id;
    const user = users.filter((user) => user.id === Number(id))[0];

    formRef.current.reset();
    setIndex(users.indexOf(user));
    setLastName(user.nom);
    setFirstName(user.prenom);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
  }

  //*Handle Submit of the form to edit a user
  async function handleSubmit(event) {
    event.preventDefault();

    const user = {
      id: users[index].id,
      nom: LastName,
      prenom: FirstName,
      username: Username,
      email: Email,
      role: Role,
    };

    const response = await fetch("http://192.168.0.53:5000/edit-user", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setLastName("");
      setFirstName("");
      setUsername("");
      setEmail("");
      setRole("");
      setFetchData(!fetchData);
    }
  }

  if (!currentUser) {
    return null
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
                  {users.map((user) => {
                    return (
                      <tr key={user.id} data-id={user.id} onClick={handleClick}>
                        <td>
                          {user.nom} {user.prenom}
                        </td>
                        <td>{user.role}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header">
              <h3 className="card-title">User Information</h3>
            </div>
            <div className="card-body">
              <form action="" ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label className="col" htmlFor="projectName">
                    LastName
                    <input
                      defaultValue={LastName}
                      type="text"
                      className="form-control"
                      required
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </label>

                  <label htmlFor="" className="form-group col">
                    FirstName
                    <input
                      defaultValue={FirstName}
                      type="text"
                      className="form-control col"
                      required
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group row">
                  <label className="col" htmlFor="projectName">
                    Username
                    <input
                      defaultValue={Username}
                      type="text"
                      className="form-control"
                      required
                      onChange={(event) => setUsername(event.ta.value)}
                    />
                  </label>

                  <label htmlFor="" className="form-group col">
                    Email
                    <input
                      defaultValue={Email}
                      type="text"
                      className="form-control col"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>

                <div>
                  <select
                    value={Role}
                    onChange={(event) => setRole(event.currentTarget.value)}
                    required
                    name=""
                    id=""
                    className="form-control"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                  </select>
                  <label htmlFor="" className={styles.status}></label>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
