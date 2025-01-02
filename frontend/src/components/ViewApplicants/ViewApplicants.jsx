import React, { useState, useEffect } from "react";
import "./ViewApplicants.css";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import SelectedApplicantCard from "./SelectedApplicantCard";
import RejectedApplicantCard from "./RejectedApplicantCard";

const ViewApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [rejectedApplicants, setRejectedApplicants] = useState([]); // For rejected applicants
  const [showRejected, setShowRejected] = useState(false); // State to toggle rejected applicants
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch job details
  const getJob = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://actify-backend-rubx.onrender.com/api/v1/jobs/get_id_job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setJob(response.data);
      setIsLoading(false);
    } catch (e) {
      setError("Failed to fetch job data");
      console.error("Error occurred while fetching job details:", e);
      setIsLoading(false);
    }
  };

  // Fetch applicants for the job
  const getApplicants = async () => {
    if (job) {
      try {
        const applicantPromises = job.Applicants.map(async (applicantId) => {
          return axios
            .get(`https://actify-backend-rubx.onrender.com/api/v1/freelancer/view_profile/${applicantId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            })
            .then((response) => response.data.data)
            .catch((error) => {
              console.error("Error fetching applicant ID:", applicantId, error);
              return null;
            });
        });
  
        const applicantResults = await Promise.allSettled(applicantPromises);
  
        const applicantData = applicantResults
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value)
          .filter((data) => data !== null);
  
        console.log("Fetched applicants:", applicantData);
  
        const applied = applicantData.filter((applicant) =>
          applicant.appliedJobs.some((job) => job.jobId.toString() === id && job.status === "Applied")
        );
        const selected = applicantData.filter((applicant) =>
          applicant.appliedJobs.some((job) => job.jobId.toString() === id && job.status === "Working")
        );
        const rejected = applicantData.filter((applicant) =>
          applicant.appliedJobs.some((job) => job.jobId.toString() === id && job.status === "Not Selected")
        );
  
        setApplicants(applied);
        setSelectedApplicants(selected);
        setRejectedApplicants(rejected);
      } catch (error) {
        setError("Failed to fetch applicants");
        console.error("Error occurred while fetching applicants:", error);
      }
    } else {
      console.log("No Applicants array found in job data");
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  useEffect(() => {
    if (job) getApplicants();
  }, [job]);

  const handleRecruit = async (applicantId) => {
    try {
      await axios.post(
        `https://actify-backend-rubx.onrender.com/api/v1/freelancejobs/${job._id}/update_applicant_status`,
        {
          applicantId,
          status: "Accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      getApplicants();
    } catch (error) {
      setError("Failed to recruit applicant");
      console.error("Error recruiting applicant:", error);
    }
  };

  const handleReject = async (applicantId) => {
    try {
      await axios.post(
        `https://actify-backend-rubx.onrender.com/api/v1/freelancejobs/${job._id}/update_applicant_status`,
        {
          applicantId,
          status: "Rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      getApplicants();
    } catch (error) {
      setError("Failed to reject applicant");
      console.error("Error rejecting applicant:", error);
    }
  };

  return (
    <main className="recruit-cont flex border-r-2">
      <section className="flex-1">
        <div className="bg-gray-50 w-fit">
          <section className="p-12 w-full">
            {isLoading ? (
              <Loader />
            ) : job ? (
              <div className="flex flex-col gap-1 text-center xl:col-span-1 lg:text-left">
                <h1 className="text-4xl font-bold text-gray-900">{job.role}</h1>
                <p className="mt-2 text-lg text-gray-600">{job.job_description}</p>
                <blockquote className="mt-6">
                  <p className="text-lg font-bold text-gray-900">Experience Level:</p>
                  <p className="text-base text-gray-600">{job.experience_level}</p>
                </blockquote>
                <blockquote className="mt-6">
                  <p className="text-lg font-bold text-gray-900">Skills Required:</p>
                  <div className="flex flex-wrap mt-4">
                    {job.skills_required?.map((skill, index) => (
                      <p
                        key={index}
                        className="bg-gray-100 text-xs px-3 py-1 mb-2 mr-2 rounded-full border border-gray-300"
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                </blockquote>
                <blockquote className="mt-6">
                  <p className="text-lg font-bold text-gray-900">Project Duration:</p>
                  <p className="text-base text-gray-600">{job.project_duration}</p>
                </blockquote>
                <blockquote className="mt-6">
                  <p className="text-lg font-bold text-gray-900">Location:</p>
                  <p className="text-base text-gray-600">{job.location_requirements}</p>
                </blockquote>
                <blockquote className="mt-6">
                  <p className="text-lg font-bold text-gray-900">Compensation:</p>
                  <p className="text-base text-gray-600">{job.compensation}</p>
                </blockquote>
              </div>
            ) : (
              <div>Loading job details...</div>
            )}
          </section>
        </div>
      </section>

      <section className="applicant-cont flex-1 bg-gray-50 px-4">
        <h2 className="text-lg font-bold py-4 px-2">Applicants (Pending):</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <ApplicantCard
              key={index}
              name={applicant.name}
              email={applicant.email}
              _id={applicant._id}
              handleRecruit={handleRecruit}
              handleReject={handleReject}
            />
          ))
        ) : (
          <div className="no-applicant">No Pending Applicants</div>
        )}
      </section>

      <section className="selected-cont flex-1 bg-gray-50 px-4">
        <h2 className="text-lg font-bold py-4 px-2">Selected Candidates:</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : selectedApplicants.length > 0 ? (
          selectedApplicants.map((applicant, index) => (
            <SelectedApplicantCard
              key={index}
              name={applicant.name}
              email={applicant.email}
              _id={applicant._id}
            />
          ))
        ) : (
          <div className="no-applicant">No Selected Candidates</div>
        )}
      </section>

      {/* Button and section for rejected applicants */}
      <section className="rejected-cont flex-1 bg-gray-50 px-4">
        <button
          className="text-lg font-bold py-4 px-2"
          onClick={() => setShowRejected((prev) => !prev)}
        >
          {showRejected ? "Hide" : "Show"} Rejected Applicants
        </button>
        {showRejected && (
          <>
            <h2 className="text-lg font-bold py-4 px-2">Rejected Applicants:</h2>
            {rejectedApplicants.length > 0 ? (
              rejectedApplicants.map((applicant, index) => (
                <RejectedApplicantCard
                  key={index}
                  name={applicant.name}
                  email={applicant.email}
                />
              ))
            ) : (
              <div className="no-applicant">No Rejected Applicants</div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ViewApplicants;
