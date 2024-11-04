import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OrgNavbar = () => {
  const navigate = useNavigate();
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
    window.location.reload();
  };

  const checkProfileCreated = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/org/view_profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if data exists and critical fields are present
      const data = response.data.data;
      if (response.status === 200 && data && data.name && data.description) {
        setIsProfileCreated(true);
      } else {
        setIsProfileCreated(false);
      }
    } catch (error) {
      console.error("Error checking profile status:", error);
      setIsProfileCreated(false);
    }
  };

  // Call checkProfileCreated only on component mount
  useEffect(() => {
    checkProfileCreated();
  }, []); // Empty dependency array to run once

  return (
    <div className="relative z-10 py-4 md:py-6">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              to="/home"
              className="flex rounded outline-none text-2xl font-bold focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              JOBCONNECT
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:space-x-10">
            <Link
              to="/orgJobList"
              className="text-base font-medium text-gray-900 hover:text-opacity-50"
            >
              Manage Listings
            </Link>

            <Link
              to="/addjob"
              className="text-base font-medium text-gray-900 hover:text-opacity-50"
            >
              Post Job
            </Link>

            {isProfileCreated && (
              <Link
                to="/viewOrgProfile"
                className="text-base font-medium text-gray-900 hover:text-opacity-50"
              >
                Profile
              </Link>
            )}

            {!isProfileCreated &&(<Link to="/orgProfile" className="text-base font-medium text-gray-900 hover:text-opacity-50">
              Create Profile
            </Link>)}
          </div>

          <div className="hidden md:flex">
            <button
              onClick={logout}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgNavbar;
