import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from '../../styles/Project.module.css';
import TicketPopup from '../../component/TicketPopup';


export default function Project() {
  const router = useRouter();
  const { id } = router.query;

  //fect api
  const [project, setProject] = useState([]);
  const [team, setTeam] = useState([]);
  const [showUserPopPup, setShowUserPopPup] = useState(false);
  const [showTicketPopPup, setShowTicketPopPup] = useState(false);
  const [contributors, setContributors] = useState([]);
  const [chekedBoxes, setChekedBoxes] = useState([]);
  const popupRef = useRef(null);
  const [fetchData, setFetchData] = useState(false);


  const[str1, setStr1] = useState('1697b194-8f6e-4a21-983a-35b979e9bc73');
  const[str2, setStr2] = useState('04fc6d34-3deb-46b8-9139-8f75ba4439de');

  let array = [];

  useEffect(() => {
    fetch(`http://192.168.0.26:5000/project/${id}`)
      .then(res => res.json())
      .then((data) => {


        fetch('http://192.168.0.26:5000/users')
          .then(res => res.json())
          .then(data => setContributors(data.users))


        setProject(data.project);
        setTeam(data.team);
      }
      )
  }, [fetchData])

  let tour = 0;
  useEffect(() => {


  }, [])

  useEffect(() => {

    if (tour === 0) {
      const oldContributorIds = team.map(
        (oldContributor) => {
          return oldContributor.id
        }
      );
      setChekedBoxes(oldContributorIds);
    }
    tour++;

  }, [team]);

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowTicketPopPup(false);
      setShowUserPopPup(false);
    }
  };

  function handleCheck(event) {
    if (!event.currentTarget.classList.contains('checked')) {
      setChekedBoxes(chekedBoxes.filter(box => box !== Number(event.currentTarget.dataset.id)));
    }
    else {
      setChekedBoxes([...chekedBoxes, Number(event.currentTarget.dataset.id)]);
    }
  }



  function handleUserPopup() {
    setShowUserPopPup(!showUserPopPup);
  }

  function handleTicketPopup() {
    setShowTicketPopPup(!showTicketPopPup);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const title = data.get('title');
    const description = data.get('description');
    const priority = data.get('priority');
    const status = data.get('status');
    const type = data.get('type');
    const assignee = data.get('assignee');
  }


  async function addMembers() {
    let data = {
      project_id: id,
      users: chekedBoxes
    }

    console.log(data)

    let response = await fetch('http://192.168.0.26:5000/project/add-members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setFetchData(!fetchData);
      setShowUserPopPup(false);
    }
  }



  return (
    <>
      <div className='col position-relative'>
        <h1>Project {id}</h1>
        {/* <h2>{team && team[0].name}</h2> */}

        <div className={`${styles.editProject} row gap-5 mx-5`}>
          <div className='col shadow-lg'>
            <div className='row'>

              <h1 className='col'>Team</h1>
              <button onClick={handleUserPopup} className={`${styles.newButton} btn btn-primary`}>Manage Member</button>
            </div>

            <div className={styles.tickets}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    team && team.map((user) => (
                      <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button className='btn'><i class="bi bi-three-dots-vertical"></i></button>
                        </td>
                      </tr>
                    ))
                  }


                </tbody>

              </table>
            </div>

          </div>

          <div className={`col shadow-lg`}>
            <div className='row'>

              <h1 className='col'>Tikects</h1>
              <button onClick={handleTicketPopup} className={`${styles.newButton} btn btn-primary`}>New Ticket{str1 === id ? " true":id}</button>
            </div>

            <div className={styles.tickets}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Description</th>
                    <th>Reporter</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    project && project.map((user) => (
                      <tr>
                        <td>{user.title}</td>
                        <td>{user.description}</td>
                        <td>{user.username}</td>
                        <td>
                          <button className='btn'><i class="bi bi-three-dots-vertical"></i></button>
                        </td>
                      </tr>
                    ))
                  }


                </tbody>

              </table>
            </div>

          </div>

        </div>
        {showUserPopPup &&
          <div ref={popupRef} className={`${styles.popup} shadow-lg d-flex flex-column align-items-center gap-5`}>

            <div className={styles.users}>
              <div class="select-btn open">
                <span class="btn-text">Select Users</span>
                <span class="arrow-dwn">
                  <i class="fa-solid fa-chevron-down"></i>
                </span>
              </div>

              <ul className={`${styles.listes_users} list-items overflow-scroll open`}>

                {
                  contributors.map((contributor) => {

                    const isOldcontributor = team.find((user) => user.id === contributor.id);

                    return (
                      <li data-id={contributor.id} onClick={(event) => { event.currentTarget.classList.toggle("checked"); event.currentTarget.classList.contains("checked" ? handleCheck(event) : "") }} className={`item ${isOldcontributor ? "checked" : ""}`}>
                        <span class="checkbox">
                          <i class="bi bi-check-lg check-icon"></i>
                        </span>
                        <span class="item-text">{contributor.username}</span>
                      </li>
                    )
                  })
                }

              </ul>
            </div>
            <button onClick={addMembers} className={`${styles.submit} btn-success`}>Add selected Member</button>
          </div>
        }
        {
          showTicketPopPup && <TicketPopup setFetchData={setFetchData} setShowTicketPopPup={setShowTicketPopPup} project_id={id} />
        }

      </div>
    </>
  );
}
