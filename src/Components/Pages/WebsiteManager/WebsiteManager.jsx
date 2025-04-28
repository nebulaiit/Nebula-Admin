import React from 'react'
import { createSearchParams, Link } from 'react-router-dom';
import "./WebsiteManager.css";
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import home from "../../../Images/Users/home.jpg";
import about from "../../../Images/Users/aboutus.jpg";
import courses from "../../../Images/Users/courses.jpg";
import freeTests from "../../../Images/Users/freetest.jpg";
import content from "../../../Images/Users/freecontent.jpg";
import testimonials from "../../../Images/Users/testimonials.jpg";
import contact from "../../../Images/Users/contactus.jpg";
import download from "../../../Images/Users/download.jpg";


export default function WebsiteManager() {
  const pages = [
    { title: 'Home', image: home },
    { title: 'About Us', image: about },
    { title: 'Courses', image: courses },
    { title: 'Free Tests', image: freeTests },
    { title: 'Free Content', image: content },
    { title: 'Testimonials', image: testimonials },
    { title: 'Contact Us', image: contact },
    { title: 'download', image: download },
  ];
  return (
    <>
    <div className='web-wrapper'>
    <div className="manager-header">
        <h1>Manage Your Website Pages</h1>
        <p>
          You can add, remove or edit content of all pages{' '}
          <a href="#">Learn how →</a>
        </p>
      </div>

      <div className="page-grid">
        {pages.map((page, index) => (
          <div key={index} className="page-card-wrapper">
            <div className="page-card">
              <img src={page.image} alt={page.title} />
              <div className="hover-overlay">
  <ul className="list list-inline">
    <li className="list-inline-item" >
      <Tooltip
        title="Add Content"
        placement="top"
        arrow
        slots={{ transition: Fade }}
        slotProps={{
          popper: { modifiers: [{ name: 'offset', options: { offset: [0, -4] } }] },
          transition: { timeout: 300 }
        }}
      >
        <Link to="#"><AddCircleOutlineIcon /></Link>
      </Tooltip>
    </li>

    <li className="list-inline-item" >
      <Tooltip
        title="Edit"
        placement="top"
        arrow
        slots={{ transition: Fade }}
        slotProps={{
          popper: { modifiers: [{ name: 'offset', options: { offset: [0, -4] } }] },
          transition: { timeout: 300 }
        }}
      >
        <Link to="#"><EditOutlinedIcon /></Link>
      </Tooltip>
    </li>

    <li className="list-inline-item">
      <Tooltip
        title="View"
        placement="top"
        arrow
        slots={{ transition: Fade }}
        slotProps={{
          popper: { modifiers: [{ name: 'offset', options: { offset: [0, -4] } }] },
          transition: { timeout: 300 }
        }}
      >
        <Link
          to={{
            pathname: "product/detail",
            search: `?${createSearchParams({ id: 1 })}`
          }}
        >
          <VisibilityOutlinedIcon />
        </Link>
      </Tooltip>
    </li>
  </ul>
</div>
            </div>
            <h6 className="page-title" style={{ textAlign: 'center' }}>{page.title}</h6>

          </div>
        ))}
      </div>

      <div className="button-row">
        <button className="preview-btn">Preview website</button>
        <button className="publish-btn">Publish changes</button>
      </div>
      </div>
      </>
  )
}