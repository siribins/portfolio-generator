import React, { useState, useEffect } from "react";

function SkillsPage() {

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
    <div className="skills-page">
      <h2 className="page-title">Skills</h2>
      <div className="skills-container">
        <div className="skills-section">
          <h3>Technical Skills</h3>
          <ul>
            <li>{user.skills.skill1}</li>
            <li>{user.skills.skill3}</li>
            <li>{user.skills.skill5}</li>
          </ul>
        </div>
        <div className="skills-section">
          <h3>Non-Technical Skills</h3>
          <ul>
            <li>{user.skills.skill2}</li>
            <li>{user.skills.skill4}</li>
            <li>{user.skills.skill6}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SkillsPage; 