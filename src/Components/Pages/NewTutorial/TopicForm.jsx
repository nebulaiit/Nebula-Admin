import React, { useState, useEffect } from 'react';
import './TopicForm.css';
import axios from 'axios';

export default function TopicForm() {
  const [name, setName] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [languages, setLanguages] = useState([]);

  const fetchLanguages = async () => {
    const res = await axios.get('/api/languages');
    setLanguages(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/topics', {
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      language: { id: languageId },
    });
    setName('');
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <div>
      <h4>Add Topic</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <select
          className="form-select mb-2"
          value={languageId}
          onChange={(e) => setLanguageId(e.target.value)}
        >
          <option>Select Language</option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. OOP Concepts"
          className="form-control mb-2"
        />
        <button className="btn btn-success">Add Topic</button>
      </form>
    </div>
  );
}
