import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="home-title">Home</h1>
        <hr />
        <h3 className="home-subtitle">About Us</h3>
        <p className="home-description">
        Welcome to Portofy!<br/><br/>

We are a passionate team dedicated to creating a seamless platform where users can showcase their personal and professional journeys. Whether you're highlighting your education, sharing your experiences, or showcasing your skills and certifications, our goal is to provide an interactive and user-friendly interface to tell your unique story.

Our project is built on the principles of accessibility, creativity, and innovation. Each feature has been carefully designed to ensure that users can easily navigate, personalize, and connect their profiles to reflect their aspirations and accomplishments.<br/><br/>

Through this platform, we aim to empower individuals by helping them craft a digital space that truly represents who they are. Whether you're a student, a professional, or someone looking to explore new opportunities, Portofy is here to make your profile shine.<br/><br/>

Thank you for trusting us to be part of your journey!
        </p>
        <hr /><br />
        <button 
          className="create-button" 
          type="button" 
          onClick={() => navigate("/form")}
        >
          Create your Portfolio!
        </button>
      </div>
    </div>
  );
}

export default HomePage; 