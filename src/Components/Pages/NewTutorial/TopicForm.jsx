import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopicForm.css'


// [
//   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "name": "string",
//     "slug": "string"
//   }
// ]

const TopicForm = () => {
  const [languages, setLanguages] = useState([]);
  const [languageId, setLanguageId] = useState('3fa85f64-5717-4562-b3fc-2c963f66afa6');
  const [topicName, setTopicName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // const getLanguages = async () => {
    //   try {
    //     const langs = await fetchLanguages();
    //     setLanguages(langs);
    //   } catch (err) {
    //     setMessage('Failed to load languages');
    //   }
    // };
    // getLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!languageId || !topicName) return setMessage('Fill all fields');

    console.log(languageId)
    console.log(topicName)

    // try {
    //   await createTopic({ name: topicName, languageId });
    //   setMessage('Topic created successfully!');
    //   setTopicName('');
    // } catch (err) {
    //   setMessage('Error creating topic');
    // }
  };

  return (
    <div className="container mt-5">
      <h4>Add Topic</h4>
      <form onSubmit={handleSubmit}>
        <select className="form-select mb-3" value={languageId} onChange={e => setLanguageId(e.target.value)}>
          <option value="">Select Language</option>
          {languages.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Topic Name"
          value={topicName}
          onChange={e => setTopicName(e.target.value)}
        />

        <button className="btn btn-primary">Create Topic</button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
};

export default TopicForm;
