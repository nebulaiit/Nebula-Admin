import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PageForm.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PageForm() {
  const [title, setTitle] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState('');

  const fetchTopics = async () => {
    const res = await axios.get('/api/topics');
    setTopics(res.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('/api/upload-image', formData);
      const imageUrl = res.data;

      const quill = document.querySelector('.ql-editor');
      const range = window.getSelection().getRangeAt(0);
      const img = document.createElement('img');
      img.src = imageUrl;
      range.insertNode(img);
    };
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/pages', {
      title,
      contentHtml,
      topic: { id: topicId },
    });
    setTitle('');
    setContentHtml('');
  };

  return (
    <div>
      <h4>Add Page</h4>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-2"
          placeholder="Page Title"
        />
        <select
          className="form-select mb-2"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        >
          <option>Select Topic</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.language.name})
            </option>
          ))}
        </select>
        <ReactQuill
          value={contentHtml}
          onChange={setContentHtml}
          modules={modules}
        />
        <button className="btn btn-warning mt-3">Add Page</button>
      </form>
    </div>
  );
}
