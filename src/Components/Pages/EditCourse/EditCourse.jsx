import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditCourse.css'; // Style as needed
import courseImg from '../../../Images/Thumbnail/python.png'
import Currency from '@mui/icons-material/CurrencyRupeeOutlined';
import { getAllCourse } from '../../APIService/apiservice';

const EditCourse = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const fetchCourseList = async () => {
        try {
          const response = await getAllCourse();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCourseList();
    }, []);

  const handleClick = () => {
    navigate('/course/python-zero-to-hero');
  };

  return (
    <div className="course-edit-wrapper">
      <div className="course-edit" onClick={handleClick}>
        <div className="course-img-wrapper">
          <img src={courseImg} alt="courseImg" />
        </div>
        <div className="course-info-edit">
          <h5 className='edit-title'>Complete Python Programming: Zero To Hero</h5>
          <p className='edit-creation'>Created By : Shubham Musale</p>
          <h5 className='edit-price-card'><Currency />6799</h5>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
