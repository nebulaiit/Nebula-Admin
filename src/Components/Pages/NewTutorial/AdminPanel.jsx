import React, { useState } from 'react';
import './AdminPanel.css';
import TopicForm from './TopicForm';
import PageForm from './PageForm';
import LanguageForm from './LanguageForm'

export default function AdminPanel() {

  const [activeSection, setActiveSection] = useState('language');

  const renderSection = () => {
    switch (activeSection) {
      case 'language':
        return <LanguageForm />;
      case 'topic':
        return <TopicForm />;
      case 'page':
        return <PageForm />;
      default:
        return <LanguageForm />;
    }
  };
  return (
    <div className="language-container mt-5">


      <div className="sidebar-section mb-4">
        <h2>Admin Panel (Tutorial CMS)</h2>

        <button onClick={() => setActiveSection('language')} className={activeSection === 'language' ? 'active' : ''}>Add Tutorial</button>
        <button onClick={() => setActiveSection('topic')} className={activeSection === 'topic' ? 'active' : ''}>Add Topic</button>
        <button onClick={() => setActiveSection('page')} className={activeSection === 'page' ? 'active' : ''}>Edit Content</button>

      </div>

      <div className="panel-content">
        <h4>CONTENT</h4>

        {renderSection()}
      </div>
    </div>
  );
}
