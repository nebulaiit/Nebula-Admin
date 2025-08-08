import React, { useState, useEffect } from 'react';
import './LanguageForm.css';

import axios from 'axios';

export default function LanguageForm() {
  const [name, setName] = useState('');
  const [languages, setLanguages] = useState([]);

  const fetchLanguages = async () => {
    const res = await axios.get('/api/languages');
    setLanguages(res.data);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/languages', {
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    });
    setName('');
    fetchLanguages();
  };

  return (
    <div>
      <h4>Add Language</h4>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Java"
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Add Language</button>
      </form>
      <ul>
        {languages.map((lang) => (
          <li key={lang.id}>{lang.name}</li>
        ))}
      </ul>
    </div>
  );
}
