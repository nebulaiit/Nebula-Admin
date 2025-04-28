import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import bg from "../../Images/login.png";
import "./ResetPassword.css"; // Ensure this file is created for styling
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Button } from '@mui/material';


export default function ResetPassword() {

    
const [username, setUsername] = useState("");

console.log(username)

const navigate = useNavigate();


const handleReset = () => {
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  navigate("/NewPassword", { state: { username } });
};
  return (
    <>
     <div className="reset-container">
      <div className="reset-box">
        {/* Left Section */}
        <div className="reset-left">
          <h1 className="reset-title mb-3">Nebula IT</h1>
          <div className="d-flex justify-content-center align-items-center"> 
            <div
            className="profile-icon d-flex justify-content-center align-items-center mb-4" >
            <div
                className="inner-circle d-flex justify-content-center align-items-center"
                style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: "white",
                }}
            >
                <LockOpenOutlinedIcon className="logo" color="black" />
            </div>
            </div>
          </div>

          <h2 className="reset-heading mb-4">Reset Password</h2>
          <p className="reset-subtext">  Enter your email address to reset your password</p>
          <div className="container mt-3">
          <hr
            style={{
              borderTop: "2px dashed gray",
              width: "100%",
            }}
          />
        </div>

          <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="username"  value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>

          <Button className="reset-btn" onClick={handleReset}>Reset Password</Button>
          <p className="access-text">
            Don’t have access anymore? <Link to="/try-another">Try another method</Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="reset-right">
          <div className="image-placeholder">
          <img src={bg} alt="Illustration" className="reset-image" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}