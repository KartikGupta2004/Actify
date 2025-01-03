import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css"; // Assuming you're using CSS Modules
import { Link } from "react-router-dom";
import defaultProfile from "./Profile-Image.png";
import { FiMail, FiMapPin, FiUser, FiAward, FiCheckCircle, FiPhone, FiLinkedin, FiGlobe, FiFileText, FiTwitter } from "react-icons/fi";
import Loader from "../Loader/Loader";
const ViewProfileUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://actify-backend-rubx.onrender.com/api/v1/freelancer/view_profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

  if (error) return <div>{error}</div>;

  if (loading || !userData) return <div className="flex justify-center items-center mx-auto h-screen"><Loader /></div>;

  const {
    name,
    email,
    phoneNo,
    location,
    skills,
    about,
    photo,
    experiences = [], // Default empty array
    education = [], // Default empty array
    socialLinks = [],
    rating,
    languages,
    certificate,
    availability,
    preferredCauses,
  } = userData;

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };  

  return (
    <>
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeaderCard}>
          <div className={styles.profileImage}>
            <img src={photo || defaultProfile} alt="Profile" />
          </div>
          <h2 className={styles.profileName}>{name}</h2>
        </div>

            {/* Basic Information */}
            <div className={styles.card}>
        <h3 className="font-bold mb-2">Basic Information</h3>
        <div className={styles.infoColumn}>
          <div className={styles.infoRow}>
            <FiMapPin className={styles.icon} />
            <p><strong>Location:</strong> {location}</p>
          </div>
          <div className={styles.infoRow}>
            <div className="mr-2">
            <FiUser className="w-6 h-6 text-green-600" />
            </div>
            <p><strong>About:</strong> {about}</p>
          </div>
          <div className={styles.infoRow}>
            <FiAward className="w-10 h-10 mr-1 text-green-600" />
            <p><strong>Skills:</strong> {skills.length > 0 ? skills : "None"}</p>
          </div>
        </div>
      </div>

      {/* Experiences Card */}
      <div className={styles.card}>
        <div className="flex mb-2">
        <FiCheckCircle className="w-5 h-5 mr-3 text-green-600" />
        <h3 className="font-bold">Experiences</h3>
        </div>
        {experiences.length > 0 ? (
          <ul>
            {experiences.map((experience) => (
              <li key={experience._id}>
                <h4 className="font-medium">{experience.title}</h4>
                <p>{experience.company}</p>
                <p>{experience.description}</p>
                <p className="mb-2 ">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No experiences are added</p>
        )}
      </div>

      {/* Education Card */}
      <div className={styles.card}>
        <div className="flex mb-2">
        <FiUser className={styles.icon} />
        <h3 className="font-bold">Education</h3>
        </div>
        {education.length > 0 ?
          (<ul>
            {education.map((edu, index) => (
              <li key={index}>
                <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p> {edu.institution} (
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)})
              </li>
            ))}
          </ul>) : (
            <p>No education are added</p>
          )}
      </div>

      {/* Contact Card (column-wise layout) */}
      <div className={styles.card}>
        <h3 className="font-bold mb-2">Contact</h3>
        <div className={styles.infoColumn}>
          {email && (
              <div className={styles.infoRow}>
                <FiMail className={styles.icon} />
                <p><strong>Email:</strong> {email}</p>
              </div>
            )}
          {phoneNo && (
            <div className={styles.infoRow}>
              <FiPhone className={styles.icon} />
              <p><strong>Phone Number:</strong> {phoneNo}</p>
            </div>
          )}
        </div>
      </div>  

            <div className={styles.card}>
                <h3 className="font-bold mb-2">Social Links</h3>
                <div className={styles.infoColumn}>
                  {socialLinks.length === 0 ? "Not Added": socialLinks.map((link, index) => {
                    if (link.url) {
                      return (
                        <div key={index} className={styles.infoRow}>
                          {link.platform === 'twitter' && <FiTwitter className={styles.icon} />}
                          {link.platform === 'linkedin' && <FiLinkedin className={styles.icon} />}
                          {link.platform === 'facebook' && <FiFacebook className={styles.icon} />}
                          {link.platform === 'instagram' && <FiInstagram className={styles.icon} />}
                          {link.platform === 'github' && <FiGithub className={styles.icon} />}
                          {link.platform === 'other' && <FiLink className={styles.icon} />} {/* Add default icon for 'other' */}
                          <p>
                            <strong>{link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}:</strong> 
                            <a className="ml-2" href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
    

            {/* Rating */}
            <div className={styles.card}>
              <label className="font-bold mb-2">Rating:</label>
              <p>{rating} / 5</p>
            </div>

            {/* Languages */}
            <div className={styles.card}>
              <div className="flex">
              <FiGlobe className={styles.icon} />
              <h3 className="font-bold mb-2">Languages</h3>
              </div>
              <p>{languages.length > 0 ? languages : "None"}</p>
            </div>

            {/* Preferred Causes */}
            <div className={styles.card}>
              <label className="font-bold mb-2">Preferred Causes:</label>
              <p>{preferredCauses.length > 0 ? preferredCauses : "None"}</p>
            </div>

            {/* Availability */}
            <div className={styles.card}>
              <label className="font-bold mb-2">Availability:</label>
              <p>{availability}</p>
            </div>

            {/* Resume Link */}
            <div className={styles.card}>
              <div className="flex">
              <FiFileText className={styles.icon} />
              <h3 className="font-bold mb-2">Certificate</h3>
              </div>
              {certificate ?
              <p><a href={certificate} target="_blank" rel="noopener noreferrer">View Certificate</a></p> : 
              <p>Not yet added</p>
              }
            </div>

            {/* Update Profile Button */}
            <Link to="/updateProfile" className={styles.updateButton}>
              <button type="button">
                Update Profile
              </button>
            </Link>
            </div>
    </div>
    </>
  );
};

export default ViewProfileUser;
