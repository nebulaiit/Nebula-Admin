import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getUserDetials } from '../../APIService/apiservice';
import { Link } from 'react-router-dom';

export default function Dashboard() {


    const courses = [
        { title: 'Total Courses', value: '21' },
        { title: 'Total Tutorial    ', value: '36' },
        { title: 'New Users', value: '56' },
        { title: 'Active Users', value: '23' },
    ];


    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        role: 'Admin',
        location: 'SF, Bay Area',
        email: 'shubhammusale111@gmail.com',
    });

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const respone = await getUserDetials(userId);
                setEmployee(respone)
            }
            catch (error) {
                console.log(error)
            }

        };
        fetchEmployeeDetails();

    }, [userId])

    return (
        <>
            <div className='dashboard-wrapper mt-2'>

                <div className="welcome-card ">
                    <h3>Hi, {employee.firstName} {employee.lastName}</h3>
                    <p>Welcome to Dashboard</p>
                </div>

                <div className="website-card">
                    <div className="logo-wrapper">
                        <OpenInBrowserIcon className=' website-icon' />
                    </div>
                    <div className="text-wrapper">
                        <h5>Visit Website</h5>
                        <div className='d-flex justify-content-between'>
                            <Link to='https://qubitronx.com/' target='_blank'>Visit</Link>
                            <p><ContentCopyIcon className='copy-icon' />Copy</p>
                        </div>
                    </div>
                    <ArrowForwardIosIcon className='arrow-icon' />
                </div>

                <div className="card-wrapper mt-5">
                    {courses.map((course, index) => (

                        <div className='card-menu' key={index}>
                            <h5>{course.title}</h5>
                            <p>{course.value}</p>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}
