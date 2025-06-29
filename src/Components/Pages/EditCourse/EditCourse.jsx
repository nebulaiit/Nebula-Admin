import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditCourse.css'; // Style as needed
import courseImg from '../../../Images/Thumbnail/python.png'
import Currency from '@mui/icons-material/CurrencyRupeeOutlined';
import { getAllCourse } from '../../APIService/apiservice';

const EditCourse = () => {
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchCourseList = async () => {
        try {
          const response = await getAllCourse();
          setCourseList(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCourseList();  
    }, []);

  const handleClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="course-edit-wrapper p-4">
    <h3>Edit Your Course</h3>

    {courseList.length === 0 && <p>No courses available to edit.</p>}
    
    {courseList.map((course) => (
      <div key={course.id} className="course-edit" onClick={()=>handleClick(course.id)}>
        <div className="course-img-wrapper">
          <img src={course.imageUrl || courseImg} alt="courseImg" />
        </div>
        <div className="course-info-edit">
          <h5 className='edit-title'>{course.courseTitle}</h5>
          <p className='edit-duration'>Duration : {course.duration} {course.durationUnit}</p>
          {/* <p className='edit-creation'>Created By : {course.instructor}</p> */}
          <div className='d-flex'>
            <h5 className='edit-price-card'><Currency />{course.price}</h5>
            <h5 className='edit-discount-card'><Currency />{course.discount}</h5>
          </div>
        </div>
      </div>
    ))}

      {/* <div className="course-edit" onClick={handleClick}>
        <div className="course-img-wrapper">
          <img src={courseImg} alt="courseImg" />
        </div>
        <div className="course-info-edit">
          <h5 className='edit-title'>Complete Python Programming: Zero To Hero</h5>
          <p className='edit-creation'>Created By : Shubham Musale</p>
          <h5 className='edit-price-card'><Currency />6799</h5>
        </div>
      </div> */}
    </div>
  );
};

export default EditCourse;
