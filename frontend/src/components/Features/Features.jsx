import React, { useState } from "react";
import { TbShieldLock } from "react-icons/tb";

const Features = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Make every step user-centric
          </h2>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          <div className="md:p-8 lg:p-14">
            <svg
              className="mx-auto mb-0"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:cc="http://creativecommons.org/ns#"
              xmlns:dc="http://purl.org/dc/elements/1.1/"
            >
              <g transform="translate(0 -1028.4)">
                <path
                  d="m3 1031.4v10c0 4.2 3.6322 8 9 10 5.368-2 9-5.8 9-10v-10h-18z"
                  fill="#95a5a6"
                />
                <path
                  d="m3 1030.4v10c0 4.2 3.6322 8 9 10 5.368-2 9-5.8 9-10v-10h-18z"
                  fill="#ecf0f1"
                />
                <path
                  d="m3 1030.4v10c0 4.2 3.6322 8 9 10v-20h-9z"
                  fill="#bdc3c7"
                />
                <path
                  d="m5 1032.4v8c0 3.4 2.8251 6.4 7 8 4.175-1.6 7-4.6 7-8v-8h-14z"
                  fill="#27ae60"
                />
                <path
                  d="m12 1032.4v16c4.175-1.6 7-4.6 7-8v-8h-7z"
                  fill="#2ecc71"
                />
                <path
                  d="m16 1037.4-4.683 4.6-1.9511-1.9-1.6586 1.7 1.9512 1.9 1.5615 1.6 0.097 0.1 6.342-6.4-1.659-1.6z"
                  fill="#27ae60"
                />
                <path
                  d="m16 1036.4-4.683 4.6-1.9511-1.9-1.6586 1.7 1.9512 1.9 1.5615 1.6 0.097 0.1 6.342-6.4-1.659-1.6z"
                  fill="#ecf0f1"
                />
              </g>
            </svg>
            {/* <TbShieldLock style={{width:"46px", height:"46px"}}className='mx-auto mb-0'/> */}
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Escrow Payment Protection
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Work with confidence using our secure escrow payment system that
              holds funds until project milestones are met, ensuring trust and
              satisfaction for both graduates and clients.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <svg
              className="mx-auto"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 27H19V45H27V27Z"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 37H1V45H9V37Z"
                fill="#D4D4D8"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M45 17H37V45H45V17Z"
                fill="#D4D4D8"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 17L15 7L23 15L37 1"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28 1H37V10"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              AI-Powered Job and Talent Recommendations
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Experience smarter connections with our AI-powered system that
              recommends the best jobs for graduates and the most suitable
              talents for clients, tailored to your preferences and skills.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <svg
              className="mx-auto"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41 1H1V41H41V1Z"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 7H7V20H18V7Z"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 26H7V35H18V26Z"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M35 7H24V35H35V7Z"
                fill="#D4D4D8"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Client and Graduate Messaging
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Communicate effectively with clients or graduates using our
              real-time messaging system, keeping all project discussions in one
              place.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
            <svg
              className="mx-auto"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.66667 25H6C3.23858 25 1 27.2386 1 30V37C1 39.7614 3.23858 42 6 42H36C38.7614 42 41 39.7614 41 37V30C41 27.2386 38.7614 25 36 25H31.8333C30.2685 25 29 26.2685 29 27.8333C29 29.3981 27.7315 30.6667 26.1667 30.6667H15.3333C13.7685 30.6667 12.5 29.3981 12.5 27.8333C12.5 26.2685 11.2315 25 9.66667 25Z"
                fill="#D4D4D8"
              />
              <path
                d="M9 9H33"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 17H33"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 25H13V31H29V25H41"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              {" "}
              Advanced Filter and Search Options
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Find the perfect freelance projects or candidates with our
              advanced filtering options, allowing you to search by skills,
              experience, location, and more.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <svg
              className="mx-auto"
              width="46"
              height="42"
              viewBox="0 0 46 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.562 18.4609C30.0511 17.9392 29.4292 17.5392 28.7426 17.2907C28.0559 17.0422 27.3221 16.9516 26.5956 17.0256C25.8692 17.0996 25.1687 17.3362 24.5462 17.718C23.9237 18.0998 23.3952 18.6169 23 19.2309C22.6049 18.6167 22.0764 18.0995 21.4539 17.7176C20.8315 17.3357 20.1309 17.099 19.4044 17.025C18.6779 16.951 17.944 17.0417 17.2573 17.2903C16.5706 17.5389 15.9488 17.939 15.438 18.4609C14.5163 19.4035 14.0002 20.6695 14.0002 21.9879C14.0002 23.3063 14.5163 24.5722 15.438 25.5149L23 33.1999L30.564 25.5159C31.485 24.5726 32.0004 23.3064 32 21.988C31.9997 20.6696 31.4835 19.4037 30.562 18.4609Z"
                fill="#D4D4D8"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M41 41H5C3.93913 41 2.92172 40.5786 2.17157 39.8284C1.42143 39.0783 1 38.0609 1 37V1H17L22 9H45V37C45 38.0609 44.5786 39.0783 43.8284 39.8284C43.0783 40.5786 42.0609 41 41 41Z"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              User Login with JWT Authentication
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Provide a secure and convenient login experience using JWT (JSON
              Web Token) authentication, ensuring safe access and protecting
              user data.
            </p>
          </div>

          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <svg
              className="mx-auto"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 7C34.941 7 43 15.059 43 25C43 34.941 34.941 43 25 43C15.059 43 7 34.941 7 25"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 1C9.059 1 1 9.059 1 19H19V1Z"
                fill="#D4D4D8"
                stroke="#161616"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">
              Graduate Connect
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Join a vibrant community of graduates to network, share
              knowledge, collaborate on projects, and help each other grow
              professionally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;