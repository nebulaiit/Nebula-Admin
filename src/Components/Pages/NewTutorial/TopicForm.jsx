import React, { useState, useEffect } from 'react';
import { Dropdown } from "react-bootstrap";
import axios from 'axios';
import './TopicForm.css'
import { fetchLanguages } from '../../APIService/apiservice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const TopicForm = () => {
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguageName, setSelectedLanguageName] = useState("Select Language");

  const [topic, setTopic] = useState({
    languageId: "",
    topicName: ""
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(topic)


  };

  const onSelectLanguage = (id, name) => {

    setSelectedLanguageName(name);
    setMenuOpen(false);
    setTopic((prev) => ({
      ...prev,
      languageId: id,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="topic-form ">
      <h4 className='form-title'>Add Topic</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <button
            type="button"
            className="dropdown-btn"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }}
          >
            {selectedLanguageName} <ExpandMoreIcon />
          </button>
        </div>

        {menuOpen && (
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


        <input
          type="text"
          className="form-control mb-3"
          placeholder="Topic Name"
          name='topicName'
          value={topic.topicName}
          onChange={handleChange}
        />

        <button className="form-button">Create Topic</button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
};

export default TopicForm;
