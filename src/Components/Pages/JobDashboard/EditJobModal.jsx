import React, { useState } from 'react';
import './CompanyDashboard.css';

const EditJobModal = ({ job, onClose }) => {
  const [form, setForm] = useState({ ...job });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    alert('Job Updated!');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Edit Job - {job.title}</h3>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />
        <label>Location</label>
        <input name="location" value={form.location} onChange={handleChange} />
        <label>Date</label>
        <input name="date" value={form.date} onChange={handleChange} />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
