import {React,useState} from "react";
import "./Home.css";
import animation from "/home-image.png";
import about from "/About.png";
import { NavLink } from "react-router-dom";
import avatarIcon from "./Profile-Image.png";

const Home = () => {
  const userType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("authToken");
  const testimonials = [
    {
      text: "Actify helped me find the perfect volunteering opportunity to use my skills for a good cause!",
      name: "Emily Thompson",
    },
    {
      text: "As an organization, we found dedicated volunteers quickly and easily. It’s an excellent platform!",
      name: "Michael Davis",
    },
    {
      text: "I love how Actify connects like-minded people for meaningful causes. Truly a game changer!",
      name: "Sarah Lee",
    },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prevIndex) => 
      (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };
  return (
    <main className="home-cont">
      <div className="flex my-5">
      <section className="content pt-20">
        <div className="title">Actify</div>
        <p className="desc text-2xl my-5">
          Discover meaningful service opportunities, connect with mission-driven organizations, and make a difference together!
        </p>
        <NavLink
          to={
            isLoggedIn
              ? userType === "user"
                ? "/jobList"
                : "/addjob"
              : "/signup"
          }
          style={{ textDecoration: "none" }}
        >
          {/*signup*/}
          <div className="signup-button">
            <button className="cta">
              <span className="span">
                {isLoggedIn
                  ? userType === "user"
                    ? "FIND OPPORTUNITIES"
                    : "POST OPPORTUNITIES"
                  : "SIGNUP"}
              </span>
              <span className="second">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 66 43"
                  height="20px"
                  width="50px"
                >
                  <g
                    fillRule="evenodd"
                    fill="none"
                    strokeWidth="1"
                    stroke="none"
                    id="arrow"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                      className="one"
                    ></path>
                    <path
                      fill="#FFFFFF"
                      d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                      className="two"
                    ></path>
                    <path
                      fill="#FFFFFF"
                      d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                      className="three"
                    ></path>
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </NavLink>
      </section>
      <section className="animation">
        <img src={animation} alt="" className="" />
      </section>
      </div>
      <div>
        <div className="flex">
          <section className="animation">
            <img src={about} alt="" className="" />
          </section>
          <div className="flex items-center ml-10">
          <section className="about-section">
            <h2 className="font-bold text-3xl">About Actify</h2>
            <p className="mt-3">
              Actify is your gateway to meaningful volunteer work, enabling you to contribute your time and skills to make a positive impact. Join our community of dedicated volunteers and mission-driven organizations!
            </p>
          </section>
          </div>
      </div>

      {/* Testimonials Section */}
      <div className="flex justify-between">
      <div className="flex items-center">
      <section className="about-section">
        <h1 className="font-bold text-3xl">
        Testimonials
        </h1>
        <p className="mt-3">
        Our community speaks for us! Read what our users have to say about their journeys with us. Their stories reflect the trust, quality, and connection we strive to foster with every service.
        </p>
      </section>
      </div>
      <section className="testimonials-section">
        <div className="testimonial-card">
          <button onClick={prevTestimonial} className="nav-button text-black mr-5 bg-white rounded-full px-5 py-2">&lt;</button>
          <div className="testimonial-content">
            <div className="quote-icon quote-start">“</div>
            <img src={avatarIcon} alt="Avatar" className="profileImage" />
            <p className="testimonial-text">{testimonials[testimonialIndex].text}</p>
            <p className="testimonial-name">{testimonials[testimonialIndex].name}</p>
            <div className="quote-icon quote-end">”</div>
          </div>
          <button onClick={nextTestimonial} className="nav-button text-black ml-5 bg-white rounded-full px-5 py-2">&gt;</button>
        </div>
      </section>
      </div>

      {/* FAQs Section */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="font-bold text-3xl">Frequently Asked Questions</h1>
      <section className="faq-section">
        <div className="faq-item">
          <h3>How do I sign up as a volunteer?</h3>
          <p>Simply click the "SIGNUP" button and follow the steps to create your profile.</p>
        </div>
        <div className="faq-item">
          <h3>Is there any fee to use the platform?</h3>
          <p>No, Actify is completely free for both volunteers and organizations.</p>
        </div>
        <div className="faq-item">
          <h3>How can organizations find volunteers?</h3>
          <p>Organizations can post their volunteer requirements, and suitable matches will be suggested based on skills and interests.</p>
        </div>
      </section>
      </div>
      </div>
    </main>
  );
};

export default Home;
