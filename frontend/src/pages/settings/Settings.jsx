import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navBar/navBar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you absolutely sure? This action cannot be undone and you will lose all your data!");

        if (!confirmDelete) return;

        const doubleCheck = window.confirm("Final warning: Press OK to delete your account forever.");
        if (!doubleCheck) return;

        setIsDeleting(true);

        try {
            await axios.delete(`http://localhost:3001/users/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.clear();
            alert("Account successfully deleted. Goodbye!");
            navigate('/login');

        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Error trying to delete your account. Try again later.");
            setIsDeleting(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="background">
            <Navbar />

            <div className="container mt-5 mb-5" style={{ maxWidth: '600px' }}>
                <div className="card shadow-sm border-0 p-4">
                    <h3 className="fw-bold mb-4 text-dark border-bottom pb-3">
                        <i className="bi bi-gear-fill me-2 text-secondary"></i> Settings
                    </h3>

                    <div className="list-group list-group-flush gap-2">

                        <Link to="/EditProfile" className="list-group-item list-group-item-action d-flex align-items-center py-3 border rounded shadow-sm">
                            <i className="bi bi-person-lines-fill fs-3 text-primary me-3"></i>
                            <div>
                                <h6 className="mb-0 fw-bold">Edit Profile</h6>
                                <small className="text-muted">Change your personal information, password and privacy.</small>
                            </div>
                        </Link>

                        <Link to="/pendingRelationship" className="list-group-item list-group-item-action d-flex align-items-center py-3 border rounded shadow-sm">
                            <i className="bi bi-person-badge fs-3 text-primary me-3"></i>
                            <div>
                                <h6 className="mb-0 fw-bold">Pending Requests and Blocked Users</h6>
                                <small className="text-muted">View your pending friendship request and the users you blocked</small>
                            </div>
                        </Link>

                        <button onClick={handleLogout} className="list-group-item list-group-item-action d-flex align-items-center py-3 border rounded shadow-sm text-start mt-2">
                            <i className="bi bi-box-arrow-right fs-3 text-secondary me-3"></i>
                            <div>
                                <h6 className="mb-0 fw-bold">Logout</h6>
                                <small className="text-muted">Sign out of your Feicebuque account.</small>
                            </div>
                        </button>

                        <div className="mt-5">
                            <h6 className="text-danger fw-bold mb-2 px-1">Danger Zone</h6>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="list-group-item list-group-item-action d-flex align-items-center py-3 text-start list-group-item-danger border border-danger rounded shadow-sm"
                            >
                                <i className="bi bi-trash3-fill fs-3 text-danger me-3"></i>
                                <div>
                                    <h6 className="mb-0 fw-bold text-danger">Delete Account</h6>
                                    <small className="text-danger">Permanently delete your account, posts, and friends.</small>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;



