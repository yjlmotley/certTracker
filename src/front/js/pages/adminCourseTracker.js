import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Course from "../component/Course.jsx";
import CourseForm from "../component/CourseForm.jsx";


export const AdminCourseTracker = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        actions.getCourses();
        console.log(store.currentUser)
        // console.log(store.token)
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

    // console.log("Current User in CourseTracker:", store.currentUser);

    return (
        <div className="container mt-5">
            <h3>
                {store.currentUser ? `Hello ${store.currentUser.first_name}` : "placeholder for course.id.user.first_name+last_name"}
            </h3>
            {/* TODO: Change this so that when you look at this link and you're not signed in, you see their first and last name (plus their coursesr) */}
            <h1 className="text-center mb-4">ADMIN: Course Tracker</h1>

            <div className="mb-4 text-center">
                <button
                    className={`btn ${editMode ? "btn-outline-secondary" : "btn-dark"}`}
                    onClick={toggleEditMode}
                >
                    <i className="fa-solid fa-pencil me-2"></i>
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