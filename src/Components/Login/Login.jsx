import React, { useState } from "react";   
import loginImg from "../../Images/login2.png";
import './Login.css'
import { useDispatch } from "react-redux";
import { showToast } from ".././redux/toastSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginUser } from "../APIService/apiservice";

export default function Login() {
  const dispatch = useDispatch();

    const [values, setValues] = useState({
      userName: '',
      password: '',
         
        });
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  // 🚨 Case 1: If username or password is missing
  if (!values.userName || !values.password) {
    dispatch(showToast({ message: "Please enter ID and password ⚠️", type: "warning" }));
    return;
  }

  try {
    const response = await loginUser(values);
    console.log(response);

    if (response?.token && response?.role) {
      // Save in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.userId);

      // 🚀 Success toast
      dispatch(showToast({ message: "Login successful 🎉", type: "success" }));

      navigate("/dashboard");
    } else {
      // ❌ Wrong credentials
      dispatch(showToast({ message: response.message || "Wrong ID or Password ❌", type: "error" }));
      setError(response.message || "Invalid credentials");
    }
  } catch (error) {
    // ❌ Backend/network error
    dispatch(showToast({ message: "Login failed. Please try again. ❌", type: "error" }));
    setError(error.response?.data?.message || "Login failed. Please try again.");
  }
};



       const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <div className="left-section-login">
          <h1 className="title">Nebula IT</h1>
          <h2 className="subtitle">Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="username" name="userName" value={values.userName} onChange={handleChange} required/>
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="password" name="password" value={values.password}  onChange={handleChange} required />
            </div>

            <div className="remember-forgot">
                {/* <div className="remember-me">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className="mt-2">Remember Me</label>
                </div> */}
                <Link to="/reset-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <Button type="submit" className="login-btn">Log In</Button>
            </form>
  
        </div>
        <div className="right-section-login">
          <img src={loginImg} alt="Illustration" className="login-image" />
        </div>
      </div>
    </div>
    </>
    
  )
}