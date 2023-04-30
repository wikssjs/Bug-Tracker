import { useState } from 'react';
import styles from '../styles/AcountMenu.module.css';

export default function AccountMenu({setCurrentUser}) {
  // State for the popup visibility
  const [popup, setPopup] = useState(true);
  const [headers, setHeaders] = useState({});

  // Toggle the popup visibility with a delay
  const handlePopup = () => {
    const timeOut = setTimeout(() => {
      setPopup(!popup);
    }, 100);

    return () => clearInterval(timeOut);
  };

  // Logout user and remove token from local storage
  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      let response = await fetch('https://james-bug-api.herokuapp.com/user/logout', {
        method: 'POST',
        headers: headers,
      });
      if (response.ok) {
        localStorage.removeItem('token');
        setPopup(!popup);
        setCurrentUser({});
        }
    } catch (error) {
      console.error(error);
    }
  };

  // Navigate to the settings page
  const goToSettings = () => {
    setPopup(!popup);
  };

  return (
    <div className="mr-2">
      <div className={styles.logo} onClick={handlePopup}>
        <i className="bi bi-person-circle"></i>
      </div>

      {!popup && (
        <div className={`shadow-lg rounded-2 ${styles.hide}`}>
          <ul
            className={`${styles.liste} d-flex flex-column gap-3 justify-content-center`}
          >
            <li className="d-flex gap-2 align-items-center" onClick={goToSettings}>
              <i className="bi bi-gear-wide-connected"></i>
              Settings
            </li>

            <li className="d-flex">
              <form onSubmit={handleLogout}>
                <button
                  className={`${styles.logOut} btn btn-danger`}
                  type="submit"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  LogOut
                </button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
