import Link from 'next/link';
import { useEffect, useState } from 'react';
import Activity from '../component/Activity';
import EditPopup from '../component/EditPopup';
import ProjectPopup from '../component/ProjectPopup';
import styles from '../styles/Accueil.module.css'
import Notification from '../component/Notification';

export default function Main() {

  const [projects, setProjects] = useState({ projects: [], contributors: [] });
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [addProjet, setAddProject] = useState({ name: '', description: '', contributors: [] });
  const [notification, setNotification] = useState({ show: false, name: '', message: '' });
  const [editProject, setEditProject] = useState({ project: {}, contributors: [], oldContributors: [] });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3


  function getData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.projects.slice(startIndex, endIndex);
  }

  const data = getData();
  const totalPages = Math.ceil(projects.projects.length / itemsPerPage);
  const pages = Array.from(Array(totalPages).keys());




  function goToNextPage() {
    setCurrentPage(prevPage => prevPage + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(prevPage => prevPage - 1);
  }

  useEffect(() => {

    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': `ksklkweiowekdl908w03iladkl`
    };

    fetch('https://james-bug-api.herokuapp.com/', { headers: headers })
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [notification])

  useEffect(() => {


    let interval = setTimeout(() => {
      setNotification({ show: false, name: '', message: '' });
    }
      , 3000);

    return () => {
      clearInterval(interval);
    }

  }, [notification]);


  function handlePopup() {
    setShowPopup(true);
  }

  function handleEdit(event) {
    let id = event.target.dataset.id;
    let project = projects.projects.find(project => project.id === Number(id));
    const oldContributors = projects.contributors.filter(contributor => contributor.project_id === Number(id));
    setEditProject({ project: project, contributors: projects.contributors, oldContributors: oldContributors });
    setShowEditPopup(true);

  }

  return (
    <main className="col-sm-10 main-content mt-2 h-100">
      {
        showPopup && <ProjectPopup selectedOption={selectedOptions} setSelectedOption={setSelectedOptions} setShowPopup={setShowPopup} setNotification={setNotification} setAddProject={setAddProject} />
      }
      <div className="row">
        <div className="col-md-4 text-center">
          <div className={`${styles.card} card bg-success text-white`}>
            <div className="card-body">
              <h5 className="card-title">Open Bugs</h5>
              <p className="card-text">{projects.openBugs && projects.openBugs.openBugs}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className={`${styles.card} card bg-warning text-white`}>
            <div className="card-body">
              <h5 className="card-title">In Progress Bugs</h5>
              <p className="card-text">{projects.inProgressBugs && projects.inProgressBugs.inProgressBugs}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className={`${styles.card} card bg-danger text-white`}>
            <div className="card-body">
              <h5 className="card-title">Closed Bugs</h5>
              <p className="card-text">{projects.closedBugs && projects.closedBugs.closedBugs}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.projects} row mt-4 shadow-lg`}>
        <div className='d-flex justify-content-between'>
          <h1>Projects {totalPages}</h1>
          <button onClick={handlePopup} className={`${styles.addButton} btn btn-success btn-sm d-flex gap-3`}>Add Project <i className='bi bi-plus-circle'></i></button>
        </div>
        <div className={`${styles.table} col-md-12`}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Description</th>
                <th>Contributor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className=''>

              {
                data.map((project) => {
                  return (
                    <tr key={project.id} className="">
                      <td>{project.id}</td>
                      <td><Link className={styles.name} href={`/project/${project.id}`}> {project.name}</Link></td>
                      <td>{project.description}</td>
                      <td>{projects.contributors.map((user) => {
                        if (user.project_id === project.id) {
                          return <p key={user.id}>{user.username}</p>
                        }
                      })}</td>
                      <button onClick={handleEdit} data-id={project.id} data-name={project.name} data-description={project.description} className={`${styles.editButton} btn btn-primary bg-primary d-flex gap-2`}>Edit <i className='bi bi-pencil-square'></i></button>
                    </tr>
                  )
                })
              }

            </tbody>

          </table>
          <div className={styles.pagination}>

            <button className={styles.pagination_button} onClick={goToPreviousPage} disabled={currentPage === 1} >prev</button>
            {pages.map((page) => { return <button key={page+1} className={`${styles.pagination_button} ${page + 1 === currentPage ? `${styles.active}` : ""}`} onClick={() => setCurrentPage(page + 1)}>{page + 1}</button> })}
            <button className={styles.pagination_button} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
      <Activity />

      {showEditPopup && (
        <EditPopup
          setNotification={setNotification}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          setShowEditPopup={setShowEditPopup}
          editProject={editProject} />
      )
      }
      {
         <Notification notification={notification} setNotification={setNotification} />
      }
    </main>
  )

}
