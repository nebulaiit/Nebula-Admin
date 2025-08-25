import React, { useState } from 'react';
import './CompanyDashboard.css';
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/toastSlice";


const ViewApplicationModal = ({ application, onClose, onStatusChange }) => {
  const [downloadMsg, setDownloadMsg] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false); // state to control view modal
    const dispatch = useDispatch();

  const handleApprove = () => {
    
    onStatusChange(application.id, "Approved");

    // ✅ Success toast
    dispatch(showToast({
      message: `Application for ${application.name} approved 🎉`,
      type: "success",
    }));
    onClose();
  };

  const handleReject = () => {
    onStatusChange(application.id, "Rejected");

     // ✅ Error toast
    dispatch(showToast({
      message: `Application for ${application.name} rejected ❌`,
      type: "error",
    }));
    onClose();
  };

  // Programmatic Download
  const handleDownload = async () => {
    try {
       dispatch(showToast({
        message: "Downloading resume... ⏬",
        type: "info",
      }));

      const response = await fetch(application.resumeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${application.name}-resume.pdf`; // Dynamic filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setTimeout(() => setDownloadMsg(""), 3000);
    } catch (error) {
      dispatch(showToast({
        message: "Failed to download resume ❌",
        type: "error",
      }));
      console.error("Download error:", error);
    }
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

        {/* Download + View Resume Buttons Side by Side */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button className="download-resume-btn" onClick={handleDownload}>
            📥 Download Resume
          </button>

          <button
            className="view-resume-btn"
            onClick={() => setViewModalOpen(true)}
          >
            👀 View Resume
          </button>
        </div>

        {/* Download message below buttons */}
        {downloadMsg && <p className="download-message">{downloadMsg}</p>}

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

      {/* ---------- View Resume Modal ---------- */}
      {viewModalOpen && (
        <div className="modal-overlay" onClick={() => setViewModalOpen(false)}>
          <div
            className="modal-box"
            style={{ maxWidth: '80%', maxHeight: '80%' }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h3>Resume Preview</h3>
            <iframe
              src={application.resumeUrl}
              title="Resume Preview"
              width="100%"
              height="600px"
              style={{ border: 'none' }}
            />
            <button
              className="light"
              style={{ marginTop: '10px' }}
              onClick={() => setViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplicationModal;
