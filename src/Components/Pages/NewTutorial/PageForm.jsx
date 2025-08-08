import React, { useState, useEffect } from 'react';
import axios from 'axios';



// [
//   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "name": "string",
//     "slug": "string"
//   }
// ]


const PageForm = () => {
  const [languages, setLanguages] = useState([]);
  const [languageId, setLanguageId] = useState('3fa85f64-5717-4562-b3fc-2c963f66afa6');
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // axios.get('/api/languages').then(res => setLanguages(res.data));
  }, []);

  useEffect(() => {
    // if (languageId) {
    //   axios.get(`/api/topics/by-language/${languageId}`).then(res => setTopics(res.data));
    // } else {
    //   setTopics([]);
    // }
  }, [languageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(topicId);
    // if (!topicId || !pageTitle || !pageContent) return setMessage('Please fill all fields');
    // try {
    //   await axios.post('/api/pages', {
    //     title: pageTitle,
    //     contentHtml: pageContent,
    //     topicId
    //   });
    //   setMessage('Page created successfully!');
    //   setPageTitle('');
    //   setPageContent('');
    //   setTopicId('');
    // } catch (err) {
    //   setMessage('Error creating page');
    // }
  };

  return (
    <div className="container mt-5">
      <h4>Add Page</h4>
      <form onSubmit={handleSubmit}>
        <select className="form-select mb-3" value={languageId} onChange={e => setLanguageId(e.target.value)}>
          <option value="">Select Language</option>
          {languages.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <select className="form-select mb-3" value={topicId} onChange={e => setTopicId(e.target.value)} disabled={!topics.length}>
          <option value="">Select Topic</option>
          {topics.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Page Title"
          value={pageTitle}
          onChange={e => setPageTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Enter HTML content here"
          rows="6"
          value={pageContent}
          onChange={e => setPageContent(e.target.value)}
        />

        <button className="btn btn-success">Create Page</button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
};

export default PageForm;
