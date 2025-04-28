import React, { useState } from 'react'
import './NewCourse.css'
import { Button } from '@mui/material'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import ExpandMore from '@mui/icons-material/ExpandMoreOutlined';
import courseImg from '../../../Images/Thumbnail/python.png'
import Currency from '@mui/icons-material/CurrencyRupeeOutlined';
import { useNavigate } from 'react-router-dom';

export default function NewCourse() {
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/add-Course')
    }

  
  return (
    <>
        <div className="course-wrapper">
            <div className="course-info-card ">
                <h3>Your Courses</h3>
                <p>Add & View  Courses</p>
            </div>

            <div className="function-card">
                <div className="filter-card d-flex">
                    <div className="search-card">
                        <input type="text" placeholder="Search for Employee..." />
                        <span><SearchIcon className="search-icon1" /></span>
                    </div>
                    <div className="filter-box mx-4">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                           Sort By
                           <ExpandMore/>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Course Name</a></li>
                            <li><a className="dropdown-item" href="#">Price Low To High</a></li>
                            <li><a className="dropdown-item" href="#">Price High To Low</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <Button className='filter-button'><FilterIcon/>Filter</Button>
                </div>
                <div className="button-wrapper">
                    <Button> <StarBorderRoundedIcon className='me-1 star-icon'/> Featured</Button>
                    <Button className='add-course px-4' onClick={handleClick}> Add New Course</Button>
                </div>
            </div>

            <div className="course-card-wrapper">
                <div className="course-card">
                    <div className="course-img-wrapper">
                        <img src={courseImg} alt="courseImg" />
                    </div>
                    <div className="course-info-card">
                        <h5 className='course-title'>Complete Python Programming: Zero To Hero</h5>
                        <p className='course-creation'>Created By : Shubham Musale</p>
                        <h5 className='course-price'><Currency/>6799</h5>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
