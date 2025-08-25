import React, { useState } from 'react';
import './CompanyDashboard.css';
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/toastSlice";

const EditJobModal = ({ job, onClose }) => {
  const [form, setForm] = useState({ ...job });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    dispatch(showToast({
      message: "Job updated successfully 🎉",
      type: "success",
    }));
    // Later you can call your API here instead of just success
    // await updateJobAPI(form);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box enhanced-modal">
        <h3 className="modal-title">✏️ Edit Job - {job.title}</h3>

        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input
            className="form-input"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            className="form-input"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter job location"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            className="form-input"
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSubmit}>
            💾 Save
          </button>
          <button className="btn-cancel" onClick={onClose}>
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
