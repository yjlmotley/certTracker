import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { actions } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      // return;
    } else {
      const success = await actions.signUp(userData);
      console.log(success)
      if (success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    }

  };

  return (
    <div className="container mt-5 signup-div">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
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
                      value={userData.password}
                      onChange={handleChange}
                      required
                    />
                    <i
                      className={`position-absolute top-50 end-0 translate-middle-y me-3 text-muted fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      style={{ cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <i
                      className={`position-absolute top-50 end-0 translate-middle-y me-3 text-muted fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      style={{ cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
