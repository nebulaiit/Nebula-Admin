import React, { useState } from "react";
import axios from "axios";
import "./LanguageForm.css";
import { addNewTutorial } from "../../APIService/apiservice";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/toastSlice";

export default function LanguageForm() {
  const [language, setLanguage] = useState({
    name: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem('token');
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLanguage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addNewTutorial(token, language);

      // ✅ Success toast
      dispatch(
        showToast({
          message: "Language added successfully 🎉",
          type: "success",
        })
      );

      // ✅ Reset form after success
      setLanguage({ name: "", category: "" });

    } catch (err) {
      // ✅ Error toast
      dispatch(
        showToast({
          message: "❌ Failed to add language. Please try again.",
          type: "error",
        })
      );
    }
  };    


  return (
    <div className="language-form-container">
      <h2 className="form-title">Add New Language</h2>

      <form onSubmit={handleSubmit} className="language-form">
        <label htmlFor="name" className="form-label">
          Language Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          placeholder="Enter language name (e.g., HTML, Java)"
          value={language.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="category" className="form-label">
          Language Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="form-input"
          placeholder="Enter language category (e.g., Frontend, Backend)"
          value={language.category}
          onChange={handleChange}
          required
        />

        <button type="submit" className="form-button">
          Add Language
        </button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
