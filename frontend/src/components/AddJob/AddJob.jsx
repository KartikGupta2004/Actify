import React, { useState } from "react";
import "./AddJob.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const AddJob = () => {
  const authToken = localStorage.getItem("authToken");
  const profile = localStorage.getItem("Profile") === "true" || false;
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState({
    role: "",
    job_description: "",
    skills_required: "",
    experience_level: "",
    compensation: "",
    application_deadline: "",
    location_requirements: "",
    contact_information: "",
    project_duration: "",
    company_description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    if(name == 'company_description'){
      return;
    }
    if (!value.trim()) {
      error = `${name.replace(/_/g, " ")} is required.`;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true)
  
    data.skills_required = data.skills_required.split(",");
    // console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/jobs/create_job",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(response.data);
      alert("Job Created!")
      navigate("/jobList");
    } catch (e) {
      alert("Error occurred when trying to create job listing!");
      // console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  if(!profile){
    return(
      <div className='flex flex-col justify-center items-center my-5'>
        <p className="text-red-500 font-bold">Create Profile to post jobs</p>
        <button onClick={()=>{navigate('/createProfile')}} className="bg-green-700 text-white border-none px-3 py-2 cursor-pointer text-sm mt-4 hover:bg-[#555]">Create Profile</button>
      </div>
    )
  }
  return (
    <>
    <div className={`add-job-container ${loading ? "loading-active" : ""}`}>
    {loading && (
        <div className="flex absolute z-1000 justify-center items-center mx-auto h-screen w-full">
          <Loader />
        </div>
      )}
    <main className="-z-10">
      <h1 className="postjob-title">Post a Job</h1>
      <section className="addjob-cont">
        <form action="" onSubmit={handleSubmit} id="addjob-form">
          <div>
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              placeholder="Role"
              id="role"
              name="role"
              onChange={handleChange}
              value={data.role}
            />
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

          <div>
            <label htmlFor="job_description">Job Description:</label>
            <textarea
              name="job_description"
              id="job_description"
              placeholder="Description"
              onChange={handleChange}
              value={data.job_description}
            ></textarea>
            {errors.job_description && (
                  <p className="error-message">{errors.job_description}</p>
                )}
          </div>
          <div>
            <label htmlFor="skills_required">Skills Required:</label>
            <input
              type="text"
              name="skills_required"
              id="skills_required"
              placeholder="Comma-separated skills (e.g., HTML, CSS, JavaScript)"
              onChange={handleChange}
              value={data.skills_required}
            />
            {errors.skills_required && (
                  <p className="error-message">{errors.skills_required}</p>
                )}
          </div>

          <div>
            <label>Experience Level:</label>
            <div className="radio-inputs">
              <label htmlFor="entry" className="radio">
                <input
                  type="radio"
                  name="experience_level"
                  id="entry"
                  value="Entry Level"
                  onChange={handleChange}
                />
                <span className="name">Entry Level</span>
              </label>
              <label htmlFor="mid" className="radio">
                <input
                  type="radio"
                  name="experience_level"
                  id="mid"
                  value="Mid Level"
                  onChange={handleChange}
                />
                <span className="name">Mid Level</span>
              </label>
              <label htmlFor="senior" className="radio">
                <input
                  type="radio"
                  name="experience_level"
                  id="senior"
                  value="Senior Level"
                  onChange={handleChange}
                />
                <span className="name">Senior Level</span>
              </label>
            </div>
            {errors.experience_level && (
                  <p className="error-message">{errors.experience_level}</p>
                )}
          </div>
          <div>
            <label>Project Duration:</label>
            <div className="radio-inputs">
              <label htmlFor="short-term" className="radio">
                <input
                  type="radio"
                  name="project_duration"
                  id="short-term"
                  value="Short Term"
                  onChange={handleChange}
                />
                <span className="name">Short Term</span>
              </label>
              <label htmlFor="long-term" className="radio">
                <input
                  type="radio"
                  name="project_duration"
                  id="long-term"
                  value="Long Term"
                  onChange={handleChange}
                />
                <span className="name">Long Term</span>
              </label>
              <label htmlFor="contract" className="radio">
                <input
                  type="radio"
                  name="project_duration"
                  id="contract"
                  value="Contract"
                  onChange={handleChange}
                />
                <span className="name">Contract</span>
              </label>
              <label htmlFor="permanent" className="radio">
                <input
                  type="radio"
                  name="project_duration"
                  id="permanent"
                  value="Permanent"
                  onChange={handleChange}
                />
                <span className="name">Permanent</span>
              </label>
            </div>
            {errors.project_duration && (
                  <p className="error-message">{errors.project_duration}</p>
                )}
          </div>
          <div>
            <label htmlFor="compensation">Compensation Details:</label>
            <input
              type="text"
              name="compensation"
              id="compensation"
              placeholder="Compensation (e.g., Paid, Unpaid)"
              onChange={handleChange}
            />
            {errors.compensation && (
                  <p className="error-message">{errors.compensation}</p>
                )}
          </div>
          <div>
            <label htmlFor="application_deadline">Application Deadline:</label>
            <input
              type="date"
              name="application_deadline"
              id="application_deadline"
              onChange={handleChange}
            />
            {errors.application_deadline && (
                  <p className="error-message">{errors.application_deadline}</p>
                )}
          </div>

          <div>
            <label>Location:</label>
            <div className="radio-inputs">
              <label htmlFor="remote" className="radio">
                <input
                  type="radio"
                  name="location_requirements"
                  id="remote"
                  value="Remote"
                  onChange={handleChange}
                />
                <span className="name">Remote</span>
              </label>
              <label htmlFor="on-site" className="radio">
                <input
                  type="radio"
                  name="location_requirements"
                  id="on-site"
                  value="On-site"
                  onChange={handleChange}
                />
                <span className="name">On-Site</span>
              </label>
              <label htmlFor="hybrid" className="radio">
                <input
                  type="radio"
                  name="location_requirements"
                  id="hybrid"
                  value="Hybrid"
                  onChange={handleChange}
                />
                <span className="name">Hybrid</span>
              </label>
            </div>
            {errors.location_requirements && (
                  <p className="error-message">{errors.location_requirements}</p>
                )}
          </div>
        </form>

        <section className="submit-section">
          <div>
            <label htmlFor="contact_information">Contact Information:</label>
            <input
              type="text"
              name="contact_information"
              id="contact_information"
              placeholder="Contact Email or Phone"
              form="addjob-form"
              onChange={handleChange}
            />
            {errors.contact_information && (
                  <p className="error-message">{errors.contact_information}</p>
                )}
          </div>
          <div>
            <label htmlFor="company_description">Company Description:</label>
            <textarea
              name="company_description"
              id="company_description"
              placeholder="Brief description of the organization"
              form="addjob-form"
              onChange={handleChange}              
            />
          </div>
          
          <button type="submit" form="addjob-form" className="submit-button">
            {!loading ? 'POST JOB' : 'POSTING JOB...'}
          </button>
        </section>
      </section>
    </main>
    </div>
    </>
  );
};

export default AddJob;