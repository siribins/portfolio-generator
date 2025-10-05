import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Trash } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin"); 
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const email = localStorage.getItem("userEmail"); 
    if (!email) {
      alert("No email found. Please log in.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${email}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete account.");
        }

        alert("Account deleted successfully.");
        navigate("/signin"); 
      } catch (error) {
        alert("Error deleting account: " + error.message);
      }
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {[
          "about",
          "experience",
          "education",
          "skills",
          "certifications",
          "projects",
          "interests",
          "links",
        ].map((page) => (
          <NavLink
            key={page}
            to={`/${page}`}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </NavLink>
        ))}

        <div className="nav-button">
          <button className="nav-button logout" onClick={handleLogout}>
            <LogOut className="nav-button lo" size={20} />
          </button>
        &nbsp;&nbsp;
          <button className="nav-button delete" onClick={handleDeleteAccount}>
            <Trash className="nav-button lo" size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
