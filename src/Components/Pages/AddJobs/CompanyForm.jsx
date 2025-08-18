import React, { useState } from "react";
import "./CompanyForm.css";

export default function CompanyForm() {
  const [company, setCompany] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="company-form-container">
      <h2 className="form-title">Add Company</h2>
      {message && <div className="alert">{message}</div>}

      <form onSubmit={handleSubmit} className="company-form">
        <div className="main-form-group">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                placeholder="Enter company email"
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={company.website}
                onChange={handleChange}
                placeholder="Enter company website"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={company.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={company.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>
        </div>

        <button type="submit" className="submit-btn">Add Company</button>
      </form>
    </div>
  );
}
