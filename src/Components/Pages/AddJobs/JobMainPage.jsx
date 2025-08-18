import React, { useState } from 'react'
import './JobMainPage.css'
import CompanyForm from './CompanyForm';
import JobVacancyForm from './JobVacancyForm';

export default function JobMainPage() {

    const [activeSection, setActiveSection] = useState('company');

    const renderSection = () => {
        switch (activeSection) {
            case 'company':
                return <CompanyForm/>;
            case 'jobOpening':
                return <JobVacancyForm/>;
            default:
                return <CompanyForm/>;
        }
    };
    return (
        <>
            <div className="job-container">

                <div className="side-options-box">
                    <h2>Job Opening </h2>

                    <button onClick={() => setActiveSection('company')} className={activeSection === 'company' ? 'active' : ''}>Add Company Details</button>
                    <button onClick={() => setActiveSection('jobOpening')} className={activeSection === 'jobOpening' ? 'active' : ''}>Add Job Vacancy Details</button>

                </div>

                <div className="job-content-box">

                    {renderSection()}
                </div>
            </div>
        </>
    )
}
