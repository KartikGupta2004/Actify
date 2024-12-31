import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewProfile.module.css";
import defaultProfile from "./Profile-Image.png";
import { FiMail, FiMapPin, FiUser, FiAward, FiCheckCircle, FiPhone, FiLinkedin, FiGlobe, FiFileText, FiTwitter } from "react-icons/fi";
import { useParams,useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ViewProfileByOrg = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true)
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/freelancer/view_profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log(response.data.data)
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (loading || !userData) return <div className="flex justify-center items-center mx-auto h-screen"><Loader /></div>;

  const {
    name,
    email,
    location,
    skills,
    about,
    photo,
    experiences = [], // Default empty array
    education = [], // Default empty array
    socialLinks = {}, // Default empty object
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
          <p>No experiences available.</p>
        )}
      </div>

      {/* Education Card */}
      <div className={styles.card}>
        <div className="flex mb-2">
        <FiUser className={styles.icon} />
        <h3 className="font-bold">Education</h3>
        </div>
        <ul>
          {education.map((edu, index) => (
            <li key={index}>
              <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p> {edu.institution} (
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)})
            </li>
          ))}
        </ul>
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
                {socialLinks.phoneNo && (
                  <div className={styles.infoRow}>
                    <FiPhone className={styles.icon} />
                    <p><strong>Phone Number:</strong> {socialLinks.phoneNo}</p>
                  </div>
                )}
              </div>
            </div>  
      
            <div className={styles.card}>
              <h3 className="font-bold mb-2">Social Links</h3>
              <div className={styles.infoColumn}>
                {socialLinks.twitter && (
                  <div className={styles.infoRow}>
                    <FiTwitter className={styles.icon} />
                    <p><strong>Twitter:</strong> {socialLinks.twitter}</p>
                  </div>
                )}
                {socialLinks.linkedin && (
                  <div className={styles.infoRow}>
                    <FiLinkedin className={styles.icon} />
                    <p><strong>LinkedIn:</strong> {socialLinks.linkedin}</p>
                  </div>
                )}
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
            </div>
    </div>
    </>
  );
};

export default ViewProfileByOrg;
