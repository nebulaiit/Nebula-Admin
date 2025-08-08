import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../Images/Logo/neblogow.png';
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import user from '../../Images/Users/user.png';
import HeadsetOutlinedIcon from '@mui/icons-material/HeadsetOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { getUserDetials } from '../APIService/apiservice';

export default function Header({ variant = "default" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideElement = ["/", "/register", "/reset-password", "/verify", "/NewPassword"].includes(location.pathname);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    role: 'Admin',
    location: 'SF, Bay Area',
    email: 'shubhammusale111@gmail.com',
  });

  const handleClickAway = () => {
    setMenuOpen(false);
    setSidebarOpen(false);
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await getUserDetials(userId);
        setEmployee(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeDetails();
  }, [userId]);

  useEffect(() => {
    setSidebarOpen(false); // close sidebar on route change
  }, [location.pathname]);

  return (
    <>
      {variant === "default" && !hideElement && (
        <>
          {/* Toggle Button for Mobile */}
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>

          <div className="container header">
            <div className="search-box">
              <input type="text" placeholder="Search for Employee..." />
              <span><SearchIcon className="search-icon" /></span>
            </div>

            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="profile-dropdown">
                <button className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
                  <img src={user} alt="User" className="profile-img mt-1" />
                  <div className="profile-info">
                    <p className="mb-0 text-light">{employee.firstName} {employee.lastName}</p>
                  </div>
                </button>

                {menuOpen && (
                  <div className="dropdown-menu show">
                    <div className="user-info">
                      <img src={user} className="user-img" alt="profile pic" />
                      <div>
                        <h6 className="mb-0">{employee.firstName} {employee.lastName}</h6>
                        <p className="email mb-0">{employee.email}</p>
                      </div>
                    </div>

                    <Link className="dropdown-item">
                      <AccountCircleOutlinedIcon className="me-2" /> My Account
                    </Link>
                    <button className="dropdown-item">
                      <SettingsOutlinedIcon className="me-2" /> Settings
                    </button>
                    <button className="dropdown-item">
                      <HeadsetOutlinedIcon className="me-2" /> Support
                    </button>
                    <button
                      className="dropdown-item text-light"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                    >
                      <ExitToAppOutlinedIcon className="me-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>

          {/* Sidebar */}
          <ClickAwayListener onClickAway={() => setSidebarOpen(false)}>
            <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
              <div className={`container sidebar ${sidebarOpen ? 'active' : ''}`}>
                <img src={logo} alt="logo" />
                <h1 className="text-uppercase ">Nebula</h1>

                <div className='main-item1'>
                  <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-2">Main</h3>
                  <div className="p-2 cursor-pointer rounded-3">
                    <div className="d-flex align-items-center mb-3 ">
                      <HomeIcon className="fs-5 me-3" />
                      <Link to='/dashboard' className="main-title">Dashboard</Link>
                    </div>
                    <div className="d-flex align-items-center ">
                      <BrowserUpdatedIcon className="fs-5 me-3" />
                      <Link to='/website-analytics' className="main-title">Website Analytics</Link>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                      <BrowserUpdatedIcon className="fs-5 me-3" />
                      <Link to='/website-pages' className="main-title">Website Pages</Link>
                    </div>
                  </div>
                </div>

                <div className='main-item1 mt-4'>
                  <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-2">Content</h3>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <AddCircleOutlineOutlinedIcon className="fs-5 me-3" />
                    <Link to='/add-content' className="main-title">Add Content</Link>
                  </div>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <DriveFileRenameOutlineOutlinedIcon className="fs-5 me-3" />
                    <Link to='/edit-content' className="main-title">Edit Content</Link>
                  </div>
                </div>

                <div className='main-item1 mt-4'>
                  <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-2">Course</h3>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <AddCircleOutlineOutlinedIcon className="fs-5 me-3" />
                    <Link to='/Course-list' className="main-title">Add Course</Link>
                  </div>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <DriveFileRenameOutlineOutlinedIcon className="fs-5 me-3" />
                    <Link to='/edit-Course' className="main-title">Edit Course</Link>
                  </div>
                </div>

                
                <div className='main-item1 mt-4'>
                  <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-2">Jobs</h3>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <PersonOutlineOutlinedIcon className="fs-5 me-3" />
                    <Link to='/job-dashboard' className="main-title">Job Dashboard</Link>
                  </div>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <PersonAddAltOutlinedIcon className="fs-5 me-3" />
                    <Link to='/user-list' className="main-title">All User</Link>
                  </div>
                </div>

                <div className='main-item1 mt-4'>
                  <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-2">Users</h3>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <PersonOutlineOutlinedIcon className="fs-5 me-3" />
                    <Link to='/user-account' className="main-title">User</Link>
                  </div>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <PersonAddAltOutlinedIcon className="fs-5 me-3" />
                    <Link to='/user-list' className="main-title">All User</Link>
                  </div>
                </div>

                <div className='main-item1 mt-4'>
                  <h3 className="text-secondary text-uppercase fs-6 fw-bold mt-2">Authentication</h3>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <SettingsOutlinedIcon className="fs-5 me-3" />
                    <Link to='/setting' className="main-title">Setting</Link>
                  </div>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <LoginOutlinedIcon className="fs-5 me-3" />
                    <Link to='/' className="main-title">Login</Link>
                  </div>
                  <div className="d-flex align-items-center p-2 cursor-pointer rounded-3">
                    <VpnKeyOutlinedIcon className="fs-5 me-3" />
                    <Link to='/rest-password' className="main-title">Rest Password</Link>
                  </div>
                </div>
              </div>
            </div>
          </ClickAwayListener>
        </>
      )}
    </>
  );
}