import React from "react";

const Course = ({ course, editMode }) => {
    // Handle edit and delete functions (assuming actions exist)
    const handleEditCourse = () => {
        // Implement edit functionality using actions
    };

    const handleDeleteCourse = async () => {
        // Call action to delete course from server (assuming actions.deleteCourse exists)
        await actions.deleteCourse(course.id);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {course.name}
            {editMode && (
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary" onClick={handleEditCourse}>
                        Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteCourse}>
                        Delete
                    </button>
                </div>
            )}
        </li>
    );
};

export default Course;