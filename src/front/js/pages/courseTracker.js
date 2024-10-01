import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Course from "../component/Course.jsx";


export const CourseTracker = () => {

    const { store, actions } = useContext(Context); // Get data from appContext

    // Define state for edit mode and new course form visibility
    const [editMode, setEditMode] = useState(false);
    const [newCourse, setNewCourse] = useState({
        is_completed: "",
        number: "",
        name: "",
        exp_starting_date: "",
        start_date: "",
        due_date: "",
        exp_timeframe: "",
        other_details: "",
    });

    // Fetch courses on component mount (assuming actions.getCourses exists)
    useEffect(() => {
        actions.getCourses();
    }, []);

    const handleEditClick = () => {
        setEditMode(!editMode); // Toggle edit mode
    };

    const handleNewCourseChange = (event) => {
        const { name, value } = event.target;
        const isChecked = event.target.checked;
        // setNewCourse({ ...newCourse, [name]: value }); // Update new course state
        setNewCourse({ ...newCourse, [name]: name === 'is_completed' ? isChecked : value }); // Update new course state
    };

    const handleAddCourse = async () => {
        // Call action to add course to server (assuming actions.addCourse exists)
        await actions.addCourses(newCourse);
        setNewCourse({ 
            is_completed: "",
            number: "",
            name: "",
            exp_starting_date: "",
            start_date: "",
            due_date: "",
            exp_timeframe: "",
            other_details: "",
        }); // Reset new course form
    };

    return (
        <div className="container">
            <h1>Course Tracker</h1>
            <button onClick={handleEditClick} className="btn btn-primary">
                {editMode ? "Exit Edit Mode" : "Edit Courses"}
            </button>
            {editMode && (
                <div>
                    <button className="btn btn-success" onClick={handleAddCourse}>
                        Add Course
                    </button>
                    <input 
                        type="checkbox" 
                        name="is_completed"
                        value={newCourse.is_completed} 
                        onChange={handleNewCourseChange} 
                    />
                    <input
                        type="text"
                        placeholder="Course Number"
                        name="number"
                        value={newCourse.number}
                        onChange={handleNewCourseChange}
                    />
                    <input
                        type="text"
                        placeholder="Course Name"
                        name="name"
                        value={newCourse.name}
                        onChange={handleNewCourseChange}
                    />
                    <input
                        type="text"
                        placeholder="Course Expected Starting Date"
                        name="exp_starting_date"
                        value={newCourse.exp_starting_date}
                        onChange={handleNewCourseChange}
                    />
                    <input
                        type="text"
                        placeholder="Course Start Date"
                        name="start_date"
                        value={newCourse.start_date}
                        onChange={handleNewCourseChange}
                    />
                    <input
                        type="text"
                        placeholder="Course Due Date"
                        name="due_date"
                        value={newCourse.due_date}
                        onChange={handleNewCourseChange}
                    />
                    <input
                        type="text"
                        placeholder="Course Expected Timeframe"
                        name="exp_timeframe"
                        value={newCourse.exp_timeframe}
                        onChange={handleNewCourseChange}
                    />
                    <input
                        type="text"
                        placeholder="Course Details"
                        name="other_details"
                        value={newCourse.other_details}
                        onChange={handleNewCourseChange}
                    />
                </div>
            )}
            <ul className="list-group">
                {store.courses?.map((course) => (
                    <Course key={course.id} course={course} editMode={editMode} />
                ))}
            </ul>
        </div>
    );
};