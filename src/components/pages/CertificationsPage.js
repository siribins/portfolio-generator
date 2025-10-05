import React, { useState, useEffect } from "react";

function CertificationsPage() {

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
    <div className="certifications-page">
      <h2 className="page-title">Certifications</h2>
      <div className="certifications-list">
        <div className="certification-item">
          <div className="cert-icon">🏆</div>
          <div className="cert-text">{user.certifications.cert1}</div>
        </div>
        <div className="certification-item">
          <div className="cert-icon">🏆</div>
          <div className="cert-text">{user.certifications.cert2}</div>
        </div>
        <div className="certification-item">
          <div className="cert-icon">🏆</div>
          <div className="cert-text">{user.certifications.cert3}</div>
        </div>
      </div>
    </div>
  );
}

export default CertificationsPage; 