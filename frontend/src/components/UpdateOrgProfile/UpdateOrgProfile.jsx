import React, { useState, useEffect } from "react";
import styles from "./UpdateOrgProfile.module.css";
import axios from "axios";
const OrgProfile = () => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/org/view_profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { name, description, roles, logo } = response.data.data;
        setUserName(name);
        setDescription(description);
        setRoles(roles);
        setLogoURL(logo);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, []);

  // Handle the change for logo file input

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const logoUpload = async () => {
    if (!logo || typeof logo === "string") return logoURL;
    // if (!logo) return logoURL;

    const formData = new FormData();
    formData.append("file", logo);
    try {
      const upload = await axios.post(
        'http://localhost:4000/api/v1/org/upload_logo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log('Logo upload response:', upload);
      return upload.data.logoURL || logoURL;
    } catch (e) {
      console.error('Error during logo upload:', e);
      return logoURL;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedLogoURL = await logoUpload();
      console.log("Uploaded Logo URL:", uploadedLogoURL);
      setLogoURL(uploadedLogoURL);
      const formData ={
        "name":userName,
        "description":description,
        "roles":roles,
        "logo":uploadedLogoURL,
      }
      const response = await axios.put(
        'http://localhost:4000/api/v1/org/update_id_org',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert('Profile updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
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
      <section className={`${styles['profile-form-container']} ${styles['card']}`}>
        <h1 className={styles['profile-title']}>UPDATE YOUR PROFILE</h1>
        <form onSubmit={handleSubmit} className={styles['profile-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="userName">Organization Name:</label>
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
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className={styles["brutalist-input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="roles">Roles Offered:</label>
            <textarea
              id="roles"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              placeholder="Enter Roles Offered"
              className={styles["brutalist-input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="logo">Upload Company Logo:</label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className={styles["brutalist-input"]}
            />
            {/* {logo && <img src={URL.createObjectURL(logo)} alt="Profile" className={styles['profile-photo']} />} */}
            {logo ? (
              <img src={URL.createObjectURL(logo)} alt="Profile" className={styles['profile-photo']} />
            ) : (
              logoURL && <img src={logoURL} alt="Current Logo" className={styles['profile-photo']} />
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
          "Empowering your mission with the right tools"
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

export default OrgProfile;
