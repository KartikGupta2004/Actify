import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewOrgProfileByUser.module.css";
import defaultProfileImage from "./Profile-Image.png";
import { FiMail, FiMapPin, FiPhone, FiLinkedin, FiGlobe, FiTwitter, FiFacebook } from "react-icons/fi";
import { useParams,useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ViewProfileByUser = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchOrgData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/org/view_profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setOrgData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, []);

  
  if (error) return <div>{error || "No profile data available."}</div>;
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

  const handleGoBack  = ()=>{
    navigate(-1);
  }
  return (
    <>
    <div className="flex fixed top-28 left-0 z-50 p-4">
    <button onClick={handleGoBack }
      className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
      type="button"
    >
      <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="25px"
          width="25px"
        >
          <path
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            fill="#000000"
          />
          <path
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            fill="#000000"
          />
        </svg>
      </div>
      <p className="translate-x-2">Go Back</p>
    </button>
    </div>
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
            </div>
          </div>
        </div>
    </>
  );
};

export default ViewProfileByUser;
