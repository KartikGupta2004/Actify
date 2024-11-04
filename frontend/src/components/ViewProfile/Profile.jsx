import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css"; // Assuming you're using CSS Modules
import { Link } from "react-router-dom";
import defaultProfile from "./Profile-Image.png";
const ProfileSection = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/freelancer/view_profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { name, email, skills, about, photo } = userData;
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          {photo ? <img src={photo}/> : <img src={defaultProfile}/> }
        </div>
        <div className={styles.profileDetails}>
          <h2>{name}</h2>
          <div className={styles.profileInfo}>
            <div className={styles.profileField}>
              <label>Email:</label>
              <p>{email}</p>
            </div>
            <div className={styles.profileField}>
              <label>Skills:</label>
              <p>{skills.join(", ")}</p>
            </div>
            <div className={styles.profileField}>
              <label>About:</label>
              <p>{about}</p>
            </div>
            <Link to="/updateProfile">
              <button type="button" className='bg-green-500 text-white border-none py-2 px-3 rounded cursor-pointer text-xs mt-2 self-center hover:bg-gray-700'>Update Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
