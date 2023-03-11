import styles from '../styles/Tickets.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import TicketPopup from '../component/TicketPopup';

export default function Tickets() {
  const [showPopup, setShowPopup] = useState(false);
  const [tickets, setTickets] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3



  useEffect(() => {
    fetch('http://192.168.0.26:5000/tickets')
      .then(res => res.json())
      .then(data => setTickets(data.tickets))
  }, [])



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
    <div className={`${styles.tickets_wrapper} row mt-4 w-75 m-auto`}>
      <div className="col-md-12 h-25">
        <table className={`${styles.tickets} table shadow-lg rounded-5`}>
          <thead className="">
            <tr>
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
              <tr key={ticket.id} className=''>
                <td>{ticket.name}</td>
                <td><span className="text-dark text-wrap">{ticket.title}</span></td>
                <td><span className="">{ticket.status}</span></td>
                <td>{ticket.priority}</td>
                <td>{ticket.username}</td>
                <td>{ticket.created_at}</td>
              </tr>
            ))}
          </tbody>

          <div className={styles.pagination}>

            <button className={styles.pagination_button} onClick={goToPreviousPage} disabled={currentPage === 1} >prev</button>
            {pages.map((page) => { return <button className={`${styles.pagination_button} ${page + 1 === currentPage ? `${styles.active}` : ""}`} onClick={() => setCurrentPage(page + 1)}>{page + 1}</button> })}
            <button className={styles.pagination_button} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>

        </table>
      </div>

    </div>
  )
}