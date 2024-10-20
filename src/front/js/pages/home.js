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
          <Link to="/sign-up" className="btn btn-success btn-lg">
            Get Started
          </Link>
        </div>
        <div className="col-md-6">
          <img src="https://www.greentrainingusa.com/media/icons/medium/cert-tracker.jpg" alt="Study illustration" className="img-fluid" />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <i className="bi bi-book-half text-primary mb-3" style={{ fontSize: "48px" }}></i>
              <h5 className="card-title text-center">Course Management</h5>
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
