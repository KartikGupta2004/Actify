import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams(); // Use  job ID from URL params
  const authToken = localStorage.getItem("authToken"); // Auth Token
  const [job, setJob] = useState({});
  const [isApplying, setIsApplying] = useState(false); // To handle apply button state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const profile = localStorage.getItem("Profile") === "true" || false;

  // Fetch the job details
  useEffect(() => {

    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `https://actify-backend-rubx.onrender.com/api/v1/jobs/get_id_job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        // console.log(res)
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

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
        // console.log(response.data.data)
        response.data.data.appliedJobs.map((job)=>{
          if(job.jobId === id){
            setHasApplied(true);
          }
      });
      } catch (error) {
        // console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
    if(profile){
      fetchUserData();
    }
  }, [id, authToken]);

  const handleCancelApply = () => {
    setIsModalOpen(false);
  };

  // Function to handle job application
  const handleConfirmApply = async () => {
    setIsModalOpen(false)
    setIsApplying(true);
    try {
      const applicationData = {
        jobId: id
      };

      const res = await axios.post('https://actify-backend-rubx.onrender.com/api/v1/freelancejobs/apply', applicationData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      alert("Application submitted successfully!");
      navigate('/myjobs')
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to apply for the job.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Confirm Application</h2>
                <div className="mt-4 flex justify-between">
                  <button onClick={handleConfirmApply} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    OK
                  </button>
                  <button onClick={handleCancelApply} className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
  <section className="relative py-12 sm:py-16 lg:pb-40">
    <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
        <div className="text-center xl:col-span-1 lg:text-left">
          <h1 className="text-5xl font-bold text-gray-900">
            {job.role}
          </h1>
          <p className="mt-4 text-2xl text-gray-600">
            {job.job_description}
          </p>

          <div className="mt-8 text-left">
            <p className="text-3xl font-semibold text-gray-900">Required Skills:</p>
            <ul className="list-disc list-inside text-2xl text-gray-600">
              {(job.skills_required || []).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-left">
            <p className="text-3xl font-semibold text-gray-900">Experience Level:</p>
            <p className="text-2xl text-gray-600">{job.experience_level}</p>
          </div>

          <div className="mt-8 text-left">
            <p className="text-3xl font-semibold text-gray-900">Compensation:</p>
            <p className="text-2xl text-gray-600">{job.compensation}</p>
          </div>

          <div className="mt-8 text-left">
            <p className="text-3xl font-semibold text-gray-900">Project Duration:</p>
            <p className="text-2xl text-gray-600">{job.project_duration}</p>
          </div>

          <div className="mt-8 text-left">
            <p className="text-3xl font-semibold text-gray-900">Location Requirements:</p>
            <p className="text-2xl text-gray-600">{job.location_requirements}</p>
          </div>

          <div className="mt-8 text-left">
            <p className="text-3xl font-semibold text-gray-900">Application Deadline:</p>
            <p className="text-2xl text-gray-600">
              {new Date(job.application_deadline).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-3xl font-semibold text-gray-900">Contact Information:</p>
            <p className="text-2xl text-gray-600">{job.contact_information}</p>
          </div>

          {profile ? (<button
                onClick={() => setIsModalOpen(true)}
                disabled={isApplying || hasApplied}
                className={`inline-flex px-8 py-4 mt-8 text-2xl font-bold text-white rounded ${
                  hasApplied || isApplying
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-600"
                }`}
              >
                {isApplying ? "Applying..." : hasApplied ? "Already Applied" : "Apply"}
              </button>)
              : 
              (<Link to='/createProfile'>
                <button className="inline-flex px-2 py-2 mt-8 text-2xl font-bold text-white rounded bg-gray-900 hover:bg-gray-600">
                    Create Profile to Apply
                </button>
              </Link>)  
          }

          <div className="mt-8">
            <blockquote className="mt-6">
              <p className="text-3xl font-bold text-gray-900">
                About the company
              </p>
              <p className="mt-3 text-2xl text-gray-600">
                {job.company_description}
              </p>
            </blockquote>
          </div>
        </div>
        <div className="xl:col-span-1">
          <img
            className="w-full mx-auto"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/illustration.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</div>

  
  );
};

export default JobPage;
