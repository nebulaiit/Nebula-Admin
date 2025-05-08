import React, { useState, useEffect } from 'react';
import './Content.css';
import {
  Button,
  Modal,
  CircularProgress,
  Typography,
  Box,
  Paper,
  IconButton,
  TextField,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Content() {
  const [tutorial, setTutorial] = useState('');
  const [heading, setHeading] = useState('');
  const [topics, setTopics] = useState([{ name: '', content: [], images: [], videos: [] }]);
  const [articles, setArticles] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('allArticles'));
    setArticles(Array.isArray(storedArticles) ? storedArticles : []);
  }, []);

  const handleOpen = () => {
    setTutorial('');
    setHeading('');
    setTopics([{ name: '', content: [], images: [], videos: [] }]);
    setStep(1);
    setEditIndex(null);
    setFormModalOpen(true);
  };

  const handleFormClose = () => {
    setFormModalOpen(false);
    setTutorial('');
    setHeading('');
    setTopics([{ name: '', content: [], images: [], videos: [] }]);
    setStep(1);
    setEditIndex(null);
  };

  const handleSelectionContinue = () => {
    if (step === 1 && !tutorial.trim()) return alert('Please enter a tutorial name!');
    if (step === 2 && !heading.trim()) return alert('Please enter a heading!');
    if (step === 3 && topics.some(topic => !topic.name.trim())) return alert('Please enter at least one topic name!');
    if (step === 4 && topics.some(topic => !topic.content.length)) return alert('Please enter content for all topics!');
    setStep(step + 1);
  };

  const addTopic = () => {
    setTopics([...topics, { name: '', content: [], images: [], videos: [] }]);
  };

  const removeTopic = (indexToRemove) => {
    setTopics(prevTopics => prevTopics.filter((_, index) => index !== indexToRemove));
  };

  const addContent = (index) => {
    const updated = [...topics];
    updated[index].content.push({ type: 'text', value: '' });
    setTopics(updated);
  };

  const removeContent = (topicIndex, contentIndex) => {
    const updated = [...topics];
    updated[topicIndex].content.splice(contentIndex, 1);
    setTopics(updated);
  };

  const handleImageChange = (topicIndex, files) => {
    const updated = [...topics];
    updated[topicIndex].images = Array.from(files);
    setTopics(updated);
  };

  const handleVideoChange = (topicIndex, files) => {
    const updated = [...topics];
    updated[topicIndex].videos = Array.from(files);
    setTopics(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = {
      tutorial,
      heading,
      topics: topics.map((topic) => ({
        name: topic.name,
        content: topic.content,
        images: topic.images.map((img) =>
          typeof img === 'string' ? img : URL.createObjectURL(img)
        ),
        videos: topic.videos.map((vid) =>
          typeof vid === 'string' ? vid : URL.createObjectURL(vid)
        ),
      })),
    };

    let updatedArticles = [...articles];
    if (editIndex !== null) {
      updatedArticles[editIndex] = newArticle;
    } else {
      updatedArticles.push(newArticle);
    }

    setArticles(updatedArticles);
    localStorage.setItem('allArticles', JSON.stringify(updatedArticles));
    setLoading(false);
    handleFormClose();
  };

  const handleEdit = (index) => {
    const article = articles[index];
    setTutorial(article.tutorial);
    setHeading(article.heading);
    setTopics(
      Array.isArray(article.topics)
        ? article.topics.map((topic) => ({
            name: topic.name,
            content: topic.content,
            images: topic.images,
            videos: topic.videos,
          }))
        : []
    );
    setEditIndex(index);
    setStep(1);
    setFormModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...articles];
    updated.splice(index, 1);
    setArticles(updated);
    localStorage.setItem('allArticles', JSON.stringify(updated));
  };

  return (
    <div className="content-wrapper">
  <h2>Add New Content</h2>

  <button onClick={handleOpen} style={{ marginBottom: '1rem' }}>
    <span style={{ marginRight: '0.5rem' }}>➕</span> Add Article
  </button>

  {articles.length === 0 ? (
    <p>No articles found. Please add a new article.</p>
  ) : (
    articles.map((article, index) => (
      <div
        key={index}
        style={{
          border: '1px solid #ddd',
          borderRadius: '6px',
          padding: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <h3>Tutorial: {article.tutorial}</h3>
        <h4>Heading: {article.heading}</h4>

        {Array.isArray(article.topics) &&
          article.topics.map((topic, secIndex) => (
            <div key={secIndex} style={{ marginBottom: '1rem' }}>
              <strong>Topic:</strong> {topic.name}
              {topic.content.map((contentItem, i) => (
                <p key={i}>{contentItem.value}</p>
              ))}

              {Array.isArray(topic.images) && topic.images.length > 0 && (
                <div className="image-preview">
                  {topic.images.map((img, i) => (
                    <img key={i} src={img} alt="uploaded" style={{ maxWidth: '100%', margin: '5px 0' }} />
                  ))}
                </div>
              )}

              {Array.isArray(topic.videos) && topic.videos.length > 0 && (
                <div className="video-preview">
                  {topic.videos.map((vid, i) => (
                    <video key={i} width="320" height="240" controls>
                      <source src={vid} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
            </div>
          ))}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleEdit(index)} style={{ color: 'blue' }}>✏️ Edit</button>
          <button onClick={() => handleDelete(index)} style={{ color: 'red' }}>🗑️ Delete</button>
        </div>
      </div>
    ))
  )}

  {formModalOpen && (
    <div className="modal-container">
      <form onSubmit={handleSave}>
        <h3>{editIndex !== null ? 'Edit Article' : 'Add Article'}</h3>

        {step === 1 && (
          <>
            <label>Tutorial</label>
            <input type="text" value={tutorial} onChange={(e) => setTutorial(e.target.value)} />
            <button onClick={handleSelectionContinue}>Continue</button>
          </>
        )}

        {step === 2 && (
          <>
            <label>Heading</label>
            <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />
            <button onClick={handleSelectionContinue}>Continue</button>
          </>
        )}

        {step === 3 && (
          <>
            {topics.map((topic, index) => (
              <div key={index}>
                <label>{`Topic Name ${index + 1}`}</label>
                <input
                  type="text"
                  value={topic.name}
                  onChange={(e) => {
                    const updated = [...topics];
                    updated[index].name = e.target.value;
                    setTopics(updated);
                  }}
                />
                {topics.length > 1 && (
                  <button type="button" onClick={() => removeTopic(index)} style={{ color: 'red' }}>
                    Remove Topic
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addTopic}>➕ Add Another Topic</button>
            <button onClick={handleSelectionContinue}>Continue</button>
          </>
        )}

        {step === 4 && (
          <>
            {topics.map((topic, index) => (
              <div key={index}>
                <h4>{`Content for Topic: ${topic.name}`}</h4>
                {topic.content.map((content, contentIndex) => (
                  <div key={contentIndex}>
                    <label>{`Content ${contentIndex + 1}`}</label>
                    <textarea
                      rows="4"
                      value={content.value}
                      onChange={(e) => {
                        const updated = [...topics];
                        updated[index].content[contentIndex].value = e.target.value;
                        setTopics(updated);
                      }}
                    ></textarea>
                    <button type="button" onClick={() => removeContent(index, contentIndex)} style={{ color: 'red' }}>
                      Remove Content
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addContent(index)}>➕ Add Another Content</button>

                <label>
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e.target.files)}
                  />
                </label>

                <label>
                  Upload Videos
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleVideoChange(index, e.target.files)}
                  />
                </label>
              </div>
            ))}

            <div style={{ marginTop: '1rem' }}>
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )}
    </div>

  );
}
 
