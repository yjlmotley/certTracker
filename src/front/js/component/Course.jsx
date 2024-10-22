import React, { useRef } from "react";
import { PencilSquare, Trash, CheckCircle, ThreeDotsVertical, UpDown } from 'react-bootstrap-icons';
import { useDrag, useDrop } from 'react-dnd';
import reorderIcon from "../../img/reorder.png";


const Course = ({ course, editMode, handleEditClick, handleDeleteCourse, index, handleReorder }) => {
    const ref = useRef(null);

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

    return (
        <li ref={ref} key={course.id} className="list-group-item d-flex align-items-center" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {editMode && (
                <div className="me-3 d-flex align-items-center">
                    {/* <ThreeDotsVertical style={{ cursor: 'move' }} /> */}
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