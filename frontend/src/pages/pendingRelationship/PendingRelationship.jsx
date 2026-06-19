
import Navbar from '../../components/navBar/navBar.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PendingRelationshipPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [blockedList, setBlockedList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchConnections = useCallback(async () => {
        if (!token || !userId) {
            setIsLoading(false);
            return;
        }

        try {
            const pendingResponse = await axios.get('http://localhost:3001/friendShip/requests/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPendingList(pendingResponse.data || []);

            const blockedResponse = await axios.get(`http://localhost:3001/friendShip/blocked`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setBlockedList(blockedResponse.data || []);

        } catch (error) {
            console.error("Error fetching connections:", error);
        } finally {
            setIsLoading(false);
        }
    }, [token, userId]);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchConnections();
    }, [navigate, fetchConnections, token]);


    const handleRemoveConnection = async (targetUserId, type) => {
        const message = type === 'block'
            ? "Are you sure you want to unblock this user?"
            : "Are you sure you want to reject this friend request?";

        if (!window.confirm(message)) return;

        try {
            await axios.delete(`http://localhost:3001/friendShip/delete/${targetUserId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });


            if (type === 'block') {
                setBlockedList(prev => prev.filter(user => user.id !== targetUserId));
            } else {
                setPendingList(prev => prev.filter(user => user.id !== targetUserId));
            }
        } catch (error) {
            console.error(`Error removing connection (${type}):`, error);
            alert("An error occurred. Try again.");
        }
    };


    const handleAcceptRequest = async (senderId) => {
        try {

            await axios.put('http://localhost:3001/friendShip/update',
                { friendId: senderId, friendshipStatus: 'F' },
                { headers: { Authorization: `Bearer ${token}` } }
            );


            setPendingList(prev => prev.filter(user => user.id !== senderId));
            alert("Friend request accepted!");
        } catch (error) {
            console.error("Error accepting friend request:", error);
            alert("Error trying to accept request.");
        }
    };

    if (isLoading) {
        return <div className="text-center mt-5 text-secondary">Loading connections...</div>;
    }

    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            <Navbar />

            <div className="container mt-5 mb-5" style={{ maxWidth: '1000px' }}>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold text-dark mb-0">
                        <i className="bi bi-people-fill me-2 text-primary"></i> Manage Connections
                    </h3>
                    <Link to="/settings">
                        <button className="btn btn-outline-secondary btn-sm fw-semibold">
                            <i className="bi bi-arrow-left me-1"></i> Back to Settings
                        </button>
                    </Link>
                </div>

                <div className="row g-4">


                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 p-4 h-100">
                            <h5 className="fw-bold mb-4 text-dark border-bottom pb-2">
                                <i className="bi bi-bell-fill text-warning me-2"></i> Pending Requests
                            </h5>

                            {pendingList.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="bi bi-inbox fs-1 text-muted mb-2 d-block"></i>
                                    <p className="text-muted small mb-0">No pending friend requests.</p>
                                </div>
                            ) : (
                                <div className="list-group list-group-flush gap-2">
                                    {pendingList.map((user) => (
                                        <div key={user.id} className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 border rounded shadow-sm gap-3">

                                            <div className="d-flex align-items-center cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)} style={{ cursor: 'pointer' }}>
                                                <div className="rounded-circle overflow-hidden bg-light border me-3 d-flex justify-content-center align-items-center flex-shrink-0" style={{ width: '45px', height: '45px' }}>
                                                    <img
                                                        src={`/users/${user.id}.png`}
                                                        alt="Profile"
                                                        className="w-100 h-100 object-fit-cover"
                                                        onError={(e) => {
                                                            e.target.classList.add('d-none');
                                                            e.target.nextElementSibling.classList.remove('d-none');
                                                        }}
                                                    />
                                                    <i className="bi bi-person-circle text-secondary d-none" style={{fontSize: '35px'}}></i>
                                                </div>
                                                <h6 className="mb-0 fw-bold text-dark">{user.fullName}</h6>
                                            </div>

                                            <div className="d-flex gap-2 w-100 w-sm-auto justify-content-end">
                                                <button onClick={() => handleAcceptRequest(user.id)} className="btn btn-success btn-sm fw-semibold flex-grow-1 flex-sm-grow-0">
                                                    Accept
                                                </button>
                                                <button onClick={() => handleRemoveConnection(user.id, 'pending')} className="btn btn-outline-danger btn-sm fw-semibold flex-grow-1 flex-sm-grow-0">
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 p-4 h-100">
                            <h5 className="fw-bold mb-4 text-dark border-bottom pb-2">
                                <i className="bi bi-slash-circle-fill text-danger me-2"></i> Blocked Users
                            </h5>

                            {blockedList.length === 0 ? (
                                <div className="text-center py-4">
                                    <i className="bi bi-shield-check fs-1 text-muted mb-2 d-block"></i>
                                    <p className="text-muted small mb-0">You haven't blocked anyone.</p>
                                </div>
                            ) : (
                                <div className="list-group list-group-flush gap-2">
                                    {blockedList.map((user) => (
                                        <div key={user.id} className="list-group-item d-flex justify-content-between align-items-center py-3 border rounded shadow-sm gap-2">

                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle overflow-hidden bg-light border me-3 d-flex justify-content-center align-items-center flex-shrink-0" style={{ width: '45px', height: '45px' }}>
                                                    <img
                                                        src={`/users/${user.id}.png`}
                                                        alt="Profile"
                                                        className="w-100 h-100 object-fit-cover"
                                                        onError={(e) => {
                                                            e.target.classList.add('d-none');
                                                            e.target.nextElementSibling.classList.remove('d-none');
                                                        }}
                                                    />
                                                    <i className="bi bi-person-circle text-secondary d-none" style={{fontSize: '35px'}}></i>
                                                </div>
                                                <h6 className="mb-0 fw-bold text-dark">{user.fullName}</h6>
                                            </div>

                                            <button onClick={() => handleRemoveConnection(user.id, 'block')} className="btn btn-outline-primary btn-sm fw-semibold">
                                                Unblock
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PendingRelationshipPage;