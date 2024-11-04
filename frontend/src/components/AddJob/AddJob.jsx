import React, { useState } from "react";
import "./AddJob.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddJob = () => {
  const token = localStorage.getItem("token");
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

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "project_duration" ||
      name === "location_requirements" ||
      name === "experience_level"
    ) {
      setError(null);
    }
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.experience_level) {
      setError(`Please enter the Experience Level`);
      return;
    }
    if (!data.project_duration) {
      setError("Please enter the Project Duration");
      return;
    }
    if (!data.location_requirements) {
      setError("Please enter the Location Requirements");
      return;
    }
    data.skills_required = data.skills_required.split(",");
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/jobs/create_job",
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("done!");
      console.log(response.data);
      navigate("/jobList");
    } catch (e) {
      console.log("Error occured when trying to create job listing!");
      console.error(e.message);
    }
  };

  return (
    <main>
      <h1 className="postjob-title">Post a Job:</h1>
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
              required
            />
          </div>
          <div>
            <label htmlFor="job_description">Job Description:</label>
            <textarea
              name="job_description"
              id="job_description"
              placeholder="Description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="skills_required">Skills Required:</label>
            <input
              type="text"
              name="skills_required"
              id="skills_required"
              placeholder="Skills"
              onChange={handleChange}
              required
            />
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
          </div>
          <div>
            <label>Project Duration</label>
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
          </div>
          <div>
            <label htmlFor="compensation">Compensation Details:</label>
            <input
              type="text"
              name="compensation"
              id="compensation"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="application_deadline">Application Deadline:</label>
            <input
              type="date"
              name="application_deadline"
              id="application_deadline"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="">Location:</label>
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
          </div>
        </form>
        <section className="submit-section">
          <div>
            <label htmlFor="contact_information">Contact Information:</label>
            <input
              type="text"
              name="contact_information"
              id="contact_information"
              form="addjob-form"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="company_description">Company Description:</label>
            <textarea
              name="company_description"
              id="company_description"
              form="addjob-form"
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <p className="font-mono text-red-600 bg-red-200 border-red-600 w-full text-center rounded px-2 py-1">
              {error}
            </p>
          )}
          <button type="submit" form="addjob-form" className="submit-button">
            POST JOB
          </button>
        </section>
      </section>
    </main>
  );
};

export default AddJob;
