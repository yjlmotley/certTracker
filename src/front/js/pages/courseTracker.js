import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PlusCircle, PencilSquare, Trash, CheckCircle } from 'react-bootstrap-icons';

export const CourseTracker = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [courseFormData, setCourseFormData] = useState({
        is_completed: false,
        number: "",
        name: "",
        exp_starting_date: "",
        start_date: "",
        due_date: "",
        exp_timeframe: "",
        other_details: "",
    });

    useEffect(() => {
        actions.getCourses();
    }, []);

    const handleEditClick = (course) => {
        setEditMode(true);
        setCurrentCourse(course);
        
        setCourseFormData({
            ...course,
            exp_starting_date: course.exp_starting_date ? new Date(course.exp_starting_date).toISOString().substring(0, 10) : "",
            start_date: course.start_date ? new Date(course.start_date).toISOString().substring(0, 10) : "",
            due_date: course.due_date ? new Date(course.due_date).toISOString().substring(0, 10) : "",
        });
    };

    const handleNewCourseChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCourseFormData({ ...courseFormData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddCourse = async () => {
        const { exp_starting_date, start_date, due_date } = courseFormData;

        // Convert empty date strings to null
        const courseData = {
            ...courseFormData,
            exp_starting_date: exp_starting_date || null,
            start_date: start_date || null,
            due_date: due_date || null,
        };

        if (editMode && currentCourse) {
            await actions.editCourse(currentCourse.id, courseData);
        } else {
            await actions.addCourses(courseData);
        }

        await actions.getCourses();

        // Reset the form and state
        // setEditMode(false);
        setCurrentCourse(null);
        setCourseFormData({
            is_completed: false,
            number: "",
            name: "",
            exp_starting_date: "",
            start_date: "",
            due_date: "",
            exp_timeframe: "",
            other_details: "",
        });
    };

    const handleDeleteCourse = async (courseId) => {
        await actions.deleteCourses([courseId]);
        await actions.getCourses();
    };

    const handleCancelEdit = () => {
        // setEditMode(false);
        setCurrentCourse(null);
        setCourseFormData({
            is_completed: false,
            number: "",
            name: "",
            exp_starting_date: "",
            start_date: "",
            due_date: "",
            exp_timeframe: "",
            other_details: "",
        });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        // Reset form data when exiting edit mode
        if (editMode) {
            handleCancelEdit();
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Course Tracker</h1>

            {/* Toggle Edit Mode Button */}
            <div className="mb-4 text-center">
                <button
                    className={`btn ${editMode ? "btn-outline-secondary" : "btn-primary"}`}
                    onClick={toggleEditMode}
                >
                    {editMode ? "Exit Edit Mode" : "Edit Courses"}
                </button>
            </div>

            {/* Form for adding or editing a course */}
            {editMode && ( // Only show form if in edit mode
                <div className="card mb-4">
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="is_completed"
                                            name="is_completed"
                                            checked={courseFormData.is_completed}
                                            onChange={handleNewCourseChange}
                                        />
                                        <label className="form-check-label" htmlFor="is_completed">Completed</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="number"
                                            placeholder="Course Number"
                                            name="number"
                                            value={courseFormData.number}
                                            onChange={handleNewCourseChange}
                                        />
                                        <label htmlFor="number">Course Number</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Course Name"
                                            name="name"
                                            value={courseFormData.name}
                                            onChange={handleNewCourseChange}
                                        />
                                        <label htmlFor="name">Course Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="exp_starting_date"
                                            placeholder="Expected Starting Date"
                                            name="exp_starting_date"
                                            value={courseFormData.exp_starting_date}
                                            onChange={handleNewCourseChange}
                                        />
                                        <label htmlFor="exp_starting_date">Expected Starting Date</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="start_date"
                                            placeholder="Start Date"
                                            name="start_date"
                                            value={courseFormData.start_date}
                                            onChange={handleNewCourseChange}
                                        />
                                        <label htmlFor="start_date">Start Date</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="due_date"
                                            placeholder="Due Date"
                                            name="due_date"
                                            value={courseFormData.due_date}
                                            onChange={handleNewCourseChange}
                                        />
                                        <label htmlFor="due_date">Due Date</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exp_timeframe"
                                    placeholder="Expected Timeframe"
                                    name="exp_timeframe"
                                    value={courseFormData.exp_timeframe}
                                    onChange={handleNewCourseChange}
                                />
                                <label htmlFor="exp_timeframe">Expected Timeframe</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control"
                                    id="other_details"
                                    placeholder="Other Details"
                                    style={{ height: "100px" }}
                                    name="other_details"
                                    value={courseFormData.other_details}
                                    onChange={handleNewCourseChange}
                                />
                                <label htmlFor="other_details">Other Details</label>
                            </div>
                            <button className="btn btn-success" type="button" onClick={handleAddCourse}>
                                {!currentCourse && <PlusCircle className="me-2" />}
                                {/* {editMode ? "Update Course" : "Add Course"} */}
                                {!currentCourse ? "Add Course" : "Update Course" }
                            </button>
                            {currentCourse && (
                                <button className="btn btn-secondary ms-2" type="button" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            )}

            {/* List of Courses */}
            <ul className="list-group">
                {store.courses?.map((course) => (
                    <li
                        key={course.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <h5>{course.name} <span className="badge bg-secondary">{course.number}</span></h5>
                            <p className="mb-0">
                                <small>
                                    {course.start_date && `Started: ${new Date(course.start_date).toLocaleDateString()}`}
                                    {course.due_date && ` | Due: ${new Date(course.due_date).toLocaleDateString()}`}
                                </small>
                            </p>
                        </div>
                        <div>
                            {course.is_completed && <CheckCircle className="text-success me-2" />}
                            {editMode && ( // Only show these buttons if in edit mode
                    <>
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEditClick(course)}>
                            <PencilSquare />
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash />
                        </button>
                    </>
                )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
