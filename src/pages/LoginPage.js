import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before login attempt
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log(response.data.message); // Successful login message

      localStorage.setItem("userEmail", formData.Email); // Store email for future use
      console.log(formData.Email);
    
      //window.location.href = "/dashboard";

      navigate("/about"); // Navigate to the About page after successful login
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Error message from the server
      } else {
        setErrorMessage("An error occurred. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div className="sign-in-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="sign-in-container">
        <h2>Log In</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="form">
            <label htmlFor="email">Enter your Registered Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="form-input"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              required
            />
          </div>
          <div className="form">
            <label htmlFor="password">Enter your Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              className="form-input"
              value={formData.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <br />
          <br />
          <button className="signin-box button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
