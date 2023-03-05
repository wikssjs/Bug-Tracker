import styles from '../styles/Admin.module.css'


export default function Admin() {
    return (
        <div className={`${styles.admin} col-md container-fluid px-5 mt-5`}>

            <h1 className="">Admin</h1>

            <div className="row mt-5">
                <div className="col">
                    <div className="row gap-5">

                        <div className="col shadow-lg">
                            <h2>Developers</h2>

                            <p>James</p>
                            <p>James</p>
                            <p>James</p>
                        </div>

                        <div className="col shadow-lg">
                            <h2>Edit information</h2>
                            <p>James</p>
                            <p>James</p>
                            <p>James</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}