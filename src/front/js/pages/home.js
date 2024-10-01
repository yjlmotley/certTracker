// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
// import "../../styles/home.css";

// export const Home = () => {
// 	const { store, actions } = useContext(Context);

// 	return (
// 		<div className="text-center mt-5">
// 			<h1>Rigo says Hello!!</h1>
// 			<h2>Welcome to the course tracker!</h2>
// 			<h5 className="mx-auto my-3" style={{width: "50%"}}>
// 				Are you doing a course online by yourself and only have yourself to keep accoutable? 
// 				No worries, keep track of the timeline, expected dates, etc. to keep yourself on track.
// 			</h5>
// 			<p>
// 				<img src={rigoImageUrl} />
// 			</p>
// 			<div className="alert alert-info">
// 				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
// 			</div>
// 			<p>
// 				This boilerplate comes with lots of documentation:{" "}
// 				<a href="https://start.4geeksacademy.com/starters/react-flask">
// 					Read documentation
// 				</a>
// 			</p>
// 		</div>
// 	);
// };


// -----------------------------------------------------------------------------------------------------
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="container my-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="display-4 mb-3">Track Your Learning Journey</h1>
          <p className="lead mb-4">
            CourseKeeper helps you stay accountable and organized with your self-paced learning. Keep track of your courses, set goals, and achieve more.
          </p>
          <Link to="/course-tracker" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
        <div className="col-md-6">
          <img src="/api/placeholder/600/400" alt="Study illustration" className="img-fluid" />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <i className="bi bi-book-half text-primary mb-3" style={{ fontSize: "48px" }}></i>
              <h5 className="card-title">Course Management</h5>
              <p className="card-text text-center">
                Easily add and organize your self-study courses in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <i className="bi bi-graph-up text-primary mb-3" style={{ fontSize: "48px" }}></i>
              <h5 className="card-title">Progress Tracking</h5>
              <p className="card-text text-center">
                Visualize your learning progress and stay motivated.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <i className="bi bi-clock text-primary mb-3" style={{ fontSize: "48px" }}></i>
              <h5 className="card-title">Time Management</h5>
              <p className="card-text text-center">
                Set deadlines and manage your study time effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
