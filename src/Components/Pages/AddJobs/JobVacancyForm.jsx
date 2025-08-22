import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobVacancyForm.css";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/toastSlice";

export default function JobVacancyForm() {
     const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]);
    const [job, setJob] = useState({
        jobTitle: "",
        jobType: "",
        experience: "",
        salaryRange: "",
        requiredSkills: [""],
        companyId: "",
        education: "",
        jobDescription: "",
        responsibilities: [""],
        qualifications: [""],
        benefits: [""],
        isRemote: false,
        isActive: true,
        postedDate: "",
        lastDateToApply: ""
    });
    const [message, setMessage] = useState("");

    // Get logged-in user ID from localStorage
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get("http://localhost:8080/api/companies")
            .then(res => setCompanies(res.data))
            .catch(err => console.error("Error loading companies:", err));
            dispatch(showToast({ type: "error", message: "Failed to load companies" }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJob(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleArrayChange = (field, index, value) => {
        const arr = [...job[field]];
        arr[index] = value;
        setJob(prev => ({ ...prev, [field]: arr }));
    };

    const addArrayField = (field) => {
        setJob(prev => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeArrayField = (field, index) => {
        const arr = [...job[field]];
        arr.splice(index, 1);
        setJob(prev => ({ ...prev, [field]: arr }));
    };

    const handleSubmit = (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  // 👉 No API, no await
  try {
    // ✅ Show success toast directly
    dispatch(
      addToast({
        id: Date.now(),
        type: "success",
        message: "Tutorial added successfully 🎉",
      })
    );

    // setLanguages([...languages, language]); // optional if you want to update state
  } catch (err) {
    setMessage("Something went wrong");

    // ✅ Show error toast directly
    dispatch(
      addToast({
        id: Date.now(),
        type: "error",
        message: "❌ Failed to add tutorial. Please try again.",
      })
    );
  }
}
    return (
        <div className="job-form-container">
            <h2>Add Job Vacancy</h2>
            {message && <div className="alert">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group-wrapper">
                    <div className="form-box">
                        <label>Company</label>
                        <select
                            name="companyId"
                            value={job.companyId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select company</option>
                            {companies.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-box">
                        <label>Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={job.jobTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>


                <div className="form-group-wrapper">
                    <div className="form-box">
                        <label>Job Type</label>
                        <select name="jobType" value={job.jobType} onChange={handleChange} required>
                            <option value="">Select type</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                            <option>Remote</option>
                        </select>
                    </div>
                    <div className="form-box">
                        <label>Education</label>
                        <input
                            type="text"
                            name="education"
                            value={job.education}
                            onChange={handleChange}
                        />
                    </div>

                </div>


                <div className="form-group-wrapper">
                    <div className="form-box">
                        <label>Experience</label>
                        <input
                            type="text"
                            name="experience"
                            value={job.experience}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Salary Range</label>
                        <input
                            type="text"
                            name="salaryRange"
                            value={job.salaryRange}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-box">
                    <label>Job Description</label>
                    <textarea
                        name="jobDescription"
                        value={job.jobDescription}
                        onChange={handleChange}
                    />
                </div>

                <div className="array-box">
                    {/* Dynamic fields */}
                    {["requiredSkills", "responsibilities", "qualifications", "benefits"].map(field => (

                        <div key={field} className="array-field">
                            <label>{field.replace(/([A-Z])/g, " $1")}</label>
                            {job[field].map((item, idx) => (
                                <div key={idx} className="array-input">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                                    />
                                    <button type="button" onClick={() => removeArrayField(field, idx)}>x</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayField(field)}>+ Add</button>
                        </div>

                    ))}
                </div>





                <div className="form-group-wrapper mt-3">
                    <div className="form-box  d-flex">
                        <input
                            className="check-box"
                            type="checkbox"
                            name="isRemote"
                            checked={job.isRemote}
                            onChange={handleChange}
                        />
                        <label className="check-box-label">
                            Remote
                        </label>
                    </div>
                    <div className="form-box d-flex">
                        <input
                            className="check-box"
                            type="checkbox"
                            name="isActive"
                            checked={job.isActive}
                            onChange={handleChange}
                        />
                        <label className="check-box-label">

                            Active
                        </label>
                    </div>
                </div>

                <div className="form-group-wrapper">
                    <div className="form-box">
                        <label>Posted Date</label>
                        <input
                            type="date"
                            name="postedDate"
                            value={job.postedDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-box">
                        <label>Last Date to Apply</label>
                        <input
                            type="date"
                            name="lastDateToApply"
                            value={job.lastDateToApply}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="submit-btn">Add Job Vacancy</button>
            </form>
        </div>
    );
}
