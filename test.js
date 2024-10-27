import React from "react";
import { CgNotes } from "react-icons/cg";

const NoteModal = ({ details, onButtonClick }) => {
    return (
        <>
            <span 
                className="btn btn-outline-secondary p-1" 
                id="courseNoteBtn" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
                onClick={onButtonClick}
            >
                <CgNotes />
            </span>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Course Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {details || '...'}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoteModal;