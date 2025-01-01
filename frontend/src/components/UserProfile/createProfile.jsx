import React, { useState } from "react";
import styles from "./createProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const degreeOptions = [
  { value: "bsc", label: "Bachelor of Science" },
  { value: "ba", label: "Bachelor of Arts" },
  { value: "msc", label: "Master of Science" },
  { value: "ma", label: "Master of Arts" },
  { value: "phd", label: "PhD" },
];

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


const institutionOptions = [
  { value: "harvard", label: "Harvard University" },
  { value: "stanford", label: "Stanford University" },
  { value: "cambridge", label: "University of Cambridge" },
  { value: "mit", label: "MIT" },
  { value: "oxford", label: "University of Oxford" },
];

const CreateProfileUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("")
  const [location, setLocation] = useState("");
  const [preferredCauses, setPreferredCauses] = useState("");
  const [availability, setAvailability] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [certificateURL, setCertificateURL] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [languages, setLanguages] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCertificateChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB.");
      return;
    }
    setCertificate(selectedFile);
  };

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      alert("Photo size should be less than 2MB.");
      return;
    }
    setPhoto(selectedFile);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

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
    setPhoneNo(value);

    const result = validatePhoneNumber(value, selectedCountry.code);
    // Validate email and update fieldErrors
    if (!result.valid) {
      setFieldErrors((prev) => ({
        ...prev,
        phoneNo: `${result.message}`,
      }));
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        phoneNo: "",
      }));
    }
  };
  
  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(country);
  };

  const validateStep1 = () => {
    const errors = {};
    if (!name) errors.name = "Name is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format.";
    }
    if (!phoneNo) {
      errors.phoneNo = "Phone Number is required.";
    } else {
      const phoneValidation = validatePhoneNumber(phoneNo, selectedCountry.code);
      if (!phoneValidation.valid) {
        errors.phoneNo = phoneValidation.message;
      }
    }
    if (!location) errors.location = "Location is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!preferredCauses) errors.preferredCauses = "Preferred Causes is required.";
    if (!availability) errors.availability = "Availability is required.";
    if (!about) errors.about = "About is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors = {};
    if (!skills) errors.skills = "Skills are required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep4 = () => {
    const errors = {};
    if (!languages) errors.languages = "Languages are required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if ((step === 1 && validateStep1()) || (step === 2 && validateStep2()) || (step === 3 && validateStep3()) || (step === 4 && validateStep4())) {
      if(step<4)
      setStep(step + 1);
      setFieldErrors({});
    }
  };
  const prevStep = () => setStep(step - 1);

  // Function to upload certificate
  const certificateUpload = async () => {
    if (!certificate || typeof certificate === "string") return certificateURL;

    const formData = new FormData();
    formData.append("file", certificate);
    try {
      const upload = await axios.post(
        "http://localhost:4000/api/v1/freelancer/upload_certificate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (upload.data && upload.data.certificateURL) {
        return upload.data.certificateURL;
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error during certificate upload:", e);
      return null;
    }
  };

  // Function to upload photo
  const imageUpload = async () => {
    if (!photo || typeof photo === "string") return photoURL;

    const formData = new FormData();
    formData.append("file", photo);
    try {
      const upload = await axios.post(
        "http://localhost:4000/api/v1/freelancer/upload_image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return upload.data.imageURL;
    } catch (e) {
      console.error("Error during photo upload:", e);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(!validateStep4()){
      setIsLoading(false);
      return
    }
    try {
      const uploadedPhotoURL = await imageUpload();
      const uploadedCertificateURL = await certificateUpload();

      setPhotoURL(uploadedPhotoURL);
      setCertificateURL(uploadedCertificateURL);

      const formattedPreferredCauses = preferredCauses ? preferredCauses.split(",").map((cause) => cause.trim()).join(", ") : "";
      const formattedSkills = skills ? skills.split(",").map((skill) => skill.trim()).join(", ") : "";
      const formattedLanguages = languages ? languages.split(",").map((language) => language.trim()).join(", ") : "";
      let updatedExperience = experience;
      if(experience.length>0){
        updatedExperience= experience.map((exp) => {
        return {
          ...exp,
          endDate: exp.endDate === 'Present' ? null : exp.endDate,
        };
      });
    }
    let updatedEducation = education;
    if(education.length>0){
      updatedEducation = education.map((edu) => ({
        ...edu,
        endDate: edu.endDate === "Present" ? null : edu.endDate,
      }));
    }

    let updatePhoneNo = `${selectedCountry.code} ${phoneNo}`;

      const formData = {
        name,
        email,
        phoneNo : updatePhoneNo,
        location,
        preferredCauses : formattedPreferredCauses, // Store the causes as a string
        availability,
        about,
        skills : formattedSkills, // Store skills as a string
        certificate: uploadedCertificateURL,
        photo: uploadedPhotoURL,
        experiences: updatedExperience,
        education: updatedEducation,
        socialLinks,
        languages:formattedLanguages,
      };

      const response = await axios.post(
        "http://localhost:4000/api/v1/freelancer/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if(response){
          alert("Profile created successfully!" || response.data.message);
          navigate('/viewProfile')
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const steps = 4; // Assuming 4 steps
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
        {step == 3 && <p className="mb-3">Step 3: Just a few more seconds...</p>}
        {step == 4 && <p className="mb-3">Step 4: Finalizing... You're almost done!</p>}

          <div style={{ width: `${progress}%`, height: '10px', backgroundColor: '#4caf50' }}></div>
        </div>

        <h1 className={styles["profile-title"]}>BUILD YOUR PROFILE</h1>
        <form onSubmit={handleSubmit} className={styles["profile-form"]}>
        {step === 1 && (
            <>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className={styles["brutalist-input"]}
            />
            {fieldErrors.name && <p className="mt-2 text-red-500">{fieldErrors.name}</p>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Email"
              className={styles["brutalist-input"]}
            />
            {fieldErrors.email && <p className="mt-2 text-red-500">{fieldErrors.email}</p>}
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
                id="phoneNo"
                value={phoneNo}
                onChange={handlePhoneChange}
                placeholder="Enter Phone Number"
                className={styles["brutalist-input"]}
              />
          {fieldErrors.phoneNo && (
            <p className="mt-2 text-red-500">{fieldErrors.phoneNo}</p>
          )}
        </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">Location</label>
            <input
              type="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
              className={styles["brutalist-input"]}
            />
            {fieldErrors.location && <p className="mt-2 text-red-500">{fieldErrors.location}</p>}
          </div>
          <button type="button" onClick={nextStep} className={styles["button"]}>Next</button>
            </>
        )}

          {step === 2 && (
            <>
              <div className={styles["form-group"]}>
            <label htmlFor="preferredCauses">Preferred Causes:</label>
            <textarea
              id="preferredCauses"
              value={preferredCauses}
              onChange={(e) => setPreferredCauses(e.target.value)}
              placeholder="e.g., Education, Environment"
              className={styles["brutalist-input"]}
            />
            {fieldErrors.preferredCauses && <p className="mt-2 text-red-500">{fieldErrors.preferredCauses}</p>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="availability">Availability:</label>
            <textarea
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="e.g., Weekends, Weekdays, Flexible"
              className={styles["brutalist-input"]}
            />
            {fieldErrors.availability && <p className="mt-2 text-red-500">{fieldErrors.availability}</p>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="about">About:</label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About yourself"
              className={styles["brutalist-input"]}
            />
            {fieldErrors.about && <p className="mt-2 text-red-500">{fieldErrors.about}</p>}
          </div>
              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className={styles["button"]}>Back</button>
                <button type="button" onClick={nextStep} className={styles["button"]}>Next</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles["form-group"]}>
                <label htmlFor="skills">Skills (comma-separated):</label>
                <textarea id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Enter Skills" className={styles["brutalist-input"]} />
                {fieldErrors.skills && <p className="mt-2 text-red-500">{fieldErrors.skills}</p>}
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="certificate">Upload Certificate (PDF):</label>
                <input 
                  type="file" 
                  id="certificate" 
                  accept=".pdf" 
                  onChange={handleCertificateChange} 
                  className={styles["brutalist-input"]} 
                />
                {certificateURL && (
                  <a href={certificateURL} target="_blank" rel="noopener noreferrer">View Certificate</a>
                )}
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="photo">Upload Photo:</label>
                <input 
                  type="file" 
                  id="photo" 
                  accept="image/*" 
                  onChange={handlePhotoChange} 
                  className={styles["brutalist-input"]} 
                />
                {photoURL && (
                  <a href={photoURL} target="_blank" rel="noopener noreferrer">View Photo</a>
                )}
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className={styles["button"]}>Back</button>
                <button type="button" onClick={nextStep} className={styles["button"]}>Next</button>
              </div>
            </>
          )}

{step === 4 && (
            <>
              <div>
      {/* Experience Section */}
      <div className={styles["form-group"]}>
        <label htmlFor="experience">Volunteer Experience:</label>
        {experience.map((exp, index) => (
            <div className="space-y-3 mt-3" key={index}>
              <input
                className={styles["brutalist-input"]}
                type="text"
                placeholder="Volunteer Role"
                value={exp.title}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].title = e.target.value;
                  setExperience(newExperience);
                }}
              />
              <input
                className={styles["brutalist-input"]}
                type="text"
                placeholder="Organization"
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].company = e.target.value;
                  setExperience(newExperience);
                }}
              />
              <input
                className={styles["brutalist-input"]}
                type="date"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].startDate = e.target.value;
                  setExperience(newExperience);
                }}
              />
              <div className="items-center space-x-2">
                <input
                  className={`${styles["brutalist-input"]} ${
                    exp.endDate === "Present" ? styles["disabled-input"] : ""
                  }`}
                  type="date"
                  placeholder="End Date"
                  disabled={exp.endDate === "Present"}
                  value={exp.endDate === "Present" ? "" : exp.endDate}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].endDate = e.target.value;
                    setExperience(newExperience);
                  }}
                />
                <div className="flex mt-4">
                  <input
                    type="checkbox"
                    checked={exp.endDate === "Present"}
                    onChange={() => {
                      const newExperience = [...experience];
                      newExperience[index].endDate = newExperience[index].endDate === "Present" ? "" : "Present";
                      setExperience(newExperience);
                    }}
                  />
                  <p className="ml-2">Present</p>
                </div>
              </div>

              <textarea
                className={styles["brutalist-input"]}
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const newExperience = [...experience];
                  newExperience[index].description = e.target.value;
                  setExperience(newExperience);
                }}
              />
              <button
                className={styles["remove-button"]}
                type="button"
                onClick={() => {
                  const newExperience = [...experience];
                  newExperience.splice(index, 1);
                  setExperience(newExperience);
                }}
              >
                Remove Experience
              </button>
            </div>
          ))}
          <button
            className={styles["add-button"]}
            type="button"
            onClick={()=>setExperience([
              ...experience,
              { title: "", company: "", startDate: "", endDate: "", description: "" },
            ])}
          >
            {experience.length === 0 ? "Add Experience" : "Add More Experience"}
          </button>
      </div>

      {/* Education Section */}
      <div className={styles["form-group"]}>
        <label htmlFor="education">Education:</label>
        {education.map((edu, index) => (
            <div className="space-y-3 mt-3" key={index}>
              <Select
                className={styles["brutalist-input"]}
                options={institutionOptions}
                placeholder="Select Institution"
                value={institutionOptions.find((i) => i.label === edu.institution)}
                onChange={(selectedOption) => {
                  const newEducation = [...education];
                  newEducation[index].institution = selectedOption.label;
                  setEducation(newEducation);
                }}
              />
              <Select
                className={styles["brutalist-input"]}
                options={degreeOptions}
                placeholder="Select Degree"
                value={degreeOptions.find((d) => d.label === edu.degree)}
                onChange={(selectedOption) => {
                  const newEducation = [...education];
                  newEducation[index].degree = selectedOption.label;
                  setEducation(newEducation);
                }}
              />
              <input
                className={styles["brutalist-input"]}
                type="text"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].fieldOfStudy = e.target.value;
                  setEducation(newEducation);
                }}
              />
              <input
                className={styles["brutalist-input"]}
                type="date"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].startDate = e.target.value;
                  setEducation(newEducation);
                }}
              />
              <div className="items-center space-x-2">
                <input
                  className={`${styles["brutalist-input"]} ${
                    edu.endDate === "Present" ? styles["disabled-input"] : ""
                  }`}
                  type="date"
                  placeholder="End Date"
                  disabled={edu.endDate === "Present"}
                  value={edu.endDate === "Present" ? "" : edu.endDate}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].endDate = e.target.value;
                    setEducation(newEducation);
                  }}
                  style={{
                    backgroundColor: edu.endDate === "Present" ? "#f0f0f0" : "white",
                    color: edu.endDate === "Present" ? "#999" : "black",
                  }}
                />
                <div className="flex mt-4">
                  <input
                    type="checkbox"
                    checked={edu.endDate === "Present"}
                    onChange={() => {
                      const newEducation = [...education];
                      newEducation[index].endDate = newEducation[index].endDate === "Present" ? "" : "Present";
                      setEducation(newEducation);
                    }}
                  />
                  <p className="ml-2">Present</p>
                </div>
              </div>
              <button
                className={styles["remove-button"]}
                type="button"
                onClick={() => {
                  const newEducation = [...education];
                  newEducation.splice(index, 1);
                  setEducation(newEducation);
                }}
              >
                Remove Education
              </button>
            </div>
          ))}
          <button
            className={styles["add-button"]}
            type="button"
            onClick={()=>setEducation([
              ...education,
              { institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" },
            ])
          }
          >
            {education.length === 0 ? "Add Education" : "Add More Education"}
          </button>
      </div>
    </div>
              
              <div className={styles["form-group"]}>
                <label htmlFor="socialLinks">Social Links:</label>
                {socialLinks.map((link, index) => (
                  <div className="space-y-3 mt-3" key={index}>
                    {/* Social Media Platform Input */}
                    <input
                      className={styles["brutalist-input"]}
                      type="text"
                      placeholder="Platform (e.g., Twitter, LinkedIn)"
                      value={link.platform}
                      onChange={(e) => {
                        const updatedLinks = [...socialLinks];
                        updatedLinks[index].platform = e.target.value;
                        setSocialLinks(updatedLinks);
                      }}
                    />
                    
                    {/* Social Media URL/Input */}
                    <input
                      className={styles["brutalist-input"]}
                      type="text"
                      placeholder="URL (https://linkedin.com/in/username)"
                      value={link.value}
                      onChange={(e) => {
                        const updatedLinks = [...socialLinks];
                        updatedLinks[index].value = e.target.value;
                        setSocialLinks(updatedLinks);
                      }}
                    />
                    
                    {/* Remove Button */}
                    <button
                      className={styles["remove-button"]}
                      type="button"
                      onClick={() => {
                        const updatedLinks = [...socialLinks];
                        updatedLinks.splice(index, 1);
                        setSocialLinks(updatedLinks);
                      }}
                    >
                      Remove Contact
                    </button>
                  </div>
                ))}
                
                {/* Add Contact Button */}
                <button
                  className={styles["add-button"]}
                  type="button"
                  onClick={() =>
                    setSocialLinks([
                      ...socialLinks,
                      { platform: "", value: "" }, // Default structure for new contact
                    ])
                  }
                >
                  {socialLinks.length === 0 ? "Add Contact" : "Add More Contact"}
                </button>
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="languages">Languages (comma-separated):</label>
                <textarea id="languages" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="e.g., English, Hindi" className={styles["brutalist-input"]} />
                {fieldErrors.languages && <p className="mt-2 text-red-500">{fieldErrors.languages}</p>}
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={prevStep} className={styles["button"]}>Back</button>
                {!isLoading ? <button onClick={nextStep} type="submit" className={styles["button"]}>Create Profile</button> : <button type="submit" className={styles["button"]}>Creating...</button>}
              </div>
            </>
          )}
        </form>
      </section>
      <section className={styles["profile-image-container"]}>
        <h1
          style={{ fontFamily: "monospace" }}
          className="font-bold h-auto text-2xl self-center text-black py-10"
        >
          "Little things make big days"
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

export default CreateProfileUser;
