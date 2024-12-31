import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewOrgProfile.module.css";
import defaultProfileImage from "./Profile-Image.png";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiMapPin, FiPhone, FiGlobe, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";
import Loader from "../Loader/Loader";

const ViewProfileOrg = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchOrgData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/org/view_profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

  if (error) return <div className={styles.error}>{error || "No profile data available."}</div>;

  if (loading || !orgData) return <div className="flex justify-center items-center mx-auto h-screen"><Loader /></div>;

  const { 
    name, 
    description, 
    roles, 
    logo, 
    location, 
    contactInfo = {}, 
    socialLinks = {} 
  } = orgData;

  return (
    <>
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          <img src={logo || defaultProfileImage} alt="Organization Logo" />
        </div>
        <div className={styles.profileDetails}>
          <h2 className={styles.orgName}>{name}</h2>
          <div className={styles.profileInfo}>
            {/* Roles Offered */}
            <div className={styles.profileField}>
              <label>Roles Offered:</label>
              <p>{roles || "No roles specified"}</p>
            </div>
            
            {/* Description */}
            <div className={styles.profileField}>
              <label>Description:</label>
              <p>{description || "No description available"}</p>
            </div>
            
            {/* Location */}
            <div className={styles.profileField}>
              <label>Location:</label>
              <div className={styles.infoRow}>
                <FiMapPin className={styles.icon} />
                <p>{location || "Not provided"}</p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className={styles.profileField}>
              <label>Contact Info:</label>
              <div className={styles.infoColumn}>
                {contactInfo.phone && (
                  <div className={styles.infoRow}>
                    <FiPhone className={styles.icon} />
                    <p>{contactInfo.phone}</p>
                  </div>
                )}
                {contactInfo.email && (
                  <div className={styles.infoRow}>
                    <FiMail className={styles.icon} />
                    <p>{contactInfo.email}</p>
                  </div>
                )}
                {contactInfo.website && (
                  <div className={styles.infoRow}>
                    <FiGlobe className={styles.icon} />
                    <a href={contactInfo.website} target="_blank" rel="noopener noreferrer">
                      {contactInfo.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {/* Social Links */}
            <div className={styles.profileField}>
              <label>Social Links:</label>
              <div className={styles.infoColumn}>
                {socialLinks.twitter && (
                  <div className={styles.infoRow}>
                    <FiTwitter className={styles.icon} />
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </div>
                )}
                {socialLinks.linkedin && (
                  <div className={styles.infoRow}>
                    <FiLinkedin className={styles.icon} />
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </div>
                )}
                {socialLinks.facebook && (
                  <div className={styles.infoRow}>
                    <FiFacebook className={styles.icon} />
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link to="/updateProfile" className={styles.updateButton}>
            Update Profile
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewProfileOrg;
