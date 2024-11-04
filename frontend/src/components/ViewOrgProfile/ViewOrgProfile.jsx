import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewOrgProfile.module.css";
import defaultProfileImage from "./Profile-Image.png";
import { Link } from "react-router-dom";
const OrgProfileSection = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setOrgData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error || "No profile data available."}</div>;

  const { name, description, roles, logo } = orgData;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          {logo ? <img src={logo}/> : <img src={defaultProfileImage}/>}
        </div>
        <div className={styles.profileDetails}>
          <h2>{name}</h2>
          <div className={styles.profileInfo}>
            <div className={styles.profileField}>
              <label>Roles Offered:</label>
              <p>{roles}</p>
            </div>
            <div className={styles.profileField}>
              <label>Description:</label>
              <p>{description}</p>
            </div>
            <Link to="/updateOrgProfile">
              <button
                type="button"
                className="bg-green-500 text-white border-none py-2 px-3 rounded cursor-pointer text-xs mt-2 self-center hover:bg-gray-700"
              >
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgProfileSection;
