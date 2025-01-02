import React, { useState, useEffect } from "react";
import styles from "./UpdateOrgProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Japan", code: "+81" },
  { name: "China", code: "+86" },
  { name: "Brazil", code: "+55" },
  { name: "Russia", code: "+7" },
  { name: "Spain", code: "+34" },
  { name: "Italy", code: "+39" },
  { name: "South Africa", code: "+27" },
  { name: "Indonesia", code: "+62" },
  { name: "Philippines", code: "+63" },
  { name: "New Zealand", code: "+64" },
  { name: "Egypt", code: "+20" },
  { name: "Netherlands", code: "+31" },
  { name: "Sweden", code: "+46" },
  { name: "South Korea", code: "+82" },
  { name: "Singapore", code: "+65" },
  { name: "Portugal", code: "+351" },
  { name: "Turkey", code: "+90" },
  { name: "Iran", code: "+98" },
];

const countryCodeLengths = {
  "+91": 10, // India
  "+1": 10, // USA/Canada
  "+44": 10, // United Kingdom
  "+61": 9,  // Australia
  "+81": 10, // Japan
  "+86": 11, // China
  "+33": 9,  // France
  "+49": 10, // Germany
  "+39": 10, // Italy
  "+34": 9,  // Spain
  "+7": 10,  // Russia
  "+55": 11, // Brazil
  "+27": 9,  // South Africa
  "+62": 10, // Indonesia
  "+63": 10, // Philippines
  "+64": 9,  // New Zealand
  "+20": 10, // Egypt
  "+31": 9,  // Netherlands
  "+46": 9,  // Sweden
  "+82": 10, // South Korea
  "+65": 8,  // Singapore
  "+351": 9, // Portugal
  "+90": 10, // Turkey
  "+98": 10, // Iran
};

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
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const response = await axios.get(
          "https://actify-backend-rubx.onrender.com/api/v1/org/view_profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const { name, description, roles, location, contactInfo, socialLinks, logo } = response.data.data;
        contactInfo.phone = contactInfo.phone.replace(/^\+\d+\s/, '');
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setContactInfo({ ...contactInfo, email: value })

    // Validate email and update fieldErrors
    if (!validateEmail(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const validatePhoneNumber = (phoneNumber, countryCode) => {
  
    // Check if phone number contains only numeric characters
    const numericPattern = /^\d+$/;
    if (!numericPattern.test(phoneNumber)) {
      return { valid: false, message: "Phone number must contain only numbers." };
    }
  
    // Check if phone number length matches the country code requirements
    const expectedLength = countryCodeLengths[countryCode];
    if (phoneNumber.length !== expectedLength) {
      return {
        valid: false,
        message: `Phone number must be ${expectedLength} digits long for ${countryCode}.`,
      };
    }

    return {valid : true};
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setContactInfo({ ...contactInfo, phone: value })

    const result = validatePhoneNumber(value, selectedCountry.code);
    // Validate email and update fieldErrors
    if (!result.valid) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: `${result.message}`,
      }));
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(country);
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (!userName) newErrors.userName = "Organization name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!roles) newErrors.roles = "Roles are required.";
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!location) newErrors.location = "Location is required.";
      if (!contactInfo.phone) {
        newErrors.phone = "Phone Number is required.";
      } else {
        const phoneValidation = validatePhoneNumber(contactInfo.phone, selectedCountry.code);
        if (!phoneValidation.valid) {
          newErrors.phone = phoneValidation.message;
        }
      }
      if (!contactInfo.email) {
        newErrors.email = "Email is required.";
      } else if (!validateEmail(contactInfo.email)) {
        newErrors.email = "Invalid email format.";
      }
    return Object.keys(newErrors).length === 0;
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
        'https://actify-backend-rubx.onrender.com/api/v1/org/upload_logo',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const uploadedLogoURL = await logoUpload();
      console.log("Uploaded Logo URL:", uploadedLogoURL);
      setLogoURL(uploadedLogoURL);
      contactInfo.phone = `${selectedCountry.code} ${contactInfo.phone}`;
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
        'https://actify-backend-rubx.onrender.com/api/v1/org/update_id_org',
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
      navigate("/viewProfile")
      // console.log(response.data);
    } catch (error) {
      // console.error('Error updating profile:', error);
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
                <label htmlFor="country">Country:</label>
                <select
                  className={styles["brutalist-input"]}
                  value={selectedCountry.name}
                  onChange={handleCountryChange}
                >
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="phoneNo">Phone Number:</label>
                  <input
                      type="text"
                      id="contactInfo.phone"
                      value={contactInfo.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter Phone Number"
                      className={styles["brutalist-input"]}
                    />
                {fieldErrors.phone && <p className="text-red-500">{fieldErrors.phone}</p>}
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="contactInfo.email"
                  value={contactInfo.email}
                  onChange={handleEmailChange}
                  placeholder="Enter Email"
                  className={styles["brutalist-input"]}
                />
                {fieldErrors.email && <p className="text-red-500">{fieldErrors.email}</p>}
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
