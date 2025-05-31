import React from 'react';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import './EditPrice.css';

export default function EditPriceForm({ onBack, onNext, data = {}, onChange }) {
  return (
    <div className="edit-price-form mt-4 ms-4">
      <p>Course Duration Type</p>
      <select className='validity' value={data.durationType} onChange={(e) => onChange("durationType", e.target.value)}>
        <option>Single Validity</option>
        <option>Multiple Validity</option>
        <option>Lifetime Validity</option>
      </select>

      <p className="text-light mt-3 ms-2 small">
        Course will expire after a fixed period of time for all students based on their purchase date.
      </p>

      <div className="d-flex year-card gap-3 my-4">
        <input
          type="number"
          placeholder="1"
          value={data.durationValue}
          onChange={(e) => onChange("durationValue", +e.target.value)}
        />
        <select className='period' value={data.durationUnit} onChange={(e) => onChange("durationUnit", e.target.value)}>
          <option>Year</option>
          <option>Month</option>
        </select>
      </div>

      <div className="d-flex price-card gap-3 my-4">
        <div>
          <label>Price</label>
          <div className="price-box">
            <input
              type="number"
              value={data.price}
              onChange={(e) => onChange("price", +e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Discount</label>
          <div className="price-box">
            <input
              type="number"
              value={data.discount}
              onChange={(e) => onChange("discount", +e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Effective Price</label>
          <div className="price-box disabled">₹ {Math.max(0, data.price - data.discount).toFixed(2)}</div>
        </div>
      </div>

      <div className="input-button-wrapper d-flex justify-content-between me-4 mt-5">
        <button onClick={onBack}><BackIcon />Previous</button>
        <button type="button" onClick={onNext}>Add Content<EastIcon /></button>
      </div>
    </div>
  );
}
