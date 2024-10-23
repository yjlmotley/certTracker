import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import Certification from "../component/Certification.jsx";
import CertificationForm from "../component/CertificationForm.jsx";


export const AdminCertificationTracker = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [currentCertification, setCurrentCertification] = useState(null);

    useEffect(() => {
        actions.getAllCertifications();
        console.log(store.currentUser)
        // console.log(store.token)
    }, []);

    const handleEditClick = (certification) => {
        setEditMode(true);
        setCurrentCertification(certification);
    };

    const handleDeleteCertification = async (certificationId) => {
        await actions.deleteCertifications([certificationId]);
        await actions.getAllCertifications();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            setCurrentCertification(null);
        }
    };

    const handleReorder = (dragIndex, hoverIndex) => {
        actions.reorderCertifications(dragIndex, hoverIndex);
    };

    // console.log("Current User in CertificationTracker:", store.currentUser);

    return (
        <div className="container mt-5">
            <h3>
                {store.currentUser && `Hello ${store.currentUser.first_name}`}
            </h3>
            <h1 className="text-center mb-4">ADMIN: Certification Tracker</h1>

            <div className="mb-4 text-center">
                <button
                    className={`btn ${editMode ? "btn-outline-secondary" : "btn-dark"}`}
                    onClick={toggleEditMode}
                >
                    <i className="fa-solid fa-pencil me-2"></i>
                    {editMode ? "Exit Edit Mode" : "Edit Certifications"}
                </button>
            </div>

            {editMode && (
                <CertificationForm
                    editMode={editMode}
                    currentCertification={currentCertification}
                    setCurrentCertification={setCurrentCertification}
                    onCancel={() => setCurrentCertification(null)}
                />
            )}

            <ul className="list-group">
                {store.allCertifications?.map((certification, index) => (
                    <Certification
                        key={certification.id}
                        index={index}
                        certification={certification}
                        editMode={editMode}
                        handleEditClick={handleEditClick}
                        handleDeleteCertification={handleDeleteCertification}
                        handleReorder={handleReorder}
                    />
                ))}
            </ul>
        </div>
    );
};