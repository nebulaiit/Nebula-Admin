import React, { useState } from 'react';
import './CourseDetail.css'; 
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import courseImg from '../../../Images/Thumbnail/python.png'; // Adjust the path as needed

const CourseDetail = ({ onBack }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleClick = () =>{
    navigate('/add-course');
  }
  return (
    <div className="course-detail-container">
      <div className="left-section">
        <h2>Course Name</h2>
        <p className="course-title">Complete Python Programming: Zero To Hero</p>

        <h3>Description</h3>
        <p>
        Unlock the power of programming with our comprehensive Python Programming Fundamentals course! Whether you're a complete beginner or looking to refresh your coding skills, this course is designed to provide you with a strong foundation in Python programming. Python is one of the most versatile and widely used programming languages in the world, known for its simplicity and readability.</p>

        <h4>Course Highlights:</h4>
        <ul>
          <li>Duration: 2-3 months</li>
          <li>Level: Beginner to Intermediate</li>
          <li>Price: ₹16999/-</li>
          <li>Mode: Live instructor-led online classes</li>
          <li>Start Date: 1st of every month</li>
          <li>Class Schedule: 7–8 alternate days</li>
        </ul>
            <div className="input-button-wrapper d-flex justify-content-between me-4 mt-5 ">
            <button onClick={onBack}><BackIcon/>Previous</button>
            </div>
      </div>
    

      <div className="right-section">
        <img className="banner-img" src={courseImg} alt="Course" />
        <div className="likes"><i className="fa fa-thumbs-up"></i> 0 likes</div>
        <div className="sidebar-options">
          <div className="option">📁 Content</div>
          <div className="option">🎥 Live Classes</div>
          <div className="option">📢 Notice Board</div>
          <div className="option new">📦 Bundle <span>New</span></div>
       <div className="more-options-wrapper">
            <button className="more-options-btn" onClick={toggleDropdown}>More Options</button>
            {showDropdown && (
              <div className="dropdown">
                <ul>
                  <li onClick={handleClick}>✏️ Edit</li>
                  <li>🗑️ Delete</li>
                  <li>🚫 Unpublish</li>
                 
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default CourseDetail;
