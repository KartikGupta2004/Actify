import React, { useState, useEffect } from "react";
import styles from "./UpdateOrgProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateProfileOrg = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    website: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    linkedin: "",
    facebook: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/org/view_profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const { name, description, roles, location, contactInfo, socialLinks, logo } = response.data.data;
        setUserName(name);
        setDescription(description);
        setRoles(roles);
        setLogoURL(logo);
        setLocation(location);
        setContactInfo(contactInfo);
        setSocialLinks(socialLinks);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      }
    };

    fetchOrgData();
  }, []);

  // Validation functions
  const validateStep1 = () => {
    const errors = {};
    if (!userName) errors.userName = "Organization name is required.";
    if (!description) errors.description = "Description is required.";
    if (!roles) errors.roles = "Roles are required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!location) errors.location = "Location is required.";
    if (!contactInfo.phone) errors.phone = "Phone number is required.";
    if (!contactInfo.email) errors.email = "Email is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle the change for logo file input

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const logoUpload = async () => {
    if (!logo || typeof logo === "string") return logoURL;

    const formData = new FormData();
    formData.append("file", logo);
    try {
      const upload = await axios.post(
        'http://localhost:4000/api/v1/org/upload_logo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

  const resetForm = () => {
    setUserName("");
    setLocation("");
    setDescription("");
    setRoles("");
    setLogo("");
    setLogoURL("");
    setContactInfo({ phone: "",email : "", website: "" });
    setSocialLinks({ twitter: "",linkedin : "", facebook: "" });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const uploadedLogoURL = await logoUpload();
      console.log("Uploaded Logo URL:", uploadedLogoURL);
      setLogoURL(uploadedLogoURL);
      const formData ={
        name: userName,
        description: description,
        roles: roles,
        logo: uploadedLogoURL,
        location: location,
        contactInfo: contactInfo,
        socialLinks: socialLinks,
      }
      const response = await axios.put(
        'http://localhost:4000/api/v1/org/update_id_org',
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert('Profile updated successfully!');
      setLoading(false);
      resetForm();
      navigate("/viewProfile")
      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if ((step === 1 && validateStep1()) || (step === 2 && validateStep2())) {
      setStep(step + 1);
      setFieldErrors({});
    }
  };
  const prevStep = () => setStep(step - 1);
  
  const steps = 3;
  const progress = (step / steps) * 100;
  
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
        <div className="mb-3">
        {step == 1 && <p className="mb-3">Step 1: Almost there! Hang tight...</p>}
        {step == 2 && <p className="mb-3">Step 2: Almost done! A little more...</p>}
        {step == 3 && <p className="mb-3">Step 3: Finalizing... You're almost done!</p>}

          <div style={{ width: `${progress}%`, height: '10px', backgroundColor: '#4caf50' }}></div>
        </div>

        <h1 className={styles["profile-title"]}>BUILD YOUR PROFILE</h1>
        
        <form onSubmit={handleSubmit} className={styles["profile-form"]}>
          {errorMessage && (
            <p className="text-red-500 my-2 text-bold">{errorMessage}</p>
          )}
          {/* Step 1: Organization Information */}
          {step === 1 && (
            <div>
              <div className={styles["form-group"]}>
                <label htmlFor="userName">Organization Name:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Name"
                  className={styles["brutalist-input"]}
                />
                {fieldErrors.userName && <p className="mt-2 text-red-500">{fieldErrors.userName}</p>}
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
                {fieldErrors.description && <p className="mt-2 text-red-500">{fieldErrors.description}</p>}
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="roles">Roles Offered(comma-separated):</label>
                <textarea
                  id="roles"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  placeholder="For eg. Community Outreach, Event Coordinators"
                  className={styles["brutalist-input"]}
                />
                {fieldErrors.roles && <p className="mt-2 text-red-500">{fieldErrors.roles}</p>}
              </div>
              <button type="button" onClick={nextStep} className={styles["button"]}>Next</button>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div>
              <div className={styles["form-group"]}>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="For eg. Mumbai, India"
                  className={styles["brutalist-input"]}
                />
                {fieldErrors.location && <p className="mt-2 text-red-500">{fieldErrors.location}</p>}
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="contactInfo.phone">Phone:</label>
                <input
                  type="tel"
                  id="contactInfo.phone"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  placeholder="Enter Verified Phone Number"
                  className={styles["brutalist-input"]}
                />
                {fieldErrors.phone && <p className="mt-2 text-red-500">{fieldErrors.phone}</p>}
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="contactInfo.email">Email:</label>
                <input
                  type="email"
                  id="contactInfo.email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="For eg. k@gmail.com"
                  className={styles["brutalist-input"]}
                />
                {fieldErrors.email && <p className="mt-2 text-red-500">{fieldErrors.email}</p>}
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="contactInfo.website">Website:</label>
                <input
                  type="url"
                  id="contactInfo.website"
                  value={contactInfo.website}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, website: e.target.value })
                  }
                  placeholder="Enter Website URL"
                  className={styles["brutalist-input"]}
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className={styles["button"]}>Back</button>
                <button type="button" onClick={nextStep} className={styles["button"]}>Next</button>
              </div>
            </div>
          )}

          {/* Step 3: Social Links and Logo */}
          {step === 3 && (
            <div>
              <div className={styles["form-group"]}>
                <label htmlFor="socialLinks.twitter">Twitter Link:</label>
                <input
                  type="url"
                  id="socialLinks.twitter"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, twitter: e.target.value })
                  }
                  placeholder="Enter Twitter URL"
                  className={styles["brutalist-input"]}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="socialLinks.linkedin">LinkedIn Link:</label>
                <input
                  type="url"
                  id="socialLinks.linkedin"
                  value={socialLinks.linkedin}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                  }
                  placeholder="Enter LinkedIn URL"
                  className={styles["brutalist-input"]}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="socialLinks.facebook">Facebook Link:</label>
                <input
                  type="url"
                  id="socialLinks.facebook"
                  value={socialLinks.facebook}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, facebook: e.target.value })
                  }
                  placeholder="Enter Facebook URL"
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
                {logoURL && (
                  <img
                    src={logoURL}
                    alt="Logo Preview"
                    className={styles["profile-photo"]}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className={styles["button"]}>Back</button>
                {!loading ? <button type="submit" className={styles["button"]}>Update Profile</button> : <button type="submit" className={styles["button"]}>Updating...</button>}
              </div>
            </div>
          )}
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

export default UpdateProfileOrg;
