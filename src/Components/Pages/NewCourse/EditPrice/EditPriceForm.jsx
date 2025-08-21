import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoursePrice } from '../../../Store/courseSlice';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import './EditPrice.css';
import { showToast } from '../../../redux/toastSlice';

export default function EditPriceForm({ onBack, onNext }) {
  const dispatch = useDispatch();
  const coursePrice = useSelector(state => state.course.coursePrice);

  const [form, setForm] = useState({ ...coursePrice });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['price', 'discount', 'duration'].includes(name) ? Number(value) : value
    }));
  };

    const handleSubmit = () => {
    // 🔹 Validation
    if (!form.price || form.price <= 0) {
      dispatch(showToast({ type: "error", message: "Please enter a valid price" }));
      return;
    }

    if (form.validityType === "Limited") {
      if (!form.duration || form.duration <= 0) {
        dispatch(showToast({ type: "error", message: "Please enter a valid duration" }));
        return;
      }
      if (!form.durationUnit) {
        dispatch(showToast({ type: "error", message: "Please select a duration unit" }));
        return;
      }
    }

    // 🔹 Save to Redux
    dispatch(setCoursePrice(form));

    // 🔹 Success toast
    dispatch(showToast({ type: "success", message: "Course price saved successfully!" }));

    // 🔹 Go to next step
    onNext();
  };

  return (
    <div className="edit-price-form mt-4 px-4">
      <h4>Edit Price</h4>

      <div className='d-flex align-items-center justify-content-between mt-3'>
        <div className="price-card">
          <label>Price (₹)</label>
          <div className="price-box">
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter course price"
            />
          </div>
        </div>
        <div className="price-card mt-3">
          <label>Discount (₹)</label>
          <div className="price-box">
            <input
              type="text"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="Enter discount amount"
            />
          </div>
        </div>
      </div>

      <div className="year-card mt-4">
        <label>Validity Type</label>
        <select
          name="validityType"
          className="validity"
          value={form.validityType}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="Lifetime">Lifetime</option>
          <option value="Limited">Limited</option>
        </select>
      </div>

      {form.validityType === 'Limited' && (
        <div className="duration-card mt-3">
          <div className='d-flex justify-content-between align-items-center'>
            <div className='input-card'>
              <label>Duration</label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Enter duration"
              />
            </div>
            <div className='input-card'>
              <label >Duration Unit</label>
              <select
                name="durationUnit"
                className="period"
                value={form.durationUnit}
                onChange={handleChange}
              >
                <option value="">--Select--</option>
                <option value="Days">Days</option>
                <option value="Months">Months</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="input-button-wrapper d-flex justify-content-between mt-5">
        <button type="button" onClick={onBack}>
          <BackIcon /> Previous
        </button>
        <button type="button" onClick={handleSubmit}>
          Add Content <EastIcon />
        </button>
      </div>
    </div>
  );
}
