import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CourseBasicInfo from './CourseBasicInfo/CourseBasicInfo';
import EditPriceForm from './EditPrice/EditPriceForm';
import CourseContent from './CourseContent/CourseContent';
import Publish from './Publish/Publish';

export default function CourseFormContainer() {

    const [activeStep, setActiveStep] = useState(1); // 1 = Basic Info, 2 = Edit Price, 3 = Add Content
    const courseData = useSelector(state => state.course);

  return (
    <>

    <div className="AddCourse-wrapper">
        <div className="course-info-card ">
            <h3>Create Course</h3>
            <p>Add & View content of your course</p>
        </div>

        <div className="course-content">
            <div className='d-flex pt-4 px-3 border-bottom border-secondary'>
                <div className=" progress-info">
                <div className='d-flex'>
                    <div className='steps'> 1</div>
                    <div className="progress" role="progressbar" aria-label="Example 5px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
                    <div className="progress-bar"style={{ width: activeStep > 1 ? '100%' : '0%' }} ></div>
                    </div>
                </div>
                <div className='mt-1 text-light'> Basic Information </div>
                </div>
                <div className=" progress-info">
                <div className='d-flex'>
                    <div className='steps'>2</div>
                    <div className="progress" role="progressbar" aria-label="Example 5px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
                    <div className="progress-bar" style={{ width: activeStep > 2 ? '100%' : '0%' }} ></div>
                    </div>
                </div>
                <div className='mt-1 text-light'>Edit Price</div>
                </div>
                <div className=" progress-info">
                <div className='d-flex'>
                    <div className='steps'> 3</div>
                    <div className="progress" role="progressbar" aria-label="Example 5px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
                    <div className="progress-bar"style={{ width: activeStep > 3 ? '100%' : '0%' }} ></div>
                    </div>
                </div>
                <div className='mt-1 text-light'>Add Content</div>
                </div>
                <div className=" progress-info w-25">
                <div className='d-flex '>
                    <div className='steps'> 4</div>
                    
                </div>
                <p className='mt-1 text-light'> Publish </p>
                </div>
            </div>
            <div className="course-form-container">
                {activeStep === 1 && <CourseBasicInfo onNext={() => setActiveStep(2)} />}
                {activeStep === 2 && (<EditPriceForm onBack={() => setActiveStep(1)} onNext={() => setActiveStep(3)} />)}
                {activeStep === 3 && (<CourseContent onBack={() => setActiveStep(2)} onNext={() => setActiveStep(4)} />)}
                  {activeStep === 4 && (<Publish onBack={() => setActiveStep(3)} onNext={() => setActiveStep(4)} />)}
            </div>
        </div>
    </div>

    </>
    
  )
}
