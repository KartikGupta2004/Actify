import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UpdateProfile.module.css";

const UpdateProfile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/freelancer/view_profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { name, email, about, skills, resume, photo } =
          response.data.data;

        setUserName(name);
        setEmail(email);
        setAbout(about);
        setSkills(skills);
        setResumeURL(resume);
        setPhotoURL(photo);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };

    fetchProfileData();
  }, []);

  const resumeUpload = async () => {
    if (!resume || typeof resume === "string") return resumeURL;
  
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
        console.error('Resume URL not found in response:', upload.data);
        return resumeURL;
      }
    } catch (e) {
      console.error("Error during resume upload:", e);
      return null;
    }
  };
    
    // Function to upload photo
    const imageUpload = async () => {
      if (!photo || typeof photo === "string") return photoURL;
  
      const formData = new FormData();
      formData.append("file", photo);
      try {
        const upload = await axios.post(
          "http://localhost:4000/api/v1/freelancer/upload_image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Photo upload response:', upload);
        return upload.data.imageURL || photoURL;
      } catch (e) {
        console.error('Error during photo upload:', e);
        return photoURL;
      }
    };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedPhotoURL = await imageUpload();
      const uploadedResumeURL = await resumeUpload();

      if (!uploadedPhotoURL || !uploadedResumeURL) {
        alert('Failed to upload files. Please try again.');
        console.error('Upload failure details:', { uploadedPhotoURL, uploadedResumeURL });
        setLoading(false);
        return;
      }

      console.log("Uploaded Photo URL:", uploadedPhotoURL);
      console.log("Uploaded Resume URL:", uploadedResumeURL);

      // setPhotoURL(uploadedPhotoURL);
      // setResumeURL(uploadedResumeURL);

      const formData = {
        name: userName,
        email: email,
        about: about,
        skills: skills,
        resume: uploadedResumeURL,
        photo: uploadedPhotoURL,
      };

      console.log("Form Data being sent:", formData);

      const response = await axios.put(
        "http://localhost:4000/api/v1/freelancer/update_profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message || 'Profile update successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile, please try again.");
    } finally {
      setLoading(false);
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
        <h1 className={styles["profile-title"]}>UPDATE YOUR PROFILE</h1>
        <form onSubmit={handleSubmit} className={styles["profile-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="userName">Name:</label>
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
                View current resume
              </a>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              name="profile-image"
              onChange={handlePhotoChange}
              className={styles["brutalist-input"]}
            />
            {/* {photoURL && (
              <img
                src={
                  typeof photo === "string" ? photo : URL.createObjectURL(photo)
                }
                alt="Profile"
                className={styles["profile-photo"]}
                style={{ maxWidth: "100px", borderRadius: "50%" }}
              />
            )} */}
            {photoURL && (
              <img
                src={photoURL}
                alt="Profile"
                className={styles["profile-photo"]}
                style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }}
              />
            )}
          </div>

          <button type="submit" className={styles['button']}disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}</button>
          {error && <p className="text-red-500 mt-3 font-semibold">{error}</p>}
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

export default UpdateProfile;
