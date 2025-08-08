import React, { useState } from 'react';
// import EditJobModal from './EditJobModal';
// import ViewApplicationModal from './ViewApplicationModal';
import './CompanyDashboard.css';
import ViewApplicationModal from './ViewApplicationModal';
import EditJobModal from './EditJobModal';

const CompanyDashboard = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);

    const [showViewModal, setShowViewModal] = useState(false);
    const [applicationToView, setApplicationToView] = useState(null);


    const jobs = [
        { id: 1, title: 'Backend Developer', location: 'Pune', date: 'Jul 28, 2025', applicants: 34 },
        { id: 2, title: 'Graphic Designer', location: 'Mumbai', date: 'Jul 25, 2025', applicants: 22 }
    ];

    const applicants = [
        {
            id: 1,
            name: 'Rohit Sharma',
            email: 'rohit.sharma@example.com',
            appliedFor: 'Frontend Developer',
            location: 'Pune',
            experience: '2 years',
            resumeLink: 'https://example.com/resume/rohit-sharma.pdf',
            appliedOn: 'Aug 4, 2025',
            status: "Pending" // default status
        },
        {
            id: 2,
            name: 'Sneha Patel',
            email: 'sneha.patel@example.com',
            appliedFor: 'Backend Developer',
            location: 'Mumbai',
            experience: '3.5 years',
            resumeLink: 'https://example.com/resume/sneha-patel.pdf',
            appliedOn: 'Aug 3, 2025',
            status: "Pending" // default status
        },
        {
            id: 3,
            name: 'Amit Desai',
            email: 'amit.desai@example.com',
            appliedFor: 'UI/UX Designer',
            location: 'Nashik',
            experience: '1 year',
            resumeLink: 'https://example.com/resume/amit-desai.pdf',
            appliedOn: 'Aug 2, 2025',
            status: "Pending" // default status
        }
    ];


    const handleEditClick = (job) => {
        setJobToEdit(job);
        setShowEditModal(true);
    };

    const handleViewClick = (app) => {
        setApplicationToView(app);
        setShowViewModal(true);
    };

    const [applicant, setApplicant] = useState(applicants); // state

    const handleStatusChange = (id, newStatus) => {
        const updated = applicants.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        );
        setApplicant(updated);
    };

    return (
        <div className="company-dashboard">
            <h2>Company Dashboard</h2>

            <div className="section">
                <h3>Job Listings</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Posted On</th>
                            <th>Applicants</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job.id}>
                                <td>{job.title}</td>
                                <td>{job.location}</td>
                                <td>{job.date}</td>
                                <td>{job.applicants}</td>
                                <td><button onClick={() => handleEditClick(job)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h3>Recent Applications</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Applied For</th>
                            <th>Location</th>
                            <th>Experience</th>
                            <th>Applied On</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicant.map((application) => (
                            <tr key={application.id}>
                                <td>{application.name}</td>
                                <td>{application.email}</td>
                                <td>{application.appliedFor}</td>
                                <td>{application.location}</td>
                                <td>{application.experience}</td>
                                <td>{application.appliedOn}</td>
                                <td>{application.status}</td> {/* Dynamic status */}
                                <td>
                                    <button onClick={() => handleViewClick(application)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {showEditModal && <EditJobModal job={jobToEdit} onClose={() => setShowEditModal(false)} />}
            {showViewModal && (
                <ViewApplicationModal
                    application={applicationToView}
                    onClose={() => setShowViewModal(false)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default CompanyDashboard;
