import React from 'react'
import './AddCourse.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

export default function CourseBasicInfo({ onNext }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // You can add preview or upload logic here
    }
  }


  return (
    <>
          <div className="course-content-form1 mt-4">
            <form>
              <h5>Course Name</h5>
              <input type="text" placeholder='Enter the course name'/>
              
              <h5>Description</h5>
              <textarea name="" id=""  placeholder='Enter the course description here'></textarea>
              
              <div className="thumbnail-upload-container">
                <h5 className=" ms-0 mb-2">Add Thumbnail</h5>
                <label htmlFor="thumbnail-upload" className="thumbnail-upload-box">
                  <FileUploadIcon className="upload-icon" />
                  <span>Upload thumbnail Image</span>
                  <input
                    type="file"
                    id="thumbnail-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              
              <p className="ms-4 my-4"> <LightbulbIcon className='bulb-icon'/> Recommended Image Size: 800px x 600px, PNG or JPEG file</p>
            
              <div className="input-button-wrapper d-flex justify-content-between mx-3 ">
                <button><BackIcon/>Previous</button>
                <button type="button" onClick={onNext}>  Edit Price <EastIcon /></button>
              </div>
              
              </form>
          </div> 
    </>
  )
}
