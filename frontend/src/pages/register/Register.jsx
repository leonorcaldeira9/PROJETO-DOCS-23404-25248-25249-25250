import { Link } from 'react-router-dom';
import './register.css';
//import axios from 'axios';

const Register = () => {

    return (
        <div className="register d-flex justify-content-center align-items-center p-5">
            <div className="card shadow-lg p-sm-5 border-0 card-style h-auto" >

                <h2 className="text-center">Create an Account</h2>

                <form>
                    <div className="mb-2">
                        <label className="form-label fw-bold text-dark">Full Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg bg-light border-0"
                            placeholder="John Doe"
                            required
                            style={{fontSize: '1rem'}}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label className="form-label fw-bold text-dark">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="username@gmail.com"
                                required
                                style={{fontSize: '1rem'}}
                            />
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label fw-bold text-dark">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="***********"
                                required
                                style={{fontSize: '1rem'}}
                            />
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-2">
                            <label className="form-label fw-bold text-dark d-block mb-2">Gender</label>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="F"/>
                                <label className="form-check-label" htmlFor="genderFemale">
                                    Female
                                </label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="genderMale" value="M"/>
                                <label className="form-check-label" htmlFor="genderMale">
                                    Male
                                </label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="genderOther" value="O"/>
                                <label className="form-check-label" htmlFor="genderOther">
                                    Other
                                </label>
                            </div>
                        </div>

                        <div className="col-md-6 mb-2">
                            <label className="form-label fw-bold text-dark">Birthdate</label>
                            <input
                                type="date"
                                className="form-control form-control-lg bg-light border-0"
                                required
                                style={{fontSize: '1rem'}}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm mb-2">
                            <label className="form-label fw-bold text-dark">Country</label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="Portugal"
                                required
                                style={{fontSize: '1rem'}}
                            />
                        </div>

                        <div className="col-sm mb-2">
                            <label className="form-label fw-bold text-dark">City</label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="Lisboa"
                                required
                                style={{fontSize: '1rem'}}
                            />
                        </div>

                        <div className="col-sm mb-5">
                            <label className="form-label fw-bold text-dark">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control form-control-lg bg-light border-0"
                                placeholder="9xxxxxxxx"
                                pattern="9[0-9]{8}"
                                required
                                style={{fontSize: '1rem'}}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-50 mb-2 d-block mx-auto">
                        Create Account
                    </button>

                    <p className="text-center fs-6">Do you have an account?
                        <Link to="/login">
                            <button className="btn btn-link fs-6">Login</button>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;