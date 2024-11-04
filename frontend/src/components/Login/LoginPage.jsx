import { useState, React } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/signin", {
        username: username,
        password: password,
      });

      if (res.data.success) {
        // Store token and user type in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", res.data.userType); // Store the user type received from the server

        console.log("Login successful");
        alert(" Login successful");
        navigate("/"); // Redirect to the appropriate page (e.g., home or dashboard)
      }
    } catch (error) {
      console.log("An error occurred:", error);
      alert(error.response.data.message || "Login failed.");
      // Handle unexpected errors (e.g., show error message)
    }
  };
  return (
    <>
      <main className="flex flex-row bg-white w-full justify-center items-center">
        <section className="w-fit flex flex-col items-center pl-3">
          <h1
            style={{ fontFamily: "monospace" }}
            className={`${styles.fontBold} h-auto text-2xl self-center font-bold text-black pl-10 py-10`}
          >
            EVERY GREAT WORK BEGINS WITH A DREAM
          </h1>
          <div className="flex flex-col p-10 justify-stretch">
            <div className={styles.brutalistContainer}>
              <input
                placeholder="TYPE HERE"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label className={styles.brutalistLabel}>NAME</label>
            </div>
            <div className={styles.brutalistContainer}>
              <input
                placeholder="TYPE HERE"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className={styles.brutalistLabel}>PASSWORD</label>
            </div>
            <p
              style={{ fontFamily: "monospace", fontSize: "1.15rem" }}
              className="font-bold self-center"
            >
              New user?
              <Link
                to="/signup"
                style={{ color: "#372bb2" }}
                className="underline ml-3"
              >
                SIGNUP
              </Link>
            </p>
          </div>
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
