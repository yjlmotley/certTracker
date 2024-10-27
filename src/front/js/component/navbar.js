import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Book, House, PersonCircle } from 'react-bootstrap-icons';

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const username = store.currentUser?.username;

	const handleLogout = () => {
		actions.logout();
		console.log("User has been succesfully logged out");
		navigate("/");
	}

	const isLoggedIn = !!sessionStorage.getItem("token");

	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<Book className="me-2" />
					Cert Tracker
				</Link>
				<div className="d-flex align-items-center">
					<div className="dropdown me-2">
						<button 
							className="btn btn-outline-dark" 
							type="button" 
							data-bs-toggle="dropdown" 
							aria-expanded="false"
						>
							<i className="fa-solid fa-bars"></i>
							<span> Menu</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							{/* <h4 className="text-center">Menu</h4>
							<hr className="m-2"></hr> */}
							{/* <li>
								<Link to="/" className="dropdown-item">
									<House className="me-1" />
									Home
								</Link>
							</li> */}
							<li>
								<Link to="/admin-course-tracker" className="dropdown-item">
									<Book className="me-1" />
									All courses
								</Link>
							</li>
							<li>
								<Link to="/admin-certification-tracker" className="dropdown-item">
									<Book className="me-1" />
									All certications
								</Link>
							</li>
							{isLoggedIn && (
								<>
									<li>
										<Link to={`/${username}/course-tracker`} className="dropdown-item">
											<Book className="me-1" />
											Your Course Tracker
										</Link>
									</li>
									<li>
										<Link to={`/${username}/certification-tracker`} className="dropdown-item">
											<Book className="me-1" />
											Your Certification Tracker
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
					{isLoggedIn ? (
						<button onClick={handleLogout} className="btn btn-outline-dark">
							<PersonCircle className="me-1" />
							Log Out
						</button>
					) : (
						<Link to="/login" className="btn btn-outline-dark">
							<PersonCircle className="me-1" />
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};