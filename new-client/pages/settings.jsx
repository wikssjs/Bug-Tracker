import styles from '../styles/Settings.module.css'
import { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import jwt from 'jsonwebtoken';
import pkg from 'bcryptjs';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../component/CurrentUserContext';


export default function Settings() {
    const {currentUser,setCurrentUser} = useCurrentUser();
    const router = useRouter();
    const [headers, setHeaders] = useState({});


    useEffect(() => {
        if(!currentUser){
            router.push('/connexion');
        }
        const token = localStorage.getItem("token");
        setHeaders({
            "Content-Type": "application/json",
            Authorization: `ksklkweiowekdl908w03iladkl ${token}`,
        });

    }, []);

    const [inputValues, setInputValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });

    useMemo(() => {
        if (currentUser) {
            setInputValues({
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                username: currentUser.username,
                email: currentUser.email,
            });
        }
    }, [currentUser]);
    console.log("currentUser");

    console.log(inputValues);
    console.log("currentUser");


    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = (event) => {
        event.preventDefault();
         if(inputValues.username === currentUser.username && inputValues.firstName === currentUser.firstName && inputValues.lastName === currentUser.lastName) {
            return;
        }
        
        setShowModal(true);

        disableEdits('firstName');
        disableEdits('lastName');
        disableEdits('username');
    }

    const handleConfirmChanges = () => {
        handleSubmit();

        handleClose();
    };

    const [editableFields, setEditableFields] = useState({
        firstName: false,
        lastName: false,
        username: false,
    });


    const handleEditClick = (field) => {
        setEditableFields((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const disableEdits = (field) => {
        setEditableFields((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };


    const handleChange = (e, field) => {
        setInputValues((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };


    const handleSubmit = async () => {

        const user = {
            id: inputValues.id,
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            username: inputValues.username,
            email: inputValues.email,
        };

        if(inputValues.firstName === '') {
            user.firstName = currentUser.firstName;
        }
        if(inputValues.lastName === '') {
            user.lastName = currentUser.lastName;
        }
        if(inputValues.username === '') {
            user.username = currentUser.username;
        }
        



        const response = await fetch("http://192.168.0.53:5000/edit-user-account", {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(user),
        });

        if (response.ok) {
            let data = await response.json();
            const user = jwt.decode(data.token);
            localStorage.setItem("token", data.token);
            setCurrentUser(user);
        }
    };

    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = (field) => {
        if (field === 'currentPassword') {
            setCurrentPasswordVisible(!currentPasswordVisible);
        } else if (field === 'newPassword') {
            setNewPasswordVisible(!newPasswordVisible);
        } else if (field === 'confirmPassword') {
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
    };


    const [inputPassword, setInputPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });


    const inputCorrect = async () => {

        if (inputPassword.currentPassword === '') {
            setPasswordErrors((prevState) => ({
                ...prevState,
                currentPassword: 'Current password is required',
            }));
            return false;
        }
        if (await pkg.compare(inputPassword.currentPassword, currentUser.password) === false) {
            setPasswordErrors((prevState) => ({
                ...prevState,
                currentPassword: 'Current password is incorrect',
            }));
            return false;
        }

        setPasswordErrors((prevState) => ({
            ...prevState,
            currentPassword: '',
        }));

        if (inputPassword.newPassword === '') {
            setPasswordErrors((prevState) => ({
                ...prevState,
                newPassword: 'New password is required',
            }));
            return false;
        }

        if (inputPassword.newPassword === inputPassword.currentPassword) {
            setPasswordErrors((prevState) => ({
                ...prevState,
                newPassword: 'New password cannot be the same as the current password',
            }));
            return false;
        }

        setPasswordErrors((prevState) => ({
            ...prevState,
            newPassword: '',
        }));

        if (inputPassword.confirmPassword === '') {
            setPasswordErrors((prevState) => ({
                ...prevState,
                confirmPassword: 'Confirm password is required',
            }));
            return false;
        }

        if (inputPassword.newPassword !== inputPassword.confirmPassword) {
            setPasswordErrors((prevState) => ({
                ...prevState,
                confirmPassword: 'Passwords do not match',
            }));
            return false;
        }

        setPasswordErrors((prevState) => ({
            ...prevState,
            confirmPassword: '',
        }));

        return true;
    }

    const handlePasswordsChange = (e, field) => {
        setInputPassword((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };



    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        if (await inputCorrect() === false) {
            return;
        }


        const passwords = {
            id: currentUser.id,
            email: currentUser.email,
            newPassword: inputPassword.newPassword
        };


        const response = await fetch("http://192.168.0.53:5000/user/change-password", {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(passwords),
        });

        if (response.ok) {
            let data = await response.json();
            const user = jwt.decode(data.token);
            localStorage.setItem("token", data.token);
            setCurrentUser(user);
        }
    }

    if (!currentUser) {
        return null
      }


    return (
        <main>
            <div className={`${styles.container} container mt-5`}>
                <div className="row">
                    <div className="col-md-3">
                        <div className={`${styles.nav_pills} nav flex-column nav-pills`} id="v_pills_tab" role="tablist" aria-orientation="vertical">
                            <a className={`${styles.nav_link} nav-link active`} id="v_pills_profile_tab" data-bs-toggle="pill" href="#v_pills_profile" role="tab" aria-controls="v_pills_profile" aria-selected="true">Profile</a>
                            <a className={`${styles.nav_link} nav-link`} id="v_pills_password_tab" data-bs-toggle="pill" href="#v_pills_password" role="tab" aria-controls="v_pills_password" aria-selected="false">Password</a>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content" id="v_pills_tabContent">
                            <div className="tab-pane fade show active" id="v_pills_profile" role="tabpanel" aria-labelledby="v_pills_profile_tab">
                                <h3 className="mb-4">Profile Settings</h3>
                                <form onSubmit={handleShow}>
                                    <div className="form-group">
                                        <label htmlFor="firstName" className="form-label">
                                            First Name
                                            <i
                                                className="bi bi-pencil-square ml-3"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleEditClick('firstName')}
                                            >
                                                
                                            </i>
                                        </label>
                                        <input onChange={(e) => handleChange(e, 'firstName')} value={inputValues.firstName} type="text" className="form-control" id="firstName" placeholder="Enter your first name" readOnly={!editableFields.firstName} />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name
                                            <i
                                                className="bi bi-pencil-square ml-3"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleEditClick('lastName')}
                                            >
                                                
                                            </i>
                                        </label>
                                        <input onChange={(e) => handleChange(e, 'lastName')} value={inputValues.lastName} type="text" className="form-control" id="lastName" placeholder="Enter your last name" readOnly={!editableFields.lastName} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label">
                                            Username
                                            <i
                                                className="bi bi-pencil-square ml-3"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleEditClick('username')}
                                            >
                                                
                                            </i>
                                        </label>
                                        <input onChange={(e) => handleChange(e, 'username')} value={inputValues.username} type="text" className="form-control" id="username" placeholder="Enter your username" readOnly={!editableFields.username} />
                                    </div>
                                    <button type="submit" className={`${styles.btn_primary} btn btn-primary`}>Save Changes</button>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="v_pills_password" role="tabpanel" aria-labelledby="v_pills_password_tab">
                                <h3 className="mb-4">Change Password</h3>
                                <form onSubmit={handlePasswordSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                        <div className='d-flex align-items-center'>

                                            <input
                                                onChange={(e) => handlePasswordsChange(e, 'currentPassword')}
                                                type={currentPasswordVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="currentPassword"
                                                placeholder="Enter your current password"
                                            />
                                            <span
                                                className={styles.passwordToggle}
                                                onClick={() => togglePasswordVisibility('currentPassword')}
                                            >
                                                <i className={`bi bi-eye${currentPasswordVisible ? "" : "-slash"}-fill`}></i>
                                            </span>
                                        </div>
                                        {
                                            passwordErrors.currentPassword &&
                                            <span className={`${styles.error} text-danger ml-2`}>{passwordErrors.currentPassword}</span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <div className='d-flex align-items-center'>

                                            <input
                                                onChange={(e) => handlePasswordsChange(e, 'newPassword')}
                                                type={newPasswordVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="newPassword"
                                                placeholder="Enter your new password"
                                            />
                                            <span
                                                className={styles.passwordToggle}
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                            >
                                                <i className={`bi bi-eye${newPasswordVisible ? "" : "-slash"}-fill`}></i>
                                            </span>
                                        </div>
                                        {
                                            passwordErrors.newPassword &&
                                            <span className={`${styles.error} text-danger ml-2`}>{passwordErrors.newPassword}</span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                        <div className='d-flex align-items-center'>

                                            <input
                                                onChange={(e) => handlePasswordsChange(e, 'confirmPassword')}
                                                type={confirmPasswordVisible ? 'text' : 'password'}
                                                className="form-control"
                                                id="confirmPassword"
                                                placeholder="Confirm your new password"
                                            />
                                            <span
                                                className={styles.passwordToggle}
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                            >
                                                <i className={`bi bi-eye${confirmPasswordVisible ? "" : "-slash"}-fill`}></i>
                                            </span>
                                        </div>
                                        {
                                            passwordErrors.confirmPassword &&
                                            <span className={`${styles.error} text-danger ml-2`}>{passwordErrors.confirmPassword}</span>
                                        }
                                    </div>
                                    <button type="submit" className={`${styles.btn_primary} btn btn-primary`}>Update Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to change your information?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmChanges}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );

}