import React, { useRef } from "react";
import { PencilSquare, Trash, CheckCircle, ThreeDotsVertical } from 'react-bootstrap-icons';
import { useDrag, useDrop } from 'react-dnd';

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

    return (
        <li ref={ref} key={course.id} className="list-group-item d-flex" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {editMode && (
                <div className="me-3 d-flex align-items-center">
                    <ThreeDotsVertical style={{ cursor: 'move' }} />
                </div>
            )}
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