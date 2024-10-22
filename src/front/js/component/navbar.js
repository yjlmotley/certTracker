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
			{/* // <nav className="navbar mb-4" style={{ backgroundColor: "#E0DCDC" }}> */}
			{/* <nav className="navbar navbar-light mb-4" style={{ backgroundColor: "#D8D8D8" }}> */}
			<div className="container">
				<Link to="/" className="navbar-brand">
					<Book className="me-2" />
					Cert Tracker
				</Link>
				<div className="ms-auto dropdown">
					<a className="btn btn-outline-dark me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="fa-solid fa-bars"></i>
					</a>
					<ul className="dropdown-menu">
						<Link to="/" className="dropdown-item">
							<House className="me-1" />
							Home
						</Link>
						<Link to="/admin-course-tracker" className="dropdown-item">
							<Book className="me-1" />
							All courses
						</Link>
						{isLoggedIn && (
							<Link to={`/${username}/course-tracker`} className="dropdown-item">
								<Book className="me-1" />
								Your Course Tracker
							</Link>
						)}
					</ul>
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
