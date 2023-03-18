import styles from "../styles/Tickets.module.css";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

export default function Tickets() {
  //*State Variables
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [headers, setHeaders] = useState({});
  const itemsPerPage = 8;

  //* Router
  const router = useRouter();


  //* Fetching tickets
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    if (!decoded) {
      router.push("/connexion");
    }
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `ksklkweiowekdl908w03iladkl ${token}`,
    });

    fetch("https://james-bug-api.herokuapp.com/tickets", { headers: headers })
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets));
  }, []);

  //* Redirecting to a ticket
  function redirectUser(event) {
    const ticket_id = event.currentTarget.dataset.ticket_id;
    const project_id = event.currentTarget.dataset.project_id;
    router.push(`/ticket?ticket_id=${ticket_id}&project_id=${project_id}`);
  }

  //* Pagination
  function getData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tickets.slice(startIndex, endIndex);
  }

  const data = getData();
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const pages = Array.from(Array(totalPages).keys());

  //* Go to next page
  function goToNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  //* Go to previous page
  function goToPreviousPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  return (
    <main className={`${styles.tickets_wrapper} row mt-4 m-auto w-75`}>
      <div className="col-md-12 h-25">
        <div className={`${styles.table_wrapper}`}>
          <table className={`${styles.tickets} table shadow-lg rounded-5`}>
            <thead className="">
              <tr>
                <th className="">Project</th>
                <th className="">Ticket</th>
                <th className="">Status</th>
                <th className="">Priority</th>
                <th className="">Reported By</th>
                <th className="">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ticket) => (
                <tr
                  data-project_id={ticket.project_id}
                  data-ticket_id={ticket.id}
                  onClick={redirectUser}
                  key={ticket.id}
                  className=""
                >
                  <td>{ticket.name}</td>
                  <td>
                    <span className="text-dark text-wrap">{ticket.title}</span>
                  </td>
                  <td>
                    <span className="">{ticket.status}</span>
                  </td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.username}</td>
                  <td>{ticket.date_range}</td>
                </tr>
              ))}
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
          {pages.map((page) => (
            <button
              key={page + 1}
              className={`${styles.pagination_button} ${
                page + 1 === currentPage ? `${styles.active}` : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className={styles.pagination_button}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
