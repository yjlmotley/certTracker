import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Dropdown button
						</button>
						<ul className="dropdown-menu">
							<li>
								<Link className="dropdown-item" to="/course-tracker">Course Tracker</Link>
								</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
