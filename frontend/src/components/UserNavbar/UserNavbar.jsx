import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const UserNavbar = () => {
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
        "http://localhost:4000/api/v1/freelancer/view_profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setIsProfileCreated(true);
      } else {
        setIsProfileCreated(false);
      }
    } catch (error) {
      console.error("Error checking profile status:", error);
      setIsProfileCreated(false);
    }
  };

  useEffect(() => {
    checkProfileCreated();
  }, [isProfileCreated]);

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

          <div className="flex md:hidden">
            <button type="button" className="text-gray-900">
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:space-x-10 md:absolute md:inset-y-0 md:left-1/2 md:-translate-x-1/2 lg:space-x-16">
            <Link
              to="/joblist"
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              Find Jobs
            </Link>

            <Link
              to="/myjobs"
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              My Job
            </Link>

            {isProfileCreated && (
              <Link
                to="/userProfile"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                Profile
              </Link>
            )}

            {!isProfileCreated &&(<Link
              to="/createProfile"
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
            >
              Create Profile
            </Link>)}
          </div>

          <div className="hidden md:flex">
            <button
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
