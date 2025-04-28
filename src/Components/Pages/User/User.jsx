import React, { useEffect, useState } from 'react';
import './User.css';
import userImg from '../../../Images/Users/user.png';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { getUserDetials } from '../../APIService/apiservice';

export default function User() {
  const tabs = ['Overview', 'Settings', 'Change Password', 'Activity Log'];
  const [activeTab, setActiveTab] = useState('Overview');

  const [userData, setUserData] = useState({
    firstName:"",
    lastName:"",
    role: 'Admin',
    location: 'SF, Bay Area',
    email: 'shubhammusale111@gmail.com',
  });

  const [formData, setFormData] = useState({ ...userData });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Activity log as objects with message, timestamp, details
  const [activityLog, setActivityLog] = useState([
    {
      message: 'User logged in',
      timestamp: '2025-04-26 10:00 AM',
      details: 'Logged in from IP 192.168.0.1'
    },
    {
      message: 'Profile updated',
      timestamp: '2025-04-26 11:00 AM',
      details: 'Updated email address to shubhammusale111@gmail.com'
    },
    {
      message: 'Email verified',
      timestamp: '2025-04-26 12:00 PM',
      details: 'Confirmed email verification via link'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  // Handlers for form tabs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData({ ...formData });
    setActivityLog(prev => [
      { message: 'Profile updated', timestamp: new Date().toLocaleString(), details: 'User updated profile information' },
      ...prev
    ]);
    setActiveTab('Overview');
  };

  // Handlers for password tab
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // simulate password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActivityLog(prev => [
      { message: 'Password changed', timestamp: new Date().toLocaleString(), details: 'User successfully changed password' },
      ...prev
    ]);
    alert('Password changed successfully');
    setActiveTab('Overview');
  };

  // Handlers for activity log
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearActivityLog = () => {
    setActivityLog([]);
    setSelectedLog(null);
  };

  const toggleDetails = (log) => {
    setSelectedLog(selectedLog === log ? null : log);
  };

  // Filtered logs based on search term
  const filteredLogs = activityLog.filter(log =>
    log.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userId = localStorage.getItem("userId");


  useEffect(()=>{
  
    const fetchEmployeeDetails = async () =>{

        try{
            const respone = await getUserDetials(userId);
           
            console.log(respone)
            setUserData(respone)
            

        }
        catch (error) {
            console.log(error)
        }

    };
    fetchEmployeeDetails();

},[userId])

  return (
    <div className='user-wrapper'>

      {/* Tabs */}
      <div className="setting-list">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn mx-2 mt-2 ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="content-container mt-4">
        {/* Overview */}
        {activeTab === 'Overview' && (
          <div className="user-details p-4">
            <div className="details-box1 d-flex justify-content-between align-items-center">
              <h5>{userData.firstName} {userData.lastName} </h5>
              <img src={userImg} alt="User" className='user-image' />
            </div>
            <div className="details-box2 text-secondary mt-3">
              <AccountCircleOutlinedIcon /><span className='ms-2'>{userData.role}</span>
              <LocationOnOutlinedIcon className='ms-3' /><span className='ms-2'>{userData.location}</span>
              <EmailOutlinedIcon className='ms-3' /><span className='ms-2'>{userData.email}</span>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'Settings' && (
          <div className="settings-form p-4">
            <div className="mb-3">
              <label className='form-label'>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className='form-label'>Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className='form-label'>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className='form-label'>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}

        {/* Change Password */}
        {activeTab === 'Change Password' && (
          <div className="settings-form p-4">
            <div className="mb-3">
              <label className='form-label'>Current Password</label>
              <input
                type="password"
                className="form-control"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-3">
              <label className='form-label'>New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-3">
              <label className='form-label'>Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="btn btn-success mt-2" onClick={handlePasswordSubmit}>
              Change Password
            </button>
          </div>
        )}

        {/* Activity Log */}
        {activeTab === 'Activity Log' && (
          <div className="p-4">
            <h5>Recent Activities</h5>

            {/* Clear + Search */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-danger" onClick={clearActivityLog}>
                Clear All Activities
              </button>
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* List */}
            <ul className="list-group mt-3">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, idx) => (
                  <li key={idx} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <strong>{log.message}</strong>
                      <small className="text-muted">{log.timestamp}</small>
                    </div>
                    <button
                      className="btn btn-link btn-sm p-0"
                      onClick={() => toggleDetails(log)}
                    >
                      {selectedLog === log ? 'Hide Details' : 'Show Details'}
                    </button>
                    {selectedLog === log && (
                      <p className="mt-2">{log.details}</p>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No activities found.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
 