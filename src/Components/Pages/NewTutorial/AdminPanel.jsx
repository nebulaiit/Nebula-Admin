import React from 'react';
import LanguageForm from './LanguageForm';
import './AdminPanel.css';
import TopicForm from './TopicForm';
import PageForm from './PageForm';

export default function AdminPanel() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel (Tutorial CMS)</h2>
      <LanguageForm />
      <hr />
      <TopicForm />
      <hr />
      <PageForm />
    </div>
  );
}
