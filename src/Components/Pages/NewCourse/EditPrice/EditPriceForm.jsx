import React from 'react'
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import './EditPrice.css'

export default function EditPriceForm({ onBack, onNext }) {
  return (
    <>
    <div className="edit-price-form mt-4 ms-4">

        <p>Course Duration Type</p>
        <select className='validity'>
        <option>Single Validity</option>
        <option>Multiple Validity</option>
        <option>Lifetime Validity</option>
        </select>
        <p className="text-light mt-3 ms-2 small">Course will expire after a fixed period of time for all students based on their purchase date.
        </p>

        <div className="d-flex year-card gap-3 my-4">
        <input type="number" placeholder="1" />
        <select className='period'>
            <option>Year</option>
            <option>Month</option>
        </select>
        </div>

        <div className="d-flex price-card gap-3 my-4">
        <div>
            <label>Price</label>
            <div className="price-box"><input type="number" defaultValue="1" /></div>
        </div>
        <div>
            <label>Discount</label>
            <div className="price-box"><input type="number" defaultValue="0" /></div>
        </div>
        <div>
            <label>Effective Price</label>
            <div className="price-box disabled">₹ 1.03</div>
        </div>
        </div>
</div>
     
        <div className="input-button-wrapper d-flex justify-content-between me-4 mt-5 ">
            <button onClick={onBack}><BackIcon/>Previous</button>
            <button type="button" onClick={onNext}>Add Content<EastIcon /></button>
        </div>
   
    </>
  )
}
