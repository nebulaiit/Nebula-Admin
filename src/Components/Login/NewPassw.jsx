import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewPassword.css"; // Ensure this file is created for styling
import bg from "../../Images/login3.png"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import { confirmPassword } from "../../APIService/apiservice";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/toastSlice"; // ✅ import toast

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation(); 

  const username = location.state?.username || ""; // Retrieve username
  
  const navigate = useNavigate();
    const dispatch = useDispatch(); // ✅ dispatch hook

  const [values, setValues] = useState({
    userName: username || "",
    password: "",
  });


    // Update values.password only if passwords match
    useEffect(() => {
      if (newPassword && confirmPwd && newPassword === confirmPwd) {
        setValues((prev) => ({ ...prev, password: confirmPwd }));
        setError(""); // Clear error when passwords match
      }
    }, [newPassword, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPwd) {
      dispatch(showToast({ type: "error", message: "Passwords do not match!" }));
      
      return;
    }

    try {
      console.log("Submitting:", values);
      // const response = await confirmPassword(values);

      if (response?.code === 200) {
        dispatch(showToast({ type: "success", message: "Password reset successful!" }));
        setError("");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      } else {
        setError("Invalid request or email already exists!");
      }
    } catch (error) {
      dispatch(showToast({ 
        type: "error", 
        message: error.response?.data?.message || "Error resetting password." 
      }));
    }
  };

  return (
    <div className="password-container">
      <div className="password-box">
        {/* Left Section */}
        <div className="password-left">
          <h1 className="password-title">Nebula IT</h1>

          <div className="lock-icon">
            <div className="d-flex justify-content-center align-items-center">
              <div className="profile-icon d-flex justify-content-center align-items-center mb-4">
                <div
                  className="inner-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                  }}
                >
                  <PersonOutlineIcon className="logo" color="black" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="password-heading">Reset Password</h2>
          <div className="container mt-3">
            <hr
              style={{
                borderTop: "2px dashed gray",
                width: "100%",
              }}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <Button className="password-btn" type="submit">
              Reset Password
            </Button>
          </form>
        </div>

        {/* Right Section */}
        <div className="password-right">
          <div className="image-placeholder"></div>
          <img src={bg} alt="Illustration" className="resetpwd-image" />
        </div>
      </div>
    </div>
  );
}