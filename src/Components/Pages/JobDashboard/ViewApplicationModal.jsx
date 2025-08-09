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

        {/* Download Resume Button */}
        <a
          href={application.resumeUrl}
          className="download-resume-btn"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          📥 Download Resume
        </a>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="button-approve-blue" onClick={handleApprove}>
            ✅ Approve
          </button>
          <button className="button-reject-orange" onClick={handleReject}>
            ❌ Reject
          </button>
          <button className="light" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationModal;
