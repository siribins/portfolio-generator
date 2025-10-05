import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    about: '',
    email: '',
    image: null,
    experience: {
      role1: '',
      companyName1: '',
      projectDetails1: '',
      role2: '',
      companyName2: '',
      projectDetails2: '',
      role3: '',
      companyName3: '',
      projectDetails3: ''
    },
    education: {
      instituteName1: '',
      timeline1: '',
      instituteName2: '',
      timeline2: '',
      instituteName3: '',
      timeline3: '',
      description: ''
    },
    projects: {
      project1: '',
      project2: '',
      project3: ''
    },
    skills: {
      skill1: '',
      skill2: '',
      skill3: '',
      skill4: '',
      skill5: '',
      skill6: ''
    },
    certifications: {
      cert1: '',
      cert2: '',
      cert3: ''
    },
    interests: {
      interest1: '',
      interest2: '',
      interest3: ''
    },
    links: {
      link1: '',
      link2: '',
      link3: ''
    },
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    // Split the id to get the section and field name
    const [section, field] = id.split('.');
    
    if (section === 'education' || 
        section === 'projects' || 
        section === 'experience' || 
        section === 'skills' || 
        section === 'certifications' || 
        section === 'interests' || 
        section === 'links') {
      setFormData((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.about || !formData.email || !image || 
        !formData.education.instituteName1 || !formData.education.timeline1 ||
        !formData.experience.role1 || !formData.experience.companyName1 || 
        !formData.experience.projectDetails1) {
      alert("Please fill in all required fields: About, Email, Image, Education (first entry), and Experience (first entry)");
      return;
    }

    const data = new FormData();
    
    Object.keys(formData).forEach((key) => {
      if (key !== 'image') {
        if (typeof formData[key] === 'object') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    if (image) {
      data.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/users/save", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data saved successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="form-page">
      <div className="form-content">
        <h1 className="form-title">Create Your Portfolio</h1>
        <hr />

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="form-section-title">About</h2>
            <textarea
              id="about"
              rows={4}
              placeholder="Write a brief introduction about yourself"
              className="form-input textarea"
              value={formData.about}
              onChange={handleInputChange}
              required
            />
            
            <div className="image-upload-section">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Image</h3>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input file-input"
                required
              />
              {image && (
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Profile preview" 
                    style={{ maxWidth: '200px', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Contact Information</h2>
            <div className="form-field">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Email</h3>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Experience</h2>
            
            <div className="experience-group">
              <h3 className="experience-group-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Experience 1</h3>
              
              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Role</h3>
                <input
                  id="experience.role1"
                  type="text"
                  placeholder="Enter your role/position"
                  className="form-input"
                  value={formData.experience.role1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Company Name</h3>
                <input
                  id="experience.companyName1"
                  type="text"
                  placeholder="Enter your Company name ( eg: XYZ Corporation - June 2022 - Aug 2022 )"
                  className="form-input"
                  value={formData.experience.companyName1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Role Details</h3>
                <textarea
                  id="experience.projectDetails1"
                  rows={3}
                  placeholder="Describe your project details and responsibilities"
                  className="form-input textarea"
                  value={formData.experience.projectDetails1}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="experience-group">
              <h3 className="experience-group-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Experience 2</h3>
              
              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Role</h3>
                <input
                  id="experience.role2"
                  type="text"
                  placeholder="Enter your role/position"
                  className="form-input"
                  value={formData.experience.role2}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Company Name</h3>
                <input
                  id="experience.companyName2"
                  type="text"
                  placeholder="Enter your Company name ( eg: XYZ Corporation - June 2022 - Aug 2022 )"
                  className="form-input"
                  value={formData.experience.companyName2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Role Details</h3>
                <textarea
                  id="experience.projectDetails2"
                  rows={3}
                  placeholder="Describe your project details and responsibilities"
                  className="form-input textarea"
                  value={formData.experience.projectDetails2}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="experience-group">
              <h3 className="experience-group-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Experience 3</h3>
              
              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Role</h3>
                <input
                  id="experience.role3"
                  type="text"
                  placeholder="Enter your role/position"
                  className="form-input"
                  value={formData.experience.role3}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Company Name</h3>
                <input
                  id="experience.companyName3"
                  type="text"
                  placeholder="Enter your Company name ( eg: XYZ Corporation - June 2022 - Aug 2022 )"
                  className="form-input"
                  value={formData.experience.companyName3}
                  onChange={handleInputChange}
                />
              </div>

              <div className="experience-field">
                <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Role Details</h3>
                <textarea
                  id="experience.projectDetails3"
                  rows={3}
                  placeholder="Describe your project details and responsibilities"
                  className="form-input textarea"
                  value={formData.experience.projectDetails3}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Enter your Education details: </h2>
            
            <div className="education-field-row">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Institute Name 1</h3>
              <input
                id="education.instituteName1"
                type="text"
                placeholder="Institute Name"
                className="form-input"
                value={formData.education.instituteName1}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="education-field-row">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Timeline 1</h3>
              <input
                id="education.timeline1"
                type="text"
                placeholder="Timeline (e.g., 2019-2023)"
                className="form-input"
                value={formData.education.timeline1}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="education-field-row">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Institute Name 2</h3>
              <input
                id="education.instituteName2"
                type="text"
                placeholder="Institute Name"
                className="form-input"
                value={formData.education.instituteName2}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="education-field-row">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Timeline 2</h3>
              <input
                id="education.timeline2"
                type="text"
                placeholder="Timeline (e.g., 2019-2023)"
                className="form-input"
                value={formData.education.timeline2}
                onChange={handleInputChange}
              />
            </div>

            <div className="education-field-row">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Institute Name 3</h3>
              <input
                id="education.instituteName3"
                type="text"
                placeholder="Institute Name"
                className="form-input"
                value={formData.education.instituteName3}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="education-field-row">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Timeline 3</h3>
              <input
                id="education.timeline3"
                type="text"
                placeholder="Timeline (e.g., 2019-2023)"
                className="form-input"
                value={formData.education.timeline3}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Projects</h2>
            
            <div className="project-field">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Project 1</h3>
              <textarea
                id="projects.project1"
                rows={3}
                placeholder="Describe your first project"
                className="form-input textarea"
                value={formData.projects.project1}
                onChange={handleInputChange}
              />
            </div>

            <div className="project-field">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Project 2</h3>
              <textarea
                id="projects.project2"
                rows={3}
                placeholder="Describe your second project"
                className="form-input textarea"
                value={formData.projects.project2}
                onChange={handleInputChange}
              />
            </div>

            <div className="project-field">
              <h3 className="form-field-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>Project 3</h3>
              <textarea
                id="projects.project3"
                rows={3}
                placeholder="Describe your third project"
                className="form-input textarea"
                value={formData.projects.project3}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`skill${num}`} className="skill-field">
                  <input
                    id={`skills.skill${num}`}
                    type="text"
                    placeholder={`Skill ${num}`}
                    className="form-input"
                    value={formData.skills[`skill${num}`]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Certifications</h2>
            {[1, 2, 3].map((num) => (
              <div key={`cert${num}`} className="certification-field">
                <input
                  id={`certifications.cert${num}`}
                  type="text"
                  placeholder={`Certification ${num}`}
                  className="form-input"
                  value={formData.certifications[`cert${num}`]}
                  onChange={handleInputChange}
                />
                <br/><br/>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Interests</h2>
            {[1, 2, 3].map((num) => (
              <div key={`Interest${num}`} className="interest-field">
                <input
                  id={`interests.interest${num}`}
                  type="text"
                  placeholder={`Interest ${num}`}
                  className="form-input"
                  value={formData.interests[`Interest${num}`]}
                  onChange={handleInputChange}
                />
                <br/><br/>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Links</h2>
            {[1, 2, 3].map((num) => (
              <div key={`link${num}`} className="link-field">
                <input
                  id={`links.link${num}`}
                  type="text"
                  placeholder={`Link ${num}`}
                  className="form-input"
                  value={formData.links[`link${num}`]}
                  onChange={handleInputChange}
                />
                <br/><br/>
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button type="submit" className="form-submit-button">
              Save and Generate Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;