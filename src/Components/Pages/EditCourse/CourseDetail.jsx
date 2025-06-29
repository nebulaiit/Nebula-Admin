import React, { useEffect, useState } from 'react';
import './CourseDetail.css';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import courseImg from '../../../Images/Thumbnail/python.png'; // Adjust the path as needed
import { getCourseDetailsById } from '../../APIService/apiservice';

const CourseDetail = ({ onBack }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [courseDetails, setCourseDetails] = useState();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleClick = () => {
    navigate('/add-course');
  }
  const {id} = useParams(); // Assuming you're using react-router-dom v6 or later

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseDetailsById(id);
        setCourseDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseDetails();
  }, [id]);
 return (
  <div className="course-detail-container">
    {courseDetails ? (
      <>
        <div className="left-section">
          <h2>Course Name</h2>
          <p className="course-title">{courseDetails.courseTitle}</p>

          <h3>Description</h3>
          <p>{courseDetails.courseDescription}</p>

          <h4>Course Highlights:</h4>
          <ul>
            <li>Duration: {courseDetails.duration}</li>
            <li>Level: Beginner to Intermediate</li>
            <li>Price: {courseDetails.coursePrice.price} ₹</li>
            <li>Discount: {courseDetails.coursePrice.discount} ₹</li>
            <li>Effective Price: {courseDetails.coursePrice.effectivePrice} ₹</li>
            <li>Mode: Live instructor-led online classes</li>
            {/* <li>Start Date: 1st of every month</li>
            <li>Class Schedule: 7–8 alternate days</li> */}
          </ul>
          <div className="input-button-wrapper d-flex justify-content-between me-4 mt-5">
            <button onClick={onBack}><BackIcon />Previous</button>
          </div>
        </div>

        <div className="right-section">
          <img className="banner-img" src={courseImg} alt="Course" />
          <div className="sidebar-options">
            <div className="option" onClick={handleClick}>✏️ Edit</div>
            <div className="option">🗑️ Delete</div>
            <div className="option">🚫 Unpublish</div>
          </div>
        </div>
      </>
    ) : (
      <p>Loading course details...</p>
    )}
  </div>
);

};

export default CourseDetail;
