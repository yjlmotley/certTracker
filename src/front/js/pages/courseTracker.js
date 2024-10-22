import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Course from "../component/Course.jsx";
import CourseForm from "../component/CourseForm.jsx";


export const CourseTracker = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const { username } = useParams();
    // const [courseOwner, setCourseOwner] = useState(null);

    useEffect(() => {
        // actions.getCourses();
        const loadCourses = async () => {
            try {
                await actions.getCourses(username);
            } catch (error) {
                console.error("Error loading courses:", error);
                alert("We were unable to load the information at this moment. Please try again later.")
            }
        };
        loadCourses();
        console.log("store:currentUser", store.currentUser)
        // console.log(store.token)
    }, [username]);

    const getOwnerName = () => {
        if (store.courses && store.courses.length > 0) {
            return {
                firstName: store.courses[0].user_first_name,
                lastName: store.courses[0].user_last_name,
            };
        }
        return null;
    };

    const ownerInfo = getOwnerName();

    const isOwner = store.currentUser?.username === username;

    const handleEditClick = (course) => {
        setEditMode(true);
        setCurrentCourse(course);
    };

    const handleDeleteCourse = async (courseId) => {
        await actions.deleteCourses([courseId]);
        await actions.getCourses(username);
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
                {store.currentUser && `Hello ${store.currentUser.first_name}`}
            </h3>
            <h1 className="text-center mb-4">
                {isOwner && "Course Tracker"}
                {!isOwner && store.courses?.length > 0 ? `${ownerInfo?.firstName} ${ownerInfo?.lastName}'s Courses` : "No Courses"}
            </h1>

            {isOwner && (
                <div className="mb-4 text-center">
                    <button
                        className={`btn ${editMode ? "btn-outline-secondary" : "btn-dark"}`}
                        onClick={toggleEditMode}
                    >
                        <i className="fa-solid fa-pencil me-2"></i>
                        {editMode ? "Exit Edit Mode" : "Edit Courses"}
                    </button>
                </div>
            )}

            {editMode && isOwner && (
                <CourseForm
                    editMode={editMode}
                    currentCourse={currentCourse}
                    setCurrentCourse={setCurrentCourse}
                    onCancel={() => setCurrentCourse(null)}
                    username={username}
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