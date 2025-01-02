import React, { useState,useEffect } from "react";
import "./UpdateJob.css";
import axios from "axios";
import { useNavigate,useParams  } from "react-router-dom";
import Loader from "../Loader/Loader";

const UpdateJob = () => {
  const { jobId } = useParams();
  const authToken = localStorage.getItem("authToken");
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
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
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

  useEffect(() => {
    // Fetch job details
    const fetchJobDetails = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `https://actify-backend-rubx.onrender.com/api/v1/jobs/get_id_job/${jobId}`, // Fetch specific job by ID
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const jobData = response.data;
        const formattedDate = new Date(jobData.application_deadline)
        .toISOString()
        .split("T")[0];
        // Populate form fields with fetched data
        setData({
          role: jobData.role,
          job_description: jobData.job_description,
          skills_required: jobData.skills_required.join(", "),
          experience_level: jobData.experience_level,
          compensation: jobData.compensation,
          application_deadline: formattedDate,
          location_requirements: jobData.location_requirements,
          contact_information: jobData.contact_information,
          project_duration: jobData.project_duration,
          company_description: jobData.company_description,
        });
      } catch (e) {
        // console.error("Error fetching job details:", e.message);
        alert("Failed to load job details.");
      } finally{
        setFetching(false);
      }
    };

    fetchJobDetails();
  }, [jobId, authToken]);

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

    setLoading(true);

    const updatedData = {
        ...data,
        skills_required: data.skills_required.split(",").map((skill) => skill.trim()), // Convert string to array
      };
    
    try {
      const response = await axios.put(
        `https://actify-backend-rubx.onrender.com/api/v1/jobs/update_id_job/${jobId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Job Updated!");
      // console.log(response.data);
      navigate("/jobList");
    } catch (e) {
      // console.log("Error occurred when trying to create job listing!");
      // console.error(e.message);
      alert("Failed to update the job.");
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center mx-auto h-3/4">
        <p className="text-xl font-semibold mr-3">Loading job details...</p>
        <Loader />
      </div>
    );
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
      <h1 className="postjob-title">Edit a Job</h1>
      <section className="addjob-cont">
        <form action="" onSubmit={handleSubmit} id="addjob-form">
          <div>
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              placeholder="Role"
              id="role"
              name="role"
              value={data.role}
              onChange={handleChange}
            />
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>
          <div>
            <label htmlFor="job_description">Job Description:</label>
            <textarea
              value={data.job_description}
              name="job_description"
              id="job_description"
              placeholder="Description"
              onChange={handleChange}
            ></textarea>
            {errors.job_description && (
                  <p className="error-message">{errors.job_description}</p>
                )}
          </div>
          <div>
            <label htmlFor="skills_required">Skills Required:</label>
            <input
              type="text"
              value={data.skills_required}
              name="skills_required"
              id="skills_required"
              placeholder="Comma-separated skills (e.g., HTML, CSS, JavaScript)"
              onChange={handleChange}
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
                  checked={data.experience_level === "Entry Level"}
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
                  checked={data.experience_level === "Mid Level"}
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
                  checked={data.experience_level === "Senior Level"}
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
                  checked={data.project_duration === "Short Term"}
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
                  checked={data.project_duration === "Long Term"}
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
                  checked={data.project_duration === "Contract"}
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
                  checked={data.project_duration === "Permanent"}
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
              value = {data.compensation}
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
              value = {data.application_deadline}
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
                  checked={data.location_requirements === "Remote"}
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
                  checked={data.location_requirements === "On-site"}
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
                  checked={data.location_requirements === "Hybrid"}
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
              value={data.contact_information}
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
              value={data.company_description}
            />
          </div>

          <button type="submit" form="addjob-form" className="submit-button">
            {!loading ? 'UPDATE JOB' : 'UPDATING JOB......'}
          </button>
        </section>
      </section>
    </main>
    </div>
    </>
  );
};

export default UpdateJob;