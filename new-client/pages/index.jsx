import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Activity from "../component/Activity";
import EditPopup from "../component/EditPopup";
import ProjectPopup from "../component/ProjectPopup";
import styles from "../styles/Accueil.module.css";
import Notification from "../component/Notification";

export default function Main({ user }) {
  //* State Variables
  const [projects, setProjects] = useState({
    projects: [],
    contributors: [],
    activities: [],
  });
  const [currentUser, setCurrentUser] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [addProjet, setAddProject] = useState({
    name: "",
    description: "",
    contributors: [],
  });

  const [notification, setNotification] = useState({
    show: false,
    name: "",
    message: "",
  });

  const [editProject, setEditProject] = useState({
    project: {},
    contributors: [],
    oldContributors: [],
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  //* Router
  const router = useRouter();

  //* Pagination
  function getData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.projects.slice(startIndex, endIndex);
  }

  const data = getData();
  const totalPages = Math.ceil(projects.projects.length / itemsPerPage);
  const pages = Array.from(Array(totalPages).keys());

  //* Go to next page
  function goToNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  //* Go to previous page
  function goToPreviousPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  //* Fetch projects
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    if (!decoded || decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      router.push("/connexion");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `ksklkweiowekdl908w03iladkl ${token}`,
    };

    fetch("https://james-bug-api.herokuapp.com/", { headers: headers })
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [fetchData,router]);

  //* Show the notification when a project is added or edited
  useEffect(() => {
    let interval = setTimeout(() => {
      setNotification({ show: false, name: "", message: "" });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [notification]);

  //* Handle the popup change
  function handlePopup() {
    setShowPopup(true);
  }

  //* Handle the edit popup change
  function handleEdit(event) {
    let id = event.currentTarget.dataset.id;
    let project = projects.projects.find(
      (project) => project.id === Number(id)
    );
    const oldContributors = projects.contributors.filter(
      (contributor) => contributor.project_id === Number(id)
    );
    setEditProject({
      project: project,
      contributors: projects.contributors,
      oldContributors: oldContributors,
    });
    setShowEditPopup(true);
  }

  if(!user) {
    return <div>loading...</div>
  }
  return (
    <main className="col-sm-10 main-content h-100 d-flex flex-column align-items-center m-auto">
      {
        //*Popup  to add a project
        showPopup && (
          <ProjectPopup
            selectedOption={selectedOptions}
            setSelectedOption={setSelectedOptions}
            setShowPopup={setShowPopup}
            setNotification={setNotification}
            setAddProject={setAddProject}
            setFetchData={setFetchData}
            fetchData={fetchData}
          />
        )
      }

      <div className="row w-100">
        <div className="col-lg-4 text-center mt-3">
          <div className={`${styles.card} card bg-success text-white w-md-50`}>
            <div className="card-body">
              <h5 className="card-title">Open Bugs</h5>
              <p className="card-text">
                {projects.openBugs && projects.openBugs.openBugs}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center mt-3">
          <div className={`${styles.card} card bg-warning text-white`}>
            <div className="card-body">
              <h5 className="card-title">In Progress Bugs</h5>
              <p className="card-text">
                {projects.inProgressBugs &&
                  projects.inProgressBugs.inProgressBugs}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center mt-3">
          <div className={`${styles.card} card bg-danger text-white`}>
            <div className="card-body">
              <h5 className="card-title">Closed Bugs</h5>
              <p className="card-text">
                {projects.closedBugs && projects.closedBugs.closedBugs}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.projects} row mt-4 shadow-lg`}>
        <div className="d-flex justify-content-between">
          <h1>Projects </h1>
          <button
            onClick={handlePopup}
            className={`${styles.addButton} btn btn-success  d-flex gap-3`}
          >
            {" "}
            <span className="d-none d-md-flex">Add Project</span>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
        <div className={`${styles.table} col-md-12 col-12`}>
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Project</th>
                <th className={styles.desc}>Description</th>
                <th>Contributor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((project) => {
                return (
                  <tr key={project.id} className="">
                    {/* <td>{project.id}</td> */}
                    <td>
                      <Link
                        className={styles.name}
                        href={`/project/${project.id}`}
                      >
                        {" "}
                        {project.name}
                      </Link>
                    </td>
                    <td className={styles.desc}>{project.description}</td>
                    <td>
                      {projects.contributors.map((user) => {
                        if (user.project_id === project.id) {
                          return <p key={user.id}>{user.username}</p>;
                        }
                      })}
                    </td>
                    <button
                      onClick={handleEdit}
                      data-id={project.id}
                      data-name={project.name}
                      data-description={project.description}
                      className={`${styles.editButton} btn btn-primary bg-primary d-flex gap-2`}
                    >
                      <span className="d-none d-md-flex">Edit</span>{" "}
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.pagination_button}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pages.map((page) => {
            return (
              <button
                key={page + 1}
                className={`${styles.pagination_button} ${
                  page + 1 === currentPage ? `${styles.active}` : ""
                }`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            );
          })}
          <button
            className={styles.pagination_button}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Activity activities={projects.activities} />

      {showEditPopup && (
        <EditPopup
          setNotification={setNotification}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          setShowEditPopup={setShowEditPopup}
          editProject={editProject}
          setFetchData={setFetchData}
          fetchData={fetchData}
        />
      )}
      {
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      }
    </main>
  );
}
