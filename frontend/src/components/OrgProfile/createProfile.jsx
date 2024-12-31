import React, { useState } from "react";
import styles from "./OrgProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateProfileOrg = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [errors, setErrors] = useState({});

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
        "http://localhost:4000/api/v1/org/upload_logo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo upload response:", upload);
      return upload.data.logoURL;
    } catch (e) {
      console.error("Error during photo upload:", e);
      return null;
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

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!userName) newErrors.userName = "Organization name is required.";
      if (!description) newErrors.description = "Description is required.";
      if (!roles) newErrors.roles = "Roles offered are required.";
    } else if (step === 2) {
      if (!location) newErrors.location = "Location is required.";
      if (!contactInfo.phone) newErrors.phone = "Phone number is required.";
      if (!contactInfo.email) newErrors.email = "Email is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message before each submit

    try {
      const uploadedLogoURL = await logoUpload();
      console.log("Uploaded Logo URL:", uploadedLogoURL);
      setLogoURL(uploadedLogoURL);

      const formData = {
        name: userName,
        description: description,
        roles: roles,
        logo: uploadedLogoURL, // Use the uploaded logo URL
        location: location,
        contactInfo: contactInfo, // Include contact information
        socialLinks: socialLinks, // Include social media links
      };

      const response = await axios.post(
        "http://localhost:4000/api/v1/org/create_org",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Profile created successfully!");
      setIsLoading(false);
      resetForm();
      navigate("/viewProfile")
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display specific error message from the backend
        setErrorMessage(
          error.response.data.message || "Failed to create profile."
        );
      } else {
        setErrorMessage(
          "An unexpected error occurred while creating the profile."
        );
      }
      console.error("Error creating profile:", error);
    }
  };
  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
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
                {errors.userName && <p className="text-red-500">{errors.userName}</p>}
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
                {errors.description && <p className="text-red-500">{errors.description}</p>}
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
                {errors.roles && <p className="text-red-500">{errors.roles}</p>}
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
                {errors.location && <p className="text-red-500">{errors.location}</p>}
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
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
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
                {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                {!isLoading ? <button type="submit" className={styles["button"]}>Create Profile</button> : <button type="submit" className={styles["button"]}>Creating...</button>}
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

export default CreateProfileOrg;
