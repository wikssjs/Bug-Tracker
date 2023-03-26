import styles from "../styles/Activity.module.css";
export default function Activity({ activities }) {
  return (
    <div className={`${styles.activity} text-center  my-5 shadow-lg`}>
      <h1 className="text-left">Activities</h1>
      <div className={styles.table_wrapper}>

      <table className={`${styles.table} table table-striped `}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">User</th>
            <th className="text-left" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => {
            return (
              <tr key={activity.id}>
                <td>{activity.created_at}</td>
                <td>{activity.username}</td>
                <td className="text-left">{activity.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
