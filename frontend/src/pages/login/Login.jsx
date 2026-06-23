import {Link, useNavigate} from 'react-router-dom';
import './login.css';
import loginImage from '../../assets/loginImage.png';
import logo from '../../assets/logo.png'
import AlertModal from "../../components/alertModal/alertModal.jsx";
import {useState} from "react";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [formLoginData, setformLoginData] = useState({
        email: '',
        loginPassword: ''
    });

    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: ''
    });

    const closeModal = () => {
        setModal({ ...modal, isOpen: false });
    };

    const handleChange = (e) => {
        setformLoginData({
            ...formLoginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/users/login', formLoginData);

            const token = response.data.token;
            const userName = response.data.name;

            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('userId', response.data.id);

            navigate('/feed');
        } catch (error) {
            setModal({
                isOpen: true,
                title: 'Login Failed',
                message: error.response?.data?.error || "Incorrect email or password. Please try again.",
                type: 'error'
            });
        }
    };

    return (
        <div className="login d-flex flex-column justify-content-center align-items-center p-3 p-md-5 position-relative min-vh-100">

            <div className="position-absolute top-0 start-0 m-4 d-none d-md-block">
                <Link to={"/login"}>
                    <img
                        src={logo}
                        className="logo img-fluid"
                        alt="Logo do Feicebuque"
                    />
                </Link>
            </div>

            <div className="d-block d-md-none text-center mb-3 mt-2">
                <Link to={"/login"}>
                    <img
                        src={logo}
                        className="logo img-fluid"
                        alt="Logo do Feicebuque"
                    />
                </Link>
            </div>

            <div className="card shadow-lg border-0 card-style h-auto w-100">

                <div className="row g-0 h-100">
                    <div className="col-md-6 d-none d-md-block">
                        <img
                            src={loginImage}
                            className="img-fluid h-100 w-100 login-image object-fit-cover"
                            alt="Capa do Feicebuque"
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center h-100">

                            <h2 className="text-center loginText mb-2">Login in Feicebuque</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 mt-4 mt-md-5">
                                    <label htmlFor="emailInput" className="form-label fw-bold text-dark">Email</label>
                                    <input
                                        id="emailInput"
                                        type="email"
                                        name="email"
                                        value={formLoginData.email}
                                        onChange={handleChange}
                                        className="form-control form-control-lg bg-light border-0 fs-6"
                                        placeholder="username@gmail.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="passwordInput" className="form-label fw-bold text-dark">Password</label>
                                    <input
                                        id="passwordInput"
                                        type="password"
                                        name="loginPassword"
                                        value={formLoginData.loginPassword}
                                        onChange={handleChange}
                                        className="form-control form-control-lg bg-light border-0 fs-6"
                                        placeholder="***********"
                                        required
                                    />
                                </div>

                                <div className="d-grid col-12 col-md-8 mx-auto mb-4">
                                    <button type="submit" className="btn btn-primary py-2 fw-semibold w-100">
                                        Sign in
                                    </button>
                                </div>

                                <p className="text-center fs-6 mb-0">Do you not have an account?
                                    <Link to="/register">
                                        <button type="button" className="btn btn-link fs-6">Register here</button>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <AlertModal
                isOpen={modal.isOpen}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onClose={closeModal}
            />

        </div>
    );
};

export default Login;