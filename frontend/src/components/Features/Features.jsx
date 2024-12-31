import React from "react";
import { FiUsers, FiBriefcase, FiBell, FiUserCheck, FiSearch, FiStar } from "react-icons/fi";

const Features = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Simplifying Volunteer Connections
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Discover, manage, and engage in meaningful community service opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          {/* Volunteer Matching */}
          <div className="md:p-8 lg:p-14">
            <FiSearch className="mx-auto text-green-600" size={50} />
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Volunteer Matching
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Find opportunities tailored to your skills, interests, and location.
            </p>
          </div>

          {/* Opportunity Posting */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <FiBriefcase className="mx-auto text-green-600" size={50} />
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Opportunity Posting
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Organizations can post detailed service opportunities to connect with the right volunteers.
            </p>
          </div>

          {/* Notification System */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <FiBell className="mx-auto text-green-600" size={50} />
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Notification System
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Get instant alerts about new opportunities that match your profile.
            </p>
          </div>

          {/* Profile Management */}
          <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
            <FiUserCheck className="mx-auto text-green-600" size={50} />
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Profile Management
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Update your profile to reflect your skills, interests, and preferences.
            </p>
          </div>

          {/* Feedback and Rating System */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <FiStar className="mx-auto text-green-600" size={50} />
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Feedback and Rating System
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Share feedback and rate your experiences to help improve future opportunities.
            </p>
          </div>

          {/* Secure Registration */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <FiUsers className="mx-auto text-green-600" size={50} />
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Secure Registration
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Safe and secure user registration for both volunteers and organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
