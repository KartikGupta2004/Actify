import { useState, React } from "react";
import styles from "./SignupPage.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {
          username: username,
          password: password,
          name: name,
          email: email,
          role: role,
        }
      );
      if (res.data.success) {
        console.log("Register Successfully!");
        alert("Register Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || "Validation failed.");
    }
  };
  return (
    <>
      <main className="flex flex-row bg-white h-screen">
        <section className="flex items-center justify-center w-1/3 h-full">
          <div className="flex items-center justify-center w-full h-full">
            <img
              className="object-contain max-w-full max-h-full"
              src="/5398259.jpg"
              alt=""
            />
          </div>
        </section>

        <section className="w-2/3 flex flex-col items-center pl-3">
          <h1
            style={{ fontFamily: "monospace" }}
            className={`${styles.fontBold} h-auto text-3xl self-center text-black py-10`}
          >
            EVERY GREAT WORK BEGINS WITH A DREAM
          </h1>
          <div className="flex flex-row justify-around p-6 w-full">
            <div className={styles.brutalistContainer}>
              <input
                placeholder="TYPE HERE"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className={styles.brutalistLabel}>NAME</label>
            </div>
            <div className={styles.brutalistContainer}>
              <input
                placeholder="TYPE HERE"
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className={styles.brutalistLabel}>EMAIL</label>
            </div>
          </div>
          <div className="flex flex-row justify-around p-6 w-full">
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
              <label className={styles.brutalistLabel}>USERNAME</label>
            </div>
            <div>
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
            </div>
          </div>
          <div className="flex flex-row justify-around p-6 w-full">
            <div
              className={styles.brutalistContainer}
              style={{ marginBottom: "20px" }}
            >
              <select
                className={`${styles.brutalistInput} ${styles.smoothType}`}
                value={role}
                onChange={(e) => {
                  console.log(e.target.value);
                  setRole(e.target.value);
                }}
              >
                <option value="" disabled>
                  SELECT ROLE
                </option>
                <option value="user">User</option>
                <option value="org">Organization</option>
              </select>
              <label className={styles.brutalistLabel}>ROLE</label>
            </div>
          </div>
          <p
            style={{ fontFamily: "monospace", fontSize: "1.15rem" }}
            className="font-bold self-center pb-2"
          >
            Already a user?
            <Link
              to="/login"
              style={{ color: "#372bb2" }}
              className="underline ml-3"
            >
              LOGIN
            </Link>
          </p>
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
        </section>
      </main>
    </>
  );
}

export default SignupPage;
