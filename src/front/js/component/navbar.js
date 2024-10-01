import React from "react";
import { Link } from "react-router-dom";
import { Book, House, PersonCircle } from 'react-bootstrap-icons';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<Book className="me-2" />
					CourseKeeper
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								<House className="me-1" />
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/course-tracker" className="nav-link">
								<Book className="me-1" />
								Course Tracker
							</Link>
						</li>
					</ul>
					<Link to="/login" className="btn btn-outline-primary">
						<PersonCircle className="me-1" />
						Login
					</Link>
				</div>
			</div>
		</nav>
	);
};
