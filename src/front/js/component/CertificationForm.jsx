import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { PlusCircle, ArrowsExpand, X } from 'react-bootstrap-icons';

const CertificationForm = ({ setEditMode, currentCertification, setCurrentCertification, onCancel, username }) => {
    const { actions } = useContext(Context);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isNewTab, setIsNewTab] = useState(false);

    const [certificationFormData, setCertificationFormData] = useState({
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
        if (currentCertification) {
            setCertificationFormData({
                ...currentCertification,
                exp_starting_date: currentCertification.exp_starting_date ? new Date(currentCertification.exp_starting_date).toISOString().substring(0, 10) : "",
                start_date: currentCertification.start_date ? new Date(currentCertification.start_date).toISOString().substring(0, 10) : "",
                due_date: currentCertification.due_date ? new Date(currentCertification.due_date).toISOString().substring(0, 10) : "",
                expiration_date: currentCertification.expiration_date ? new Date(currentCertification.expiration_date).toISOString().substring(0, 10) : "",
            });
        }
    }, [currentCertification]);

    const handleCertificationChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCertificationFormData({ ...certificationFormData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { exp_starting_date, start_date, due_date, expiration_date } = certificationFormData;

        const certificationData = {
            ...certificationFormData,
            exp_starting_date: exp_starting_date || null,
            start_date: start_date || null,
            due_date: due_date || null,
            expiration_date: expiration_date || null
        };

        if (currentCertification) {
            await actions.editCertification(currentCertification.id, certificationData);
        } else {
            await actions.addCertifications(certificationData);
        }

        await actions.getCertifications(username);

        setCurrentCertification(null);
        setCertificationFormData({
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
        setCurrentCertification(null);
        setCertificationFormData({
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
        window.open('/certification-form', '_blank');
    };

    if (isNewTab) {
        return null;
    }

    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{currentCertification ? "Edit Certification" : "Add New Certification"}</h5>
                <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={toggleMinimize}>
                        {isMinimized ? <ArrowsExpand /> : <X />}
                    </button>
                    {/* <button className="btn btn-sm btn-outline-secondary" onClick={openInNewTab}>
                        <ArrowsExpand />
                    </button> */}
                </div>
            </div>
            {!isMinimized && (
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column justify-content-center">
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="is_completed"
                                        name="is_completed"
                                        checked={certificationFormData.is_completed}
                                        onChange={handleCertificationChange}
                                    />
                                    <label className="form-check-label" htmlFor="is_completed">Completed</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="number"
                                        placeholder="Certification Number"
                                        name="number"
                                        value={certificationFormData.number}
                                        onChange={handleCertificationChange}
                                    />
                                    <label htmlFor="number">Certification Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Certification Name"
                                        name="name"
                                        value={certificationFormData.name}
                                        onChange={handleCertificationChange}
                                        required
                                    />
                                    <label htmlFor="name">Certification Name</label>
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
                                        value={certificationFormData.exp_starting_date}
                                        onChange={handleCertificationChange}
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
                                        value={certificationFormData.start_date}
                                        onChange={handleCertificationChange}
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
                                        value={certificationFormData.due_date}
                                        onChange={handleCertificationChange}
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
                                        value={certificationFormData.expiration_date}
                                        onChange={handleCertificationChange}
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
                                value={certificationFormData.exp_timeframe}
                                onChange={handleCertificationChange}
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
                                value={certificationFormData.other_details}
                                onChange={handleCertificationChange}
                            />
                            <label htmlFor="other_details">Other Details</label>
                        </div>
                        <button className="btn btn-success" type="submit">
                            {!currentCertification && <PlusCircle className="me-2" />}
                            {!currentCertification ? "Add Certification" : "Update Certification"}
                        </button>
                        {currentCertification && (
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

export default CertificationForm;