import React, { useRef, useState } from "react";
import NoteModal from "./NoteModal.jsx";
import "../../styles/popup.css";

import { PencilSquare, Trash, CheckCircle } from 'react-bootstrap-icons';
import { useDrag, useDrop } from 'react-dnd';
import reorderIcon from "../../img/reorder.png";


const Certification = ({ certification, editMode, handleEditClick, handleDeleteCertification, index, handleReorder }) => {
    const ref = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const [, drop] = useDrop({
        accept: 'CERTIFICATION',
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
        type: 'CERTIFICATION',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));


    const formatDate = (date) => new Date(date).toLocaleDateString();
    const getCertificationDetails = () => {
        const details = [];
        if (certification.is_completed) {
            if (certification.start_date) details.push(`Started: ${formatDate(certification.start_date)}`);
            if (certification.due_date) details.push(`Completed: ${formatDate(certification.due_date)}`);
            if (certification.expiration_date) details.push(`Expires: ${formatDate(certification.expiration_date)}`);
        } else {
            if (certification.exp_starting_date) details.push(`Start By: ${formatDate(certification.exp_starting_date)}`);
            if (certification.start_date) details.push(`Started: ${formatDate(certification.start_date)}`);
            if (certification.due_date) details.push(`Due: ${formatDate(certification.due_date)}`);
            if (certification.expiration_date) details.push(`Expires: ${formatDate(certification.expiration_date)}`);
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
        <li ref={ref} key={certification.id} className="list-group-item d-flex align-items-center" style={{ opacity: isDragging ? 0.5 : 1 }}>
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
                    <span className="me-2">{certification.name}</span>
                    <span className="badge bg-secondary me-2">{certification.number}</span>
                    {certification.other_details &&
                        <>
                            <div className="popup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <NoteModal
                                    details={certification.other_details}
                                    onButtonClick={() => setShowPopup(false)}
                                />                        
                                    <div className={`popuptext ${showPopup ? 'show' : ''}`}>
                                        <div className="popup-content">
                                            {typeof certification.other_details === 'string'
                                                ? certification.other_details
                                                : Object.entries(certification.other_details)
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
                    {!certification.is_completed && certification.exp_timeframe && (
                        <span className="text-muted fs-6 fw-normal">
                            ({certification.exp_timeframe})
                        </span>
                    )}
                </h5>
                <p className="mb-0">
                    <small>{getCertificationDetails()}</small>
                </p>
            </div>
            <div className="d-flex align-items-center ms-auto">
                {certification.is_completed && (
                    <div className="px-2">
                        <CheckCircle className="text-success my-auto" />
                    </div>
                )}
                {editMode && (
                    <div className={`d-flex flex-column flex-md-row ${editMode ? "btn-group-vertical" : ""}`}>
                        <button className="btn btn-outline-primary btn-sm m-1 rounded" onClick={() => handleEditClick(certification)}>
                            <PencilSquare />
                        </button>
                        <button className="btn btn-outline-danger btn-sm m-1 rounded" onClick={() => handleDeleteCertification(certification.id)}>
                            <Trash />
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default Certification;