import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import Certification from "../component/Certification.jsx";
import CertificationForm from "../component/CertificationForm.jsx";


export const CertificationTracker = () => {
    const { store, actions } = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [currentCertification, setCurrentCertification] = useState(null);
    const { username } = useParams();
    // const [certificationOwner, setCertificationOwner] = useState(null);

    useEffect(() => {
        // actions.getCertifications();
        const loadCertifications = async () => {
            try {
                await actions.getCertifications(username);
            } catch (error) {
                console.error("Error loading certifications:", error);
                alert("We were unable to load the information at this moment. Please try again later.")
            }
        };
        loadCertifications();
        console.log("store:currentUser", store.currentUser)
        // console.log(store.token)
    }, [username]);

    const getOwnerName = () => {
        if (store.certifications && store.certifications.length > 0) {
            return {
                firstName: store.certifications[0].user_first_name,
                lastName: store.certifications[0].user_last_name,
            };
        }
        return null;
    };

    const ownerInfo = getOwnerName();

    const isOwner = store.currentUser?.username === username;

    const handleEditClick = (certification) => {
        setEditMode(true);
        setCurrentCertification(certification);
    };

    const handleDeleteCertification = async (certificationId) => {
        await actions.deleteCertifications([certificationId]);
        await actions.getCertifications(username);
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
            <h1 className="text-center mb-4">
                {isOwner ? "Certification Tracker" :
                    store.certifications?.length > 0 ? `${ownerInfo?.firstName} ${ownerInfo?.lastName}'s Certifications` :
                        "No Certifications"}
            </h1>

            {isOwner && (
                <div className="mb-4 text-center">
                    <button
                        className={`btn ${editMode ? "btn-outline-secondary" : "btn-dark"}`}
                        onClick={toggleEditMode}
                    >
                        <i className="fa-solid fa-pencil me-2"></i>
                        {editMode ? "Exit Edit Mode" : "Edit Certifications"}
                    </button>
                </div>
            )}

            {editMode && isOwner && (
                <CertificationForm
                    editMode={editMode}
                    currentCertification={currentCertification}
                    setCurrentCertification={setCurrentCertification}
                    onCancel={() => setCurrentCertification(null)}
                    username={username}
                />
            )}

            <ul className="list-group">
                {store.certifications?.map((certification, index) => (
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