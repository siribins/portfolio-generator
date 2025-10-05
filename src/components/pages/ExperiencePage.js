import React, { useState, useEffect } from "react";

function ExperiencePage() {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail"); // Get email from localStorage
      if (!email) {
        setError("No email found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/users/${email}`); // Correct endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data); // Update user state with fetched data
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser(); // Call the fetch function
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message
  }

  return (
    <div className="experience-page">
      <h1 className="experience-title">Experience</h1>
      <div className="experience-container">
        <div className="experience-item">
          <div className="vertical-line"></div>
          <div className="experience-content">
            <h3 className="experience-header">{user.experience.role1}</h3>
            <p className="experience-company">
              {user.experience.companyName1}
            </p>
            <p className="experience-description">
              {user.experience.projectDetails1}
            </p>
          </div>
        </div>
        <div className="experience-item">
          <div className="vertical-line"></div>
          <div className="experience-content">
            <h3 className="experience-header">{user.experience.role2}</h3>
            <p className="experience-company">
              {user.experience.companyName2}
            </p>
            <p className="experience-description">
              {user.experience.projectDetails2}
            </p>
          </div>
        </div>
        <div className="experience-item">
          <div className="vertical-line"></div>
          <div className="experience-content">
            <h3 className="experience-header">{user.experience.role3}</h3>
            <p className="experience-company">
              {user.experience.companyName3}
            </p>
            <p className="experience-description">
              {user.experience.projectDetails3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperiencePage;
