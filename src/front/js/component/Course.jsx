import React, { useRef, useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import NoteModal from "./NoteModal.jsx";
import "../../styles/popup.css";

import reorderIcon from "../../img/reorder.png";
import { PencilSquare, Trash, CheckCircle } from 'react-bootstrap-icons';
// import { CgNotes } from "react-icons/cg";


const Course = ({ course, editMode, handleEditClick, handleDeleteCourse, index, handleReorder }) => {
    const ref = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const [, drop] = useDrop({
        accept: 'COURSE',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            handleReorder(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'COURSE',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));


    const formatDate = (date) => new Date(date).toLocaleDateString();
    const getCourseDetails = () => {
        const details = [];
        if (course.is_completed) {
            if (course.start_date) details.push(`Started: ${formatDate(course.start_date)}`);
            if (course.due_date) details.push(`Completed: ${formatDate(course.due_date)}`);
            if (course.expiration_date) details.push(`Expires: ${formatDate(course.expiration_date)}`);
        } else {
            if (course.exp_starting_date) details.push(`Start By: ${formatDate(course.exp_starting_date)}`);
            if (course.start_date) details.push(`Started: ${formatDate(course.start_date)}`);
            if (course.due_date) details.push(`Due: ${formatDate(course.due_date)}`);
            if (course.expiration_date) details.push(`Expires: ${formatDate(course.expiration_date)}`);
        }
        return details.join(' | ');
    };

    const handleMouseEnter = () => {
        setShowPopup(true);
    };
    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <li ref={ref} key={course.id} className="list-group-item d-flex align-items-center" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {editMode && (
                <div className="me-3 d-flex align-items-center">
                    <img
                        src={reorderIcon}
                        alt="reorder"
                        style={{
                            cursor: 'move',
                            width: '16px',
                            height: '16px'
                        }}
                    />
                </div>
            )}
            <div>
                <h5 className="d-flex align-items-center m-0">
                    <span className="me-2">{course.name}</span>
                    <span className="badge bg-secondary me-2">{course.number}</span>
                    {course.other_details &&
                        <>
                            {/* <div className="popup">
                                <span
                                    className="btn btn-outline-secondary p-1"
                                    id="courseNoteBtn"
                                    onClick={togglePopup}
                                >
                                    <CgNotes />
                                </span>
                                <div className={`popuptext ${showPopup ? 'show' : ''}`}>
                                    {course.other_details}
                                </div>
                            </div> */}
                            {/* <div className="popup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <NoteModal details={course.other_details} />
                                <div className={`popuptext ${showPopup ? 'show' : ''}`}>
                                    {course.other_details}
                                </div>
                            </div> */}
                            <div className="popup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <NoteModal
                                    details={course.other_details}
                                    onButtonClick={() => setShowPopup(false)}
                                />                        
                                    <div className={`popuptext ${showPopup ? 'show' : ''}`}>
                                        <div className="popup-content">
                                            {typeof course.other_details === 'string'
                                                ? course.other_details
                                                : Object.entries(course.other_details)
                                                    .map(([key, value]) => (
                                                        <div key={key}>
                                                            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}</strong>: {value}
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                            </div>

                        </>
                    }
                    {!course.is_completed && course.exp_timeframe && (
                        <span className="text-muted fs-6 fw-normal">
                            ({course.exp_timeframe})
                        </span>
                    )}
                </h5>
                <p className="mb-0">
                    <small>{getCourseDetails()}</small>
                </p>
            </div>
            <div className="d-flex align-items-center ms-auto">
                {course.is_completed && (
                    <div className="px-2">
                        <CheckCircle className="text-success my-auto" />
                    </div>
                )}
                {editMode && (
                    <div className={`d-flex flex-column flex-md-row ${editMode ? "btn-group-vertical" : ""}`}>
                        <button className="btn btn-outline-primary btn-sm m-1 rounded" onClick={() => handleEditClick(course)}>
                            <PencilSquare />
                        </button>
                        <button className="btn btn-outline-danger btn-sm m-1 rounded" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash />
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default Course;