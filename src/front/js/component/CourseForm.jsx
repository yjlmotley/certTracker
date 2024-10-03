import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { PlusCircle, ArrowsExpand, X } from 'react-bootstrap-icons';

const CourseForm = ({ setEditMode, currentCourse, setCurrentCourse, onCancel }) => {
    const { actions } = useContext(Context);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isNewTab, setIsNewTab] = useState(false);

    const [courseFormData, setCourseFormData] = useState({
        is_completed: false,
        number: "",
        name: "",
        exp_starting_date: "",
        start_date: "",
        due_date: "",
        expiration_date: "",
        exp_timeframe: "",
        other_details: "",
    });

    useEffect(() => {
        if (currentCourse) {
            setCourseFormData({
                ...currentCourse,
                exp_starting_date: currentCourse.exp_starting_date ? new Date(currentCourse.exp_starting_date).toISOString().substring(0, 10) : "",
                start_date: currentCourse.start_date ? new Date(currentCourse.start_date).toISOString().substring(0, 10) : "",
                due_date: currentCourse.due_date ? new Date(currentCourse.due_date).toISOString().substring(0, 10) : "",
                expiration_date: currentCourse.expiration_date ? new Date(currentCourse.expiration_date).toISOString().substring(0, 10) : "",
            });
        }
    }, [currentCourse]);

    const handleCourseChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCourseFormData({ ...courseFormData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddCourse = async () => {
        const { exp_starting_date, start_date, due_date, expiration_date } = courseFormData;

        const courseData = {
            ...courseFormData,
            exp_starting_date: exp_starting_date || null,
            start_date: start_date || null,
            due_date: due_date || null,
            expiration_date: expiration_date || null
        };

        if (currentCourse) {
            await actions.editCourse(currentCourse.id, courseData);
        } else {
            await actions.addCourses(courseData);
        }

        await actions.getCourses();

        setCurrentCourse(null);
        setCourseFormData({
            is_completed: false,
            number: "",
            name: "",
            exp_starting_date: "",
            start_date: "",
            due_date: "",
            expiration_date: "",
            exp_timeframe: "",
            other_details: "",
        });
    };

    const handleCancelEdit = () => {
        onCancel();
        setCurrentCourse(null);
        setCourseFormData({
            is_completed: false,
            number: "",
            name: "",
            exp_starting_date: "",
            start_date: "",
            due_date: "",
            expiration_date: "",
            exp_timeframe: "",
            other_details: "",
        });
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const openInNewTab = () => {
        setIsNewTab(true);
        window.open('/course-form', '_blank');
    };

    if (isNewTab) {
        return null;
    }

    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{currentCourse ? "Edit Course" : "Add New Course"}</h5>
                <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={toggleMinimize}>
                        {isMinimized ? <ArrowsExpand /> : <X />}
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={openInNewTab}>
                        <ArrowsExpand />
                    </button>
                </div>
            </div>
            {!isMinimized && (
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column justify-content-center">
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="is_completed"
                                        name="is_completed"
                                        checked={courseFormData.is_completed}
                                        onChange={handleCourseChange}
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
                                        onChange={handleCourseChange}
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
                                        onChange={handleCourseChange}
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
                                        onChange={handleCourseChange}
                                        min="1000-01-01"
                                        max="9999-12-31"
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
                                        onChange={handleCourseChange}
                                        min="1000-01-01"
                                        max="9999-12-31"
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
                                        onChange={handleCourseChange}
                                        min="1000-01-01"
                                        max="9999-12-31"
                                    />
                                    <label htmlFor="due_date">Due/ Completed Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="expiration_date"
                                        placeholder="Expiration Date"
                                        name="expiration_date"
                                        value={courseFormData.expiration_date}
                                        onChange={handleCourseChange}
                                        min="1000-01-01"
                                        max="9999-12-31"
                                    />
                                    <label htmlFor="expiration_date">Expires</label>
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
                                onChange={handleCourseChange}
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
                                onChange={handleCourseChange}
                            />
                            <label htmlFor="other_details">Other Details</label>
                        </div>
                        <button className="btn btn-success" type="button" onClick={handleAddCourse}>
                            {!currentCourse && <PlusCircle className="me-2" />}
                            {!currentCourse ? "Add Course" : "Update Course"}
                        </button>
                        {currentCourse && (
                            <button className="btn btn-secondary ms-2" type="button" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default CourseForm;