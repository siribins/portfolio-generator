const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  about: { 
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true
  },
  image: { 
    type: String,
    required: true
  },
  experience: {
    role1: { type: String, required: true },
    companyName1: { type: String, required: true },
    projectDetails1: { type: String, required: true },
    role2: String,
    companyName2: String,
    projectDetails2: String,
    role3: String,
    companyName3: String,
    projectDetails3: String
  },
  education: {
    instituteName1: { type: String, required: true },
    timeline1: { type: String, required: true },
    instituteName2: String,
    timeline2: String,
    instituteName3: String,
    timeline3: String
  },
  projects: {
    project1: String,
    project2: String,
    project3: String
  },
  skills: {
    skill1: String,
    skill2: String,
    skill3: String,
    skill4: String,
    skill5: String,
    skill6: String
  },
  certifications: {
    cert1: String,
    cert2: String,
    cert3: String
  },
  interests: {
    interest1: String,
    interest2: String,
    interest3: String
  },
  links: {
    link1: String,
    link2: String,
    link3: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);