import React, { useState, useEffect } from "react";
import "./ViewApplicants.css";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const ViewApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getJob = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/jobs/get_id_job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setJob(data);
      setIsLoading(false);
    } catch (e) {
      setError("Failed to fetch job data");
      console.error("Error occurred while fetching job details! Try again.");
      setIsLoading(false);
    }
  };

  const getApplicants = async () => {
    if (job && job.Applicants) {
      try {
        const applicantPromises = job.Applicants.map(async (applicantId) => {
          const response = await axios.get(
            `http://localhost:4000/api/v1/freelancer/view_profile/${applicantId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          return response.data;
        });
        const applicantData = await Promise.all(applicantPromises);
        console.log("applicants fetched");
        setApplicants(applicantData);
      } catch (error) {
        setError("Failed to fetch applicants");
        console.error("Error occurred while fetching applicants! Try again.");
      }
    }
  };
  useEffect(() => {
    getJob();
  }, [])
  useEffect(() => {
    getApplicants();
  }, [job]);

  return (
    <main className='recruit-cont flex border-r-2'>
      <section className='jd-cont flex-1'>
        <div className='bg-gray-50 w-fit'>
          <section className='p-12 w-full'>
            {isLoading ? (
              <Loader />
            ) : job ? (
              <div className='flex flex-col gap-1 text-center xl:col-span-1 lg:text-left'>
                <h1 className='text-4xl font-bold text-gray-900'>{job.role}</h1>
                <p className='mt-2 text-lg text-gray-600'>
                  {job.job_description}
                </p>
                <blockquote className='mt-6'>
                  <p className='text-lg font-bold text-gray-900'>
                    Experience Level:
                  </p>
                  <p className='text-base text-gray-600'>
                    {job.experience_level}
                  </p>
                </blockquote>
                <blockquote className='mt-6'>
                  <p className='text-lg font-bold text-gray-900'>
                    Skills Required:
                  </p>
                  <div className='flex flex-wrap mt-4'>
                    {job.skills_required.map((skill, index) => (
                      <p
                        key={index}
                        className='bg-gray-100 text-xs px-3 py-1 mb-2 mr-2 rounded-full border border-gray-300'
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                </blockquote>
                <blockquote className='mt-6'>
                  <p className='text-lg font-bold text-gray-900'>
                    Project Duration:
                  </p>
                  <p className='text-base text-gray-600'>
                    {job.project_duration}
                  </p>
                </blockquote>
                <blockquote className='mt-6'>
                  <p className='text-lg font-bold text-gray-900'>Location:</p>
                  <p className='text-base text-gray-600'>
                    {job.location_requirements}
                  </p>
                </blockquote>
                <blockquote className='mt-6'>
                  <p className='text-lg font-bold text-gray-900'>
                    Compensation:
                  </p>
                  <p className='text-base text-gray-600'>{job.compensation}</p>
                </blockquote>
              </div>
            ) : (
              <div>Loading job details...</div>
            )}
          </section>
        </div>
      </section>
      <section className='applicant-cont flex-1 bg-gray-50 px-4'>
        <h2 className='text-lg font-bold py-4 px-2'>Applicants:</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='error'>{error}</div>
        ) : applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <ApplicantCard key={index} {...applicant} />
          ))
        ) : (
          <div className='no-applicant'>No Applicants</div>
        )}
      </section>
    </main>
  );
};

export default ViewApplicants;
