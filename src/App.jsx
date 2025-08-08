import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import Dashboard from './Components/Pages/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import User from './Components/Pages/User/User'
// import Content from './Components/Pages/NewContent/Content'
import AdminPanel from './Components/Pages/NewTutorial/AdminPanel'
import NewCourse from './Components/Pages/NewCourse/NewCourse'
import CourseFormContainer from './Components/Pages/NewCourse/CourseFormContainer'
import UserList from './Components/Pages/User/UserList/UserList'
import WebAnalytics from './Components/Pages/WebAnalytics/WebAnalytics'
import ResetPassword from './Components/Login/ResetPassword'
import NewPassword from './Components/Login/NewPassw'
import WebsiteManager from './Components/Pages/WebsiteManager/WebsiteManager'
import EditContent from './Components/Pages/Edit Content/EditContent'
import CourseCard from './Components/Pages/EditCourse/EditCourse'
import CourseDetail from './Components/Pages/EditCourse/CourseDetail'
import EditCourse from './Components/Pages/EditCourse/EditCourse'
import CompanyDashboard from './Components/Pages/JobDashboard/CompanyDashboard.'




function App() {


  return (
    <>
      <BrowserRouter>
        <Header variant="default" />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/user-account' element={<User />} />
          <Route path='/add-tutorial' element={<AdminPanel/>}/> 
          <Route path='/edit-content' element={<EditContent />} />
          <Route path='/Course-list' element={<NewCourse />} />
          <Route path='/add-Course' element={<CourseFormContainer />} />
          <Route path='/user-list' element={<UserList />} />
          <Route path='/website-analytics' element={<WebAnalytics />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/NewPassword' element={<NewPassword />} />
          <Route path='/website-pages' element={<WebsiteManager />} />
          <Route path="/edit-course" element={<EditCourse />} />
          <Route path="/job-dashboard" element={<CompanyDashboard />} />
          <Route path="/course/:id" element={<CourseDetail />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
