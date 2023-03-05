import styles from '../styles/Tickets.module.css'
import Link from 'next/link'

export default function Tickets() {
  return (
    <div className="row mt-4 w-75 m-auto">
      <div className="col-md-12">
        <table className={`${styles.tickets} table shadow-lg rounded-5`}>
          <thead className="">
            <tr>
              <th className="w-25">ID</th>
              <th className="w-25">Project</th>
              <th className="w-25">Ticket</th>
              <th className="w-25">Status</th>
              <th className="w-25">Priority</th>
            </tr>
          </thead>
          <tbody>
              <tr className='' onMouseOver={()=>{}}>
                <td>1</td>
                <td>UI Bug</td>
                <td><span className="text-dark text-wrap"> unde officia id culpa.</span></td>
                <td><span className="badge badge-warning">In Progress</span></td>
                <td>Higth</td>
              </tr>
            <tr>
              <td>2</td>
              <td>Functionality Bug</td>
              <td><span className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, architecto!</span></td>
              <td> <span className="badge badge-success">Open</span></td>
              <td><span>Low</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Performance Bug</td>
              <td><span className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, praesentium?</span></td>
              <td><span className="badge badge-danger">Closed</span></td>
              <td>Medium</td>

            </tr>
            <tr>
              <td>3</td>
              <td>Performance Bug</td>
              <td><span className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, praesentium?</span></td>
              <td><span className="badge badge-danger">Closed</span></td>
              <td>Medium</td>

            </tr>
            <tr>
              <td>3</td>
              <td>Performance Bug</td>
              <td><span className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, praesentium?</span></td>
              <td><span className="badge badge-danger">Closed</span></td>
              <td>Medium</td>

            </tr>
            <tr>
              <td>3</td>
              <td>Performance Bug</td>
              <td><span className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, praesentium?</span></td>
              <td><span className="badge badge-danger">Closed</span></td>
              <td>Medium</td>

            </tr>
          </tbody>

        </table>
      </div>
    </div>
  )
}