import React, { useState, useEffect } from 'react';
import './Content.css';


export default function Content() {
  const [tutorial, setTutorial] = useState('');
  const [heading, setHeading] = useState([{ name: '', content: [], images: [], videos: [] }]);
  const [topics, setTopics] = useState([{ name: '', content: [], images: [], videos: [] }]);
  const [articles, setArticles] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('allArticles'));
    setArticles(Array.isArray(storedArticles) ? storedArticles : []);
  }, []);

  const handleOpen = () => {
    setTutorial('');
    setHeading([{ name: '', content: [], images: [], videos: [] }]);
    setTopics([{ name: '', content: [], images: [], videos: [] }]);
    setStep(1);
    setFormModalOpen(true);
  };

  const handleFormClose = () => {
    setFormModalOpen(false);
    setTutorial('');
    setHeading([{ name: '', content: [], images: [], videos: [] }]);
    setTopics([{ name: '', content: [], images: [], videos: [] }]);
    setStep(1);
  };

  const handleSelectionContinue = () => {
    if (step === 1 && !(typeof tutorial === 'string' && tutorial.trim())) {
     
      return alert('Please enter a tutorial name!');
    }

    if (step === 2 && heading.some(h => !(typeof h.name === 'string' && h.name.trim()))) {
      return alert('Please enter a heading!');
    }

    if (step === 3 && topics.some(topic => !(typeof topic.name === 'string' && topic.name.trim()))) {
      return alert('Please enter at least one topic name!');
    }

    if (step === 4 && topics.some(topic => !topic.content || !topic.content.length)) {
      return alert('Please enter content for all topics!');
    }

    setStep(step + 1);
  };

  const addHeading = () => {
    setHeading([...heading, { name: '', content: [], images: [], videos: [] }]);
  };

  const removeHeading = (indexToRemove) => {
    const updated = [...heading];
    updated.splice(indexToRemove, 1);
    setHeading(updated);
  };

  const addTopic = () => {
    setTopics([...topics, { name: '', content: [], images: [], videos: [] }]);
  };

  const removeTopic = (indexToRemove) => {
    const updated = topics.filter((_, index) => index !== indexToRemove);
    setTopics(updated);
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
        images: topic.images.map((img) => (typeof img === 'string' ? img : URL.createObjectURL(img))),
        videos: topic.videos.map((vid) => (typeof vid === 'string' ? vid : URL.createObjectURL(vid))),
      })),
    };

    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    localStorage.setItem('allArticles', JSON.stringify(updatedArticles));
    setLoading(false);
    handleFormClose();
  };

  return (
    <div className="content-wrapper">
      <h2>Add New Content</h2>
      <button onClick={handleOpen} style={{ marginBottom: '1rem' }}>
        ➕ Add Article
      </button>

      {articles.length === 0 ? (
        <p>No articles found. Please add a new article.</p>
      ) : (
        articles.map((article, index) => (
          <div className='content-container' key={index} >
            <h3>Tutorial: {article.tutorial}</h3>
            <p>Heading: {article.heading.map(h => h.name).join(', ')}</p>

            {Array.isArray(article.topics) &&
              article.topics.map((topic, secIndex) => (
                <div key={secIndex} style={{ marginBottom: '1rem' }}>
                  <strong>Topic: {topic.name}</strong>
                  {topic.content.map((contentItem, i) => (
                    <p key={i}>{contentItem.value}</p>
                  ))}
                  {topic.images.length > 0 && (
                    <div className="image-preview">
                      {topic.images.map((img, i) => (
                        <img key={i} src={img} alt="uploaded" style={{ maxWidth: '100%', marginTop: '0.5rem' }} />
                      ))}
                    </div>
                  )}
                  {topic.videos.length > 0 && (
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
          </div>
        ))
      )}

      {formModalOpen && (
        <div className="modal-container">
          <form onSubmit={handleSave}>
            <h3>Add Article</h3>

            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Tutorial"
                  value={tutorial}
                  onChange={(e) => setTutorial(e.target.value)}
                  style={{ display: 'block', margin: '1rem 0', width: '100%' }}
                />
                <button type="button" onClick={handleSelectionContinue}>Continue</button>
              </>
            )}

            {step === 2 && (
              <>
                {heading.map((item, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder={`Heading Name ${index + 1}`}
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...heading];
                        updated[index].name = e.target.value;
                        setHeading(updated);
                      }}
                      style={{ display: 'block', margin: '1rem 0', width: '100%' }}
                    />
                    {heading.length > 1 && (
                      <button type="button" onClick={() => removeHeading(index)} style={{ color: 'red' }}>
                        Remove Heading
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addHeading}>Add Another Heading</button>
                <button type="button" onClick={handleSelectionContinue} style={{ display: 'block', marginTop: '1rem' }}>
                  Continue
                </button>
              </>
            )}

            {step === 3 && (
              <>
                {topics.map((topic, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder={`Topic Name ${index + 1}`}
                      value={topic.name}
                      onChange={(e) => {
                        const updated = [...topics];
                        updated[index].name = e.target.value;
                        setTopics(updated);
                      }}
                      style={{ display: 'block', margin: '1rem 0', width: '100%' }}
                    />
                    {topics.length > 1 && (
                      <button type="button" onClick={() => removeTopic(index)} style={{ color: 'red' }}>
                        Remove Topic
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addTopic}>Add Another Topic</button>
                <button type="button" onClick={handleSelectionContinue} style={{ display: 'block', marginTop: '1rem' }}>
                  Continue
                </button>
              </>
            )}

            {step === 4 && (
              <>
                {topics.map((topic, topicIndex) => (
                  <div key={topicIndex}>
                    <strong>{topic.name}</strong>
                    {topic.content.map((contentItem, contentIndex) => (
                      <input
                        key={contentIndex}
                        type="text"
                        placeholder={`Content ${contentIndex + 1}`}
                        value={contentItem.value}
                        onChange={(e) => {
                          const updated = [...topics];
                          updated[topicIndex].content[contentIndex].value = e.target.value;
                          setTopics(updated);
                        }}
                        style={{ display: 'block', margin: '0.5rem 0', width: '100%' }}
                      />
                    ))}
                    <button type="button" onClick={() => addContent(topicIndex)}>Add Content</button>
                    {topic.content.length > 0 && (
                      <button
                        type="button"
                        onClick={() => removeContent(topicIndex, topic.content.length - 1)}
                        style={{ color: 'red', marginLeft: '0.5rem' }}
                      >
                        Remove Last Content
                      </button>
                    )}
                    <br />
                    <label style={{ marginTop: '0.5rem' }}>
                      Upload Images:
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageChange(topicIndex, e.target.files)}
                      />
                    </label>
                    <br />
                    <label style={{ marginTop: '0.5rem' }}>
                      Upload Videos:
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={(e) => handleVideoChange(topicIndex, e.target.files)}
                      />
                    </label>
                  </div>
                ))}
                <button type="submit" style={{ display: 'block', marginTop: '1rem' }}>
                  Save Article
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </div>

  );
}