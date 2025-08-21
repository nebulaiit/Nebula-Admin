import React, { useState, useEffect } from 'react';
import './PageForm.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchLanguages, FetchTopicByLang } from '../../APIService/apiservice';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice'; 


const PageForm = () => {
  const [languages, setLanguages] = useState([]);
  const [languageId, setLanguageId] = useState('');
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [message, setMessage] = useState('');
  const [menuLanguage, setMenuLanguage] = useState(false);
  const [menuTopic, setMenuTopic] = useState(false);
  const [selectedLanguageName, setSelectedLanguageName] = useState("Select Language");
  const [selectedTopicName, setSelectedTopicName] = useState("Select Topic");
  const dispatch = useDispatch();


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(topicId);

    if (!languageId || !topicId || !pageTitle || !pageContent) {
      dispatch(
        showToast({ message: "⚠️ Please fill all fields before submitting", type: "warning" })
      );
      return;
    }

    try {
      // TODO: Replace with your API call to createPage
      // await createPage({ languageId, topicId, pageTitle, pageContent });

      dispatch(
        showToast({ message: "✅ Page created successfully!", type: "success" })
      );

      // Reset form
      setPageTitle("");
      setPageContent("");
      setSelectedTopicName("Select Topic");
      setTopicId("");
    } catch (err) {
      dispatch(
        showToast({ message: "❌ Failed to create page. Please try again.", type: "error" })
      );
    }
  };

  const onSelectLanguage = (id, name) => {
    setLanguageId(id)
    setSelectedLanguageName(name);
    setMenuLanguage(false);

  };
  const onSelectTopic = (id, name) => {
    setTopicId(id)
    setSelectedTopicName(name);
    setMenuTopic(false);

  };

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const langs = await fetchLanguages();
        setLanguages(langs);
      } catch (err) {
        setMessage('Failed to load languages');
      }
    };
    getLanguages();
  }, []);

  useEffect(() => {
    if (!languageId) return; // skip if empty
    const getTopics = async () => {
      try {
        const res = await FetchTopicByLang(languageId);
        setTopics(res);
      } catch (err) {
        setMessage('Failed to load languages');
      }
    };
    getTopics();
  }, [languageId]);

  return (
    <div className="page-form-container">
      <h4>Add Page</h4>
      <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between'>
          <div className='dropdwon-menu'>
            <button
              type="button"
              className="dropdown-language-btn"
              onClick={(e) => {
                e.preventDefault();
                setMenuLanguage(!menuLanguage);
              }}
            >
              {selectedLanguageName} <ExpandMoreIcon />
            </button>
          </div>
          <div className='dropdwon-menu'>
            <button
              type="button"
              className="dropdown-topic-btn"
              onClick={(e) => {
                e.preventDefault();
                setMenuTopic(!menuTopic);
              }}
            >
              {selectedTopicName} <ExpandMoreIcon />
            </button>
          </div>
        </div>

        {menuLanguage && (
          <>

            <div className="language-dropdown-menu">
              {languages.map((l) => (
                <div
                  key={l.id}
                  className="dropdown-item"
                  onClick={() => onSelectLanguage(l.id, l.name)}
                >
                  {l.name}
                </div>
              ))}
            </div>
          </>
        )}
        {menuTopic && (
          <>

            <div className="topic-dropdown-menu">
              {topics && topics.length > 0 ? (
                topics.map((l) => (
                  <div
                    key={l.id}
                    className="dropdown-item"
                    onClick={() => onSelectTopic(l.id, l.name)}
                  >
                    {l.name}
                  </div>
                ))
              ) : (
                <div className="dropdown-no-item mx-4">
                  <p className='m-0'>Please select the Language first</p>
                </div>
              )}
            </div>
          </>
        )}



        <input
          type="text"
          className="page-form-input"
          placeholder="Page Title"
          value={pageTitle}
          onChange={e => setPageTitle(e.target.value)}
        />

        <textarea
          className="page-form-input page-form-textarea"
          placeholder="Enter HTML content here"
          rows="6"
          value={pageContent}
          onChange={e => setPageContent(e.target.value)}
        />

        <button className="page-form-button">Create Page</button>

        {message && <div className="page-form-message">{message}</div>}
      </form>
    </div>
  );
};

export default PageForm;
