import React, { useState } from "react";
import axios from "axios";
import "./LanguageForm.css";

export default function LanguageForm(){
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name);

    // try {
    //   const response = await axios.post("http://localhost:8080/api/language", {
    //     name,
    //   });

    //   if (response.data.code === 201) {
    //     setMessage("Language created successfully!");
    //     setError("");
    //     setName("");
    //   }
    // } catch (err) {
    //   if (err.response?.status === 409) {
    //     setError("Language already exists.");
    //   } else {
    //     setError("Something went wrong.");
    //   }
    //   setMessage("");
    // }
  };

  return (
    <div className="language-form-container">
      <h2 className="form-title">Add New Language</h2>

      <form onSubmit={handleSubmit} className="language-form">
        <label htmlFor="languageName" className="form-label">
          Language Name
        </label>
        <input
          type="text"
          id="languageName"
          className="form-input"
          placeholder="Enter language name (e.g., HTML, Java)"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
};



"http://localhost:8080/api/topic/{id}" 