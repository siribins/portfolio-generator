import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });
  const [error, setError] = useState('');

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log('Sign up successful!');
      navigate('/home');
    } catch (err) {
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'User already exists');
    }
    
  };

  return (
    <div className="sign-in-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="sign-in-container">
        <h2>Sign Up</h2>
        
        <form onSubmit={handleSignInSubmit}>
          <div className="form">
            <label htmlFor="email">Enter your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              required
            />
          </div>
          <div className="form">
            <label htmlFor="password">Set a Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
              required
              minLength="6"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            className="signin-box button" 
            type="button" 
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in.
          </button>
          <br/>
          <button className="signin-box button" type="submit">
            Sign Up
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default SignInPage;