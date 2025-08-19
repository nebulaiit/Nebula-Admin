import React, { useEffect, useState } from "react";
import "./EditContent.css";
import { fetchLanguages, fetchPageBySlug, fetchTopicByLang } from "../../APIService/apiservice";


export default function EditContent() {
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [pages, setPages] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  const [message, setMessage] = useState("");

  // Language form
  const [langName, setLangName] = useState("");

  // Topic form
  const [topicName, setTopicName] = useState("");

  // Page form
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");


  useEffect(() => {
    const getLanguages = async () => {
      try {
        const langs = await fetchLanguages  ();
        console.log(langs)
        setLanguages(langs);
      } catch (err) {
        setMessage('Failed to load languages');
      }
    };
    getLanguages();
  }, []);

  const handleLanguageClick = async (lang) => {
    setSelectedLanguage(lang);
    setLangName(lang.name);
    try {
      const res = await fetchTopicByLang(lang.id);
        console.log(res)

      setTopics(res);
      setPages([]);
      setSelectedTopic(null);
      setSelectedPage(null);
    } catch {
      setMessage("Failed to load topics");
    }
  };

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setTopicName(topic.name);
    try {
      const res = await fetchPageBySlug(topic.slug);
        console.log(res)

      setPages(res);
      setSelectedPage(null);
    } catch {
      setMessage("Failed to load pages");
    }
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
    setPageTitle(page.title);
    setPageContent(page.contentHtml);
  };

  const handleLanguageUpdate = async () => {
    try {
      await updateLanguage(selectedLanguage.id, { name: langName });
      setMessage("Language updated successfully");
    } catch {
      setMessage("Failed to update language");
    }
  };

  const handleTopicUpdate = async () => {
    try {
      await updateTopic(selectedTopic.id, { name: topicName });
      setMessage("Topic updated successfully");
    } catch {
      setMessage("Failed to update topic");
    }
  };

  const handlePageUpdate = async () => {
    try {
      await updatePage(selectedPage.id, {
        title: pageTitle,
        contentHtml: pageContent,
      });
      setMessage("Page updated successfully");
    } catch {
      setMessage("Failed to update page");
    }
  };

  return (
    <div className="edit-content-wrapper">
      <h2>Edit Tutorial Content</h2>

      {message && <p className="alert">{message}</p>}

      <div className="columns">
        {/* Languages */}
        <div className="box-col lang-box">
          <h3>Languages</h3>
          <ul>
            {languages.map((lang) => (
              <li
                key={lang.id}
                onClick={() => handleLanguageClick(lang)}
                className={selectedLanguage?.id === lang.id ? "active" : ""}
              >
                {lang.name}
              </li>
            ))}
          </ul>
          {selectedLanguage && (
            <div className="form">
              <input
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
              />
              <button onClick={handleLanguageUpdate}>Update Language</button>
            </div>
          )}
        </div>

        {/* Topics */}
        <div className="box-col topic-box">
          <h3>Topics</h3>
          <ul>
            {topics.map((topic) => (
              <li
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className={selectedTopic?.id === topic.id ? "active" : ""}
              >
                {topic.name}
              </li>
            ))}
          </ul>
          {selectedTopic && (
            <div className="form">
              <input
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
              <button onClick={handleTopicUpdate}>Update Topic</button>
            </div>
          )}
        </div>

        {/* Pages */}
        <div className="box-col page-box">
          <h3>Pages</h3>
          <div className="page-box-wrapper">
            <div>
              <ul>
                {pages.map((page) => (
                  <li
                    key={page.id}
                    onClick={() => handlePageClick(page)}
                    className={selectedPage?.id === page.id ? "active" : ""}
                  >
                    {page.title}
                  </li>
                ))}
              </ul>
            </div>
            {selectedPage && (
              <div className="form">
                <input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                />
                <textarea
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                ></textarea>
                <button onClick={handlePageUpdate}>Update Page</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
