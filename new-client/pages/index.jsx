import Link from 'next/link';
import { useEffect, useState } from 'react';
import Activity from '../component/Activity';
import ProjectPopup from '../component/ProjectPopup';
import Sidebar from '../component/Sidebar';
import styles from '../styles/Accueil.module.css'

export default function Main() {

  const [projects, setProjects] = useState({ projects: [], contributors: [] });
  const [showPopup, setShowPopup] = useState(false);
  const [addProjet, setAddProject] = useState({ name: '', description: '', contributors: [] });
  const [notification, setNotification] = useState({ show: false, name: '' });
  
  useEffect(() => {
    fetch('http://192.168.0.26:5000/')
      .then(res => res.json())
      .then(data =>  setProjects(data))
  }, [])


  useEffect(() => {
    setTimeout(() => {
      setNotification({ show: false, name: '' });
    }
      , 3000);
  }, [notification]);


  function handlePopup() {
    setShowPopup(true);
  }


  return (
    <div className="col-sm-10 main-content mt-2">
      {
        showPopup && <ProjectPopup setShowPopup={setShowPopup} setNotification={setNotification} setAddProject={setAddProject}/>
      } 
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">New Bugs</h5>
              <p className="card-text">5</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Open Bugs</h5>
              <p className="card-text">10</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Closed Bugs</h5>
              <p className="card-text">8</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.projects} row mt-4 shadow-lg`}>
        <div className='d-flex justify-content-between'>
          <h1>Projects</h1>
          <button onClick={handlePopup} className='btn btn-success btn-sm'>Add Project   <i className='bi bi-plus-circle'></i></button>
        </div>
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Ticket</th>
                <th>Contributor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className=''>

              {
                projects.projects.map((project) => {
                  return (
                    <tr key={project.id} className="">
                      <td>{project.id}</td>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>{projects.contributors.map((user)=>{
                        if(user.project_id === project.id){
                          return <p>{user.username}</p>
                        }
                      })}</td>
                      <button className='btn btn-primary bg-primary'>Edit <i className='bi bi-pencil-square'></i></button>
                    </tr>
                  )
                })
              }

            </tbody>

          </table>
        </div>
      </div>
      <Activity />
      {
        notification.show && (
            <div className={`${styles.notification} shadow-lg animate__animated animate__fadeInRight`}>
                <p>The project <span className='text-info'>{notification.name}</span> {notification.name} has been created</p>
            </div>
        )
    }
    </div>
  )

}
