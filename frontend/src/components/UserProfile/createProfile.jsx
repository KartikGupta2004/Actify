import React, { useState } from "react";
import styles from "./createProfile.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateProfile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [resumeURL, setResumeURL] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // Function to handle resume file change
  const handleResumeChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB.");
      return;
    }
    setResume(selectedFile);
  };

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      alert("Photo size should be less than 2MB.");
      return;
    }
    setPhoto(selectedFile);
  };

  // Function to upload resume
  // Function to upload resume
  const resumeUpload = async () => {
    if (!resume) return null; // Ensure a file is selected

    const formData = new FormData();
    formData.append("file", resume);
    try {
      const upload = await axios.post(
        "http://localhost:4000/api/v1/freelancer/upload_resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Resume upload response:", upload);

      if (upload.data && upload.data.resumeURL) {
        console.log("Uploaded Resume URL:", upload.data.resumeURL);
        return upload.data.resumeURL;
      } else {
        console.error("Resume URL not found in response:", upload.data);
        return null;
      }
    } catch (e) {
      console.error("Error during resume upload:", e);
      return null;
    }
  };

  // Function to upload photo
  const imageUpload = async () => {
    if (!photo) return null;

    const formData = new FormData();
    formData.append("file", photo);
    try {
      const upload = await axios.post(
        "http://localhost:4000/api/v1/freelancer/upload_image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo upload response:", upload);
      return upload.data.imageURL;
    } catch (e) {
      console.error("Error during photo upload:", e);
      return null;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedPhotoURL = await imageUpload();
      const uploadedResumeURL = await resumeUpload();

      // if (!uploadedPhotoURL || !uploadedResumeURL) {
      //   alert('Failed to upload files. Please try again.');
      //   console.error('Upload failure details:', { uploadedPhotoURL, uploadedResumeURL });
      //   return;
      // }

      console.log("Uploaded Photo URL:", uploadedPhotoURL);
      console.log("Uploaded Resume URL:", uploadedResumeURL);

      setPhotoURL(uploadedPhotoURL);
      setResumeURL(uploadedResumeURL);

      const formData = {
        name: userName,
        email: email,
        about: about,
        skills: skills,
        resume: uploadedResumeURL,
        photo: uploadedPhotoURL,
      };

      console.log("Form Data being sent:", formData);

      const response = await axios.post(
        "http://localhost:4000/api/v1/freelancer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message || "Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile, please try again.");
    }
  };

  return (
    <main
      className={styles["profile-container"]}
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <section
        className={`${styles["profile-form-container"]} ${styles["card"]}`}
      >
        <h1 className={styles["profile-title"]}>BUILD YOUR PROFILE</h1>
        <form onSubmit={handleSubmit} className={styles["profile-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Name"
              className={styles["brutalist-input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className={styles["brutalist-input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="about">About:</label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About yourself"
              className={styles["brutalist-input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="skills">Skills:</label>
            <textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Enter Skills"
              className={styles["brutalist-input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="resume">Upload Resume (PDF):</label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleResumeChange}
              className={styles["brutalist-input"]}
            />
            {resumeURL && (
              <a href={resumeURL} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles["brutalist-input"]}
            />
            {photoURL && (
              <img
                src={photoURL}
                alt="Profile"
                className={styles["profile-photo"]}
              />
            )}
          </div>

          <div className='flex justify-between'>
            <button type="submit" className={styles['button']}>Create Profile</button>
          </div>
        </form>
      </section>
      <section className={styles["profile-image-container"]}>
        <h1
          style={{ fontFamily: "monospace" }}
          className="font-bold h-auto text-2xl self-center text-black py-10"
        >
          "Little things make big days"
        </h1>
        <img
          className={styles["object-fill"]}
          src="/3714960.jpg"
          alt="Decorative"
        />
      </section>
    </main>
  );
};

export default CreateProfile;
