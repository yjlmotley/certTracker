import React from "react";
import { PencilSquare, Trash, CheckCircle } from 'react-bootstrap-icons';

const Course = ({ course, editMode, handleEditClick, handleDeleteCourse }) => {
    return (
        <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h5>
                    {course.name} <span className="badge bg-secondary">{course.number}</span>
                </h5>
                <p className="mb-0">
                    <small>
                        {course.start_date && `Started: ${new Date(course.start_date).toLocaleDateString()}`}
                        {course.due_date && ` | Due: ${new Date(course.due_date).toLocaleDateString()}`}
                    </small>
                </p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                {course.is_completed && (
                    <div className="px-2">
                        <CheckCircle className="text-success my-auto" />
                    </div>
                )}
                {editMode && ( // Only show buttons if in edit mode
                    <div className={`d-flex flex-column flex-md-row ${editMode ? "btn-group-vertical" : ""}`}>
                        <button className="btn btn-outline-primary btn-sm m-1" onClick={() => handleEditClick(course)}>
                            <PencilSquare />
                        </button>
                        <button className="btn btn-outline-danger btn-sm m-1" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash />
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default Course;
