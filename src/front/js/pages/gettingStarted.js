import React from 'react';
import { ClockFill, Tools, Rocket } from 'react-bootstrap-icons';

const GettingStarted = () => {
  return (
    <div className="container text-center py-5">
      <div className="mb-5">
        <h1 className="display-4 mb-4">Getting Started Guide</h1>
        <p className="lead text-muted">Coming Soon! We're building something awesome.</p>
        <div className="bg-success-subtle p-4 rounded-3 d-inline-block">
          <Rocket className="text-success" size={48} />
        </div>
      </div>

      <div className="row g-4 py-5">
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-3 h-100">
            <Tools className="text-success mb-3" size={32} />
            <h3>Setup Guide</h3>
            <p>Step-by-step instructions for setting up your tracking system.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-3 h-100">
            <ClockFill className="text-success mb-3" size={32} />
            <h3>Quick Tips</h3>
            <p>Best practices for managing your learning journey effectively.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-3 h-100">
            <i className="fas fa-video text-success mb-3" style={{ fontSize: '2rem' }}></i>
            <h3>Video Tutorials</h3>
            <p>Visual guides to help you get the most out of Cert Tracker.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;