import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(email, password)
        if (success) navigate("/");
    }

    return (
        <div className="container mt-5 login-div">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <i
                                            className={`position-absolute top-50 end-0 translate-middle-y me-3 text-muted fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                            style={{ cursor: "pointer" }}
                                            onClick={togglePasswordVisibility}
                                        />
                                    </div>
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                                <Link to="/sign-up"><p className='text-center mt-4'>Click here to sign up</p></Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}