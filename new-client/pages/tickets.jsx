import styles from '../styles/Tickets.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TicketPopup from '../component/TicketPopup';

export default function Tickets() {
  const [showPopup, setShowPopup] = useState(false);
  const [tickets, setTickets] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5

  const router = useRouter();



  useEffect(() => {

    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': `ksklkweiowekdl908w03iladkl`
    };
    fetch('https://james-bug-api.herokuapp.com/tickets', { headers: headers })
      .then(res => res.json())
      .then(data => setTickets(data.tickets))
  }, [])


  function redirectUser(event) {
    const ticket_id = event.currentTarget.dataset.ticket_id;
    const project_id = event.currentTarget.dataset.project_id;
    router.push(`/ticket?ticket_id=${ticket_id}&project_id=${project_id}`)
  }

  function getData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tickets.slice(startIndex, endIndex);
  }

  const data = getData();
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const pages = Array.from(Array(totalPages).keys());



  function goToNextPage() {
    setCurrentPage(prevPage => prevPage + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(prevPage => prevPage - 1);
  }

  return (
    <main className={`${styles.tickets_wrapper} row mt-4 w-75 m-auto`}>
      <div className="col-md-12 h-25">
        <table className={`${styles.tickets} table shadow-lg rounded-5`}>
          <thead className="">
            <tr >
              <th className="">Project</th>
              <th className="w-25">Ticket</th>
              <th className="w-25">Status</th>
              <th className="">Priority</th>
              <th className="w-25">Reported By</th>
              <th className="w-100">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ticket) => (
              <tr data-project_id={ticket.project_id} data-ticket_id={ticket.id} onClick={redirectUser} key={ticket.id} className=''>
                <td>{ticket.name}</td>
                <td><span className="text-dark text-wrap">{ticket.title}{ticket.id}</span></td>
                <td><span className="">{ticket.status}</span></td>
                <td>{ticket.priority}</td>
                <td>{ticket.username}</td>
                <td>{ticket.date_range}</td>
              </tr>
            ))}
          </tbody>

          <div className={styles.pagination}>

            <button className={styles.pagination_button} onClick={goToPreviousPage} disabled={currentPage === 1} >prev</button>
            {pages.map((page) => { return <button key={page+1} className={`${styles.pagination_button} ${page + 1 === currentPage ? `${styles.active}` : ""}`} onClick={() => setCurrentPage(page + 1)}>{page + 1}</button> })}
            <button className={styles.pagination_button} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>

        </table>
      </div>

    </main>
  )
}