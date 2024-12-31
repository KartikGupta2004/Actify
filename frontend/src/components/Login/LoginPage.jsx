import { useState, React, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("user");
  const [roleError, setRoleError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGsiScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      document.body.appendChild(script);
    };
    loadGsiScript();
  }, []);

  const handleGoogleSignUpClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmRole = () => {
    setIsModalOpen(false);

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (response.credential) {
          const data = {
            googleToken: response.credential,
            email: email || response.email,
            name: response.name,
            username: email || response.email,
            role: role,
            authProvider: "google",
          };

          try {
            axios
              .post("http://localhost:4000/api/v1/user/signin", data)
              .then((res) => {
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("userType", res.data.userType);
                navigate("/");
              })
              .catch((error) => {
                setErrors({ server: "Registration failed." });
              });
          } catch (error) {
            console.error("Error during Google login:", error);
          }
        } else {
          console.log("Google login did not return an id_token.");
        }
      },
    });

    window.google.accounts.id.prompt();
    setIsModalOpen(false);
  };

  const handleCancelRole = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    setErrors({});
    setPasswordError(false);
    setEmailError(false);
    setRoleError(false);
    let formErrors = {};
    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";
    if (!role) formErrors.role = "Role is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/signin", {
        password,
        email,
        role,
        authProvider: "email",
      });
      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userType", res.data.userType);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";

      if (errorMessage === "Invalid Password") {
        setPasswordError(true);
      } else if (errorMessage === "Invalid Email") {
        setEmailError(true);
      } else if (errorMessage === "Invalid Role") {
        setRoleError(true);
      } else if (errorMessage === "User not found") {
        setFormError("No user found with this email. Please sign up.");
      } 
      // else {
      //   setErrors({ general: errorMessage });
      // }
    }
  };

  return (
    <>
    {/* Why tabIndex="0" is Required?
      By default, a div or main tag is not focusable and does not receive keyboard events. Adding tabIndex="0" makes it focusable so that it can detect onKeyDown events. */}
      
      <main className="flex flex-row bg-white w-full justify-center items-center"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit(); // Trigger the login function
        }
      }}
      tabIndex="0" // Makes the container focusable to detect key events
      >
        <section className="w-fit flex flex-col items-center pl-3">
          <h1
            style={{ fontFamily: "monospace" }}
            className={`${styles.fontBold} h-auto text-2xl self-center font-bold text-black pl-10 py-10`}
          >
            EVERY GREAT WORK BEGINS WITH A DREAM
          </h1>
          <button onClick={handleGoogleSignUpClick} className={styles.oauthButton}>
      <svg className={styles.icon} viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
      </svg>
      Continue with Google
    </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Confirm Role</h2>
                <p>
                  You have selected a {role === "user" ? "Volunteer" : "Organization"} role. Do you want to proceed with
                  this role?
                </p>
                <div className="mt-4 flex justify-between">
                  <button onClick={handleConfirmRole} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    OK
                  </button>
                  <button onClick={handleCancelRole} className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <span className="flex  text-gray-500 text-lg font-medium">
            Or Sign in with your e-mail
          </span>
          <hr className="mt-2 bg-gray-500" />

          <div className="flex flex-col p-10 pb-3 justify-stretch">
            <div className={styles.brutalistContainer}>
              <input
                placeholder="Enter Email"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className={styles.brutalistLabel}>EMAIL</label>
              {errors.email && <p className="text-red-500 my-3 font-bold text-lg">{errors.email}</p>}
              {emailError && <p className="text-red-500 my-3 font-bold text-lg">Invalid Email</p>}
            </div>
            <div className={styles.brutalistContainer}>
            <input
              placeholder="Enter Password"
              className={`${styles.brutalistInput} ${styles.smoothType}`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label className={styles.brutalistLabel}>PASSWORD</label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <IoMdEye className="w-6 h-6 mt-2" />
              ) : (
                <IoMdEyeOff className="w-6 h-6 mt-2" />
              )}
            </button>
            {errors.password && <p className="text-red-500 my-3 font-bold text-lg">{errors.password}</p>}
            {passwordError && <p className="text-red-500 my-3 font-bold text-lg">Invalid Password</p>}
          </div>

            <div className={styles.brutalistContainer} style={{ marginBottom: "20px" }}>
              <select
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  SELECT ROLE
                </option>
                <option value="user">Volunteer</option>
                <option value="org">Organization</option>
              </select>
              <label className={styles.brutalistLabel}>ROLE</label>
              {errors.role && <p className="text-red-500 my-3 font-bold text-lg">{errors.role}</p>}
              {roleError && <p className="text-red-500 my-3 font-bold text-lg">Invalid Role</p>}
            </div>

            <p style={{ fontFamily: "monospace", fontSize: "1.15rem" }} className="font-bold self-center">
              New user?
              <Link to="/signup" style={{ color: "#372bb2" }} className="underline ml-3">
                SIGNUP
              </Link>
            </p>
          </div>

          {/* Dynamic error handling */}
          {formError && <p className="ml-3 text-lg mb-2 text-red-500 font-bold">{formError}</p>}

          {errors.general && (
            <p className="ml-3 text-lg mb-2 text-red-500 font-bold">{errors.general}</p>
          )}

          {/* {Object.keys(errors).map((key) =>
            key !== "general" ? (
              <p key={key} className="ml-3 text-lg mb-2 text-red-500 font-bold">
                {errors[key]}
              </p>
            ) : null
          )} */}

<div className="flex items-center">
            <button
              style={{ fontFamily: "monospace" }}
              className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
              onClick={handleSubmit}
            >
              LOGIN
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
              <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                EXPLORE!
              </span>
            </button>
          </div>
        </section>
        <section className="hidden xl:flex items-center">
          <img className="object-contain h-screen" src="/3682888.jpg" alt="" />
        </section>
      </main>
    </>
  );
}

export default LoginPage;
