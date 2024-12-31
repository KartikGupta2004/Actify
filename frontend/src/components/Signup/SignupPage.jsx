import { useState, React, useEffect } from "react";
import styles from "./SignupPage.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    name: "",
    email: "",
    role: "user",
  });
  const [serverError, setServerError] = useState("");
  const defaultPassword = import.meta.env.VITE_DEFAULT_PASSWORD;

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("user");
  // const [formError, setFormError] = useState("");
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [roleError, setRoleError] = useState(false);

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Google OAuth login logic
  useEffect(() => {
    // Load Google Identity Services (GIS) library
    const loadGsiScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        // console.log("Google Identity Services loaded successfully");
      };
      document.body.appendChild(script);
    };

    loadGsiScript();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear field error on change
    setServerError(""); // Clear server error
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Role is required";
    return newErrors;
  };

  const handleGoogleSignUpClick = () => {
    // Show the confirmation modal asking the user to confirm their role
    setIsModalOpen(true);
  };

  // Google OAuth login logic using the GIS library
  const handleConfirmRole = () => {
    setIsModalOpen(false);
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,  // Replace with your Google Client ID
      callback: (response) => {
        if (response.credential) {
          // console.log("Google Login Successful:", response);
          
          // Send the ID token to your backend for verification
          const data = {
            googleToken: response.credential,
            email: formData.email || response.email,  // Use email from response if not set
            name: formData.name || response.name,     // Use name from response if not set
            role : formData.role,
            authProvider: "google" // Default role can be set to "user"
          };

          try {
            // Send the data to the backend for registration or login
            axios.post("http://localhost:4000/api/v1/user/register", data)
              .then((res) => {
                // console.log(res.data)
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("userType", res.data.userType);
                navigate("/");
              })
              .catch((error) => {
                // console.error("Registration failed:", error);
                setErrors({ server: "Registration failed." });
              });
          } catch (error) {
            setErrors("Error during Google login:", error);
          }
        } else {
          setErrors("Google login did not return an id_token.");
        }
      }
    });

    window.google.accounts.id.prompt();  // Open the Google Sign-In prompt
  };

  const handleCancelRole = () => {
    // If the user clicks Cancel, just close the modal without doing anything
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    setErrors({});
    setServerError("");
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/register", {
        ...formData,
        authProvider: "email",
      });

      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userType", res.data.userType);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
    
      if (errorMessage.includes("Email already in use")) {
        setErrors((prev) => ({ ...prev, email: "Email already in use. Please use a different email." }));
      } else if (errorMessage.includes("Invalid email format")) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format. Please enter a valid email." }));
      } else if (errorMessage.includes("Password must contain")) {
        setErrors((prev) => ({ ...prev, password: errorMessage }));
      } else {
        setServerError(errorMessage);
      }
    }
    
  };

  return (
    <>
      <main className="flex flex-row bg-white h-screen"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit(); // Trigger the login function
        }
      }}
      tabIndex="0" // Makes the container focusable to detect key events
      >
        <section className="flex items-center justify-center w-1/3 h-full">
          <div className="flex items-center justify-center w-full h-full">
            <img className="object-contain max-w-full max-h-full" src="/5398259.jpg" alt="" />
          </div>
        </section>

        <section className="w-2/3 flex flex-col items-center pl-3">
          <h1 style={{ fontFamily: "monospace" }} className={`${styles.fontBold} h-auto text-3xl self-center text-black py-10`}>
            EVERY GREAT WORK BEGINS WITH A DREAM
          </h1>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUpClick}
            className={`${styles.oauthButton} my-5`}
          >
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
                <p>You have selected a {formData.role === 'user' ? "Volunteer" : "Organization"} role. Do you want to proceed with this role?</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleConfirmRole}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    OK
                  </button>
                  <button
                    onClick={handleCancelRole}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <span className="flex  text-gray-500 text-lg font-medium mb-5">
            Or Sign in with your e-mail
          </span>
          <hr className="mt-2 bg-gray-500" />
          {/* Name and Email Inputs */}
          <div className="flex flex-row justify-around p-6 w-full">
            <div className={styles.brutalistContainer}>
              <input
                name="name"
                placeholder="TYPE HERE"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <label className={styles.brutalistLabel}>NAME</label>
              {errors.name && <p className="text-red-500 my-3 font-bold text-lg">{errors.name}</p>}
            </div>
            <div className={styles.brutalistContainer}>
              <input
                name="email"
                placeholder="TYPE HERE"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label className={styles.brutalistLabel}>EMAIL</label>
              {errors.email && <p className="text-red-500 my-3 font-bold text-lg">{errors.email}</p>}
            </div>
          </div>

          {/* Role Select & Password Inputs */}
          <div className="flex flex-row justify-around p-6 w-full mt-5">
            <div className={styles.brutalistContainer}>
            <input
              name="password"
              placeholder="Enter Password"
              className={`${styles.brutalistInput} ${styles.smoothType}`}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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
          </div>
            <div className={styles.brutalistContainer} style={{ marginBottom: "20px" }}>
              <select
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                value={formData.role}
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
            </div>
          </div>

          <p style={{ fontFamily: "monospace", fontSize: "1.15rem" }} className="font-bold self-center pb-2">
            Already a user?
            <Link to="/login" style={{ color: "#372bb2" }} className="underline ml-3">
              LOGIN
            </Link>
          </p>

          {/* Submit Button */}
          <div className="flex items-center">
            <button
              style={{ fontFamily: "monospace" }}
              className="overflow-hidden w-32 p-2 mt-4 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
              onClick={handleSubmit}
            >
              SIGNUP
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
              <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                EXPLORE!
              </span>
            </button>
          </div>

          {/* Server Error Message */}
          {serverError  && <p className="text-red-500 my-3 font-bold text-lg mt-4">{serverError}</p>}
        </section>
      </main>
    </>
  );
}

export default SignupPage;
