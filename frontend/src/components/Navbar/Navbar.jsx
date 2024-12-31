import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import UserNavbar from "../UserNavbar/UserNavbar";
import OrgNavbar from "../OrgNavbar/OrgNavbar";
const Navbar = () => {
  const userType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("authToken");
  // console.log("isloggedin", isLoggedIn);
  const navigate = useNavigate();
  if (!isLoggedIn) {
    return (
      //   <nav>
      //   <div className='logo-header'>
      //     <img src='' alt='' />
      //   </div>
      //   <div className='title-header'>Freelanza</div>
      //   <div className='nav-header'>
      //     <Link to={"/"} className='navlink'>
      //       Home
      //     </Link>
      //     <Link to={"/job"} className='navlink'>
      //       Apply
      //     </Link>
      //   </div>
      //   <div className='login-header'>
      //     <button
      //       className='login-button'
      //       onClick={() => {
      //         navigate("/login");
      //       }}
      //     >
      //       LOGIN
      //     </button>
      //   </div>
      // </nav>
      <div className="relative z-10 py-4 md:py-6" x-data="{expanded: false}">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link
                to="/"
                title=""
                className="flex rounded outline-none text-2xl font-bold focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                Actify
              </Link>
            </div>

            <div className="flex md:hidden">
              <button type="button" className="text-gray-900">
                <span x-show="!expanded" aria-hidden="true">
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
                </span>

                <span x-show="expanded" aria-hidden="true">
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
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="hidden md:flex md:items-center md:justify-center md:space-x-10 md:absolute md:inset-y-0 md:left-1/2 md:-translate-x-1/2 lg:space-x-16">
              <Link
                to="/features"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                Features{" "}
              </Link>

              <Link
                to="/aboutUs"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                {" "}
                About{" "}
              </Link>
            </div>

            {/* <div className="hidden md:flex">
            <Link
              to="/"
              title=""
              className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
              onClick={logout}
            >
              Logout
            </Link>
          </div> */}
            <div className="login-header">
              <button
                className="login-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return userType === "user" ? <UserNavbar /> : <OrgNavbar />;
};

export default Navbar;
