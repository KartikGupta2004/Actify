import React, { useState, useEffect } from "react";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
function OrgsJobList() {
  const [search, setSearch] = useState("");
  const [workingSchedule, setWorkingSchedule] = useState([]);
  const [employmentType, setEmploymentType] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const profile = localStorage.getItem("Profile") === "true" || false;

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      try{
      const res = await axios.get(
        "http://localhost:4000/api/v1/jobs/get_company_job",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(res.data.jobs)
      setJobs(res.data.jobs);
    } catch(error){
        alert('Error Occured!')
    } finally{
      setLoading(false);
    }
    };
      fetchJobs();
  }, []);

  const handleWorkingScheduleChange = (e) => {
    const { value, checked } = e.target;
    setWorkingSchedule((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleEmploymentTypeChange = (e) => {
    const { value, checked } = e.target;
    setEmploymentType((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  function formatDate(isoString) {
    // Convert to Date object
    const dateObj = new Date(isoString);

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    // Format the date to a more aesthetic and readable string
    return dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "short", // Abbreviated month name (e.g., "Sep")
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 12-hour clock format
    });
  }

  const filteredJobs = jobs.filter((job) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      job.role.toLowerCase().includes(searchTerm) ||
      // job.company.toLowerCase().includes(searchTerm) ||
      job.location_requirements.toLowerCase().includes(searchTerm);

    const matchesWorkingSchedule =
      workingSchedule.length === 0 ||
      workingSchedule.includes(job.project_duration);

    const matchesEmploymentType =
      employmentType.length === 0 ||
      employmentType.includes(job.location_requirements);

    return matchesSearch && matchesWorkingSchedule && matchesEmploymentType;
  });

  return (
    <div className="text-black h-fit bg-gray-100 py-10 px-6">
      <div className="flex h-full gap-8">
        {/* Left Part - Filters Section */}
        <div className="w-1/4 bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-[10px] max-h-fit overflow-y-auto">
          <p className="text-2xl font-bold mb-6">Filters</p>

          {/* Working Schedule Filter */}
          <div className="flex flex-col space-y-3 mb-8">
            <p className="text-lg font-medium text-gray-700">
              Working Schedule
            </p>
            {["Short Term", "Long Term", "Contract", "Permanent"].map(
              (schedule) => (
                <label
                  key={schedule}
                  className="flex items-center cursor-pointer hover:text-blue-600"
                >
                  <input
                    className="mr-3 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    type="checkbox"
                    value={schedule}
                    onChange={handleWorkingScheduleChange}
                  />
                  {schedule}
                </label>
              )
            )}
          </div>

          {/* Location Requirements Filter */}
          <div className="flex flex-col space-y-3">
            <p className="text-lg font-medium text-gray-700">
              Location Requirements
            </p>
            {["Remote", "On-site", "Hybrid"].map((location) => (
              <label
                key={location}
                className="flex items-center cursor-pointer hover:text-blue-600"
              >
                <input
                  className="mr-3 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  type="checkbox"
                  value={location}
                  onChange={handleEmploymentTypeChange}
                />
                {location}
              </label>
            ))}
          </div>
        </div>

        {/* Right Part - Display Jobs Section */}
        <div className="w-3/4">
          {!profile && <p className="flex justify-center items-center mx-auto h-3/4 text-gray-500 text-4xl">No new jobs posted yet.</p>}
          
          {loading && <div className="flex justify-center items-center mx-auto h-3/4"><Loader /></div>}

          {/* Search Bar */}
          {profile && !loading && <div className="flex justify-between mb-8">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-white border border-gray-300 px-4 py-3 w-[150px] focus:w-[250px] transition-[width] duration-300 outline-none rounded-lg shadow-sm text-lg font-sans placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              name="text"
              type="text"
            />
          </div>}

          {/* Job Cards Grid */}
          {!loading && <div className="grid grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`m-2 rounded-lg h-fit p-3 ${job.bgColor}`}>
                  {/* Job Header */}
                  <span className="flex justify-between items-center">
                    <p className="bg-white text-xs px-3 py-1 rounded-full">
                      {formatDate(job.application_deadline)}
                    </p>
                    {/* <HiOutlineBookmark className="w-6 h-6 text-gray-500" /> */}
                  </span>

                  {/* Company and Role */}
                  <p className="font-bold text-sm text-gray-800 mt-4">
                    {job.company}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-semibold">{job.role}</p>
                    {/* Check if job.logo exists, else show default avatar */}
                    <img
                      src={
                        job.logo ||
                        `https://ui-avatars.com/api/?name=${job.role}`
                      }
                      alt={`${job.company} logo`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>

                  {/* Skills Required */}
                  <div className="flex flex-wrap mt-4">
                    {job.skills_required.map((skill, index) => (
                      <p
                        key={index}
                        className="bg-gray-100 text-xs px-3 py-1 mb-2 mr-2 rounded-full border border-gray-300"
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                </div>
                    
                {/* Job Details */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="font-bold text-gray-700">
                      {job.compensation}
                    </p>
                    <p className="text-gray-500">{job.location_requirements}</p>
                  </div>
                  <button
                    className="bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-600 transition-colors"
                    onClick={() => navigate(`/editJob/${job._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-colors"
                    onClick={() => navigate(`/recruit/${job._id}`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
}

export default OrgsJobList;