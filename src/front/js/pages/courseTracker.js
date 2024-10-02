import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Course from "../component/Course.jsx";
import CourseForm from "../component/CourseForm.jsx";

export const CourseTracker = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        actions.getCourses();
    }, []);

    const handleEditClick = (course) => {
        setEditMode(true);
        setCurrentCourse(course);
    };

    const handleDeleteCourse = async (courseId) => {
        await actions.deleteCourses([courseId]);
        await actions.getCourses();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            setCurrentCourse(null);
        }
    };

    const handleReorder = (dragIndex, hoverIndex) => {
        actions.reorderCourses(dragIndex, hoverIndex);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Course Tracker</h1>

            <div className="mb-4 text-center">
                <button
                    className={`btn ${editMode ? "btn-outline-secondary" : "btn-primary"}`}
                    onClick={toggleEditMode}
                >
                    {editMode ? "Exit Edit Mode" : "Edit Courses"}
                </button>
            </div>

            {editMode && (
                <CourseForm
                    editMode={editMode}
                    currentCourse={currentCourse}
                    setCurrentCourse={setCurrentCourse}
                    onCancel={() => setCurrentCourse(null)}
                />
            )}

            <ul className="list-group">
                {store.courses?.map((course, index) => (
                    <Course
                        key={course.id}
                        index={index}
                        course={course}
                        editMode={editMode}
                        handleEditClick={handleEditClick}
                        handleDeleteCourse={handleDeleteCourse}
                        handleReorder={handleReorder}
                    />
                ))}
            </ul>
        </div>
    );
};