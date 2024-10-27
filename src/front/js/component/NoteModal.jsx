import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { CgNotes } from "react-icons/cg";

const NoteModal = ({ details, onButtonClick }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formatDetails = (details) => {
        if (typeof details === 'string') {
            return details;
        }
        
        if (typeof details === 'object' && details !== null) {
            return Object.entries(details)
                .map(([key, value]) => {
                    const formattedKey = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase());
                    return { key: formattedKey, value };
                });
        }
        
        return 'No details available';
    };

    const formattedDetails = formatDetails(details);

    return (
        <>
            <span 
                className="btn btn-outline-secondary p-1" 
                id="courseNoteBtn" 
                onClick={() => {
                    handleShow();
                    onButtonClick();
                }}
            >
                <CgNotes />
            </span>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Course Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ 
                    overflowX: 'hidden',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                }}>
                    {typeof formattedDetails === 'string' ? (
                        <div style={{ overflowWrap: 'break-word' }}>
                            {formattedDetails}
                        </div>
                    ) : (
                        <div>
                            {formattedDetails.map(({ key, value }, index) => (
                                <div 
                                    key={index} 
                                    style={{ 
                                        marginBottom: '0.5rem',
                                        overflowWrap: 'break-word'
                                    }}
                                >
                                    <strong>{key}:</strong> {value}
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NoteModal;