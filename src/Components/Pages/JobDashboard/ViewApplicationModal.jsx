import React from 'react';
import './CompanyDashboard.css';


const ViewApplicationModal = ({ application, onClose, onStatusChange }) => {

    const handleApprove = () => {
        onStatusChange(application.id, "Approved");
        onClose();
    };

    const handleReject = () => {
        onStatusChange(application.id, "Rejected");
        onClose();
    };
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Application Details</h2>
                <p><strong>Name:</strong> {application.name}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Applied For:</strong> {application.appliedFor}</p>
                <p><strong>Experience:</strong> {application.experience}</p>
                <p><strong>Location:</strong> {application.location}</p>
                <p><strong>Applied On:</strong> {application.appliedOn}</p>
                <p><strong>Download Resume</strong> </p>
                <div className="modal-actions">
                    <button onClick={handleApprove}>✅ Approve</button>
                    <button onClick={handleReject}>❌ Reject</button>
                    <button className="light" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ViewApplicationModal;
