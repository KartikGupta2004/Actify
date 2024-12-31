import { useEffect } from "react";
import LoginPage from "./components/Login/LoginPage";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SignupPage from "./components/Signup/SignupPage";
import JobPage from "./components/JobPage/JobPage";
import ViewProfileUser from "./components/ViewProfile/Profile";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CreateProfileOrg from "./components/OrgProfile/createProfile";
import MyJobPage from "./components/MyJobs/MyJobPage";
import UpdateProfileOrg from "./components/UpdateOrgProfile/UpdateOrgProfile";
import UsersJobList from "./components/JobList/JobList";
import UpdateProfileUser from "./components/UpdateProfile/UpdateProfile";
import AddJob from "./components/AddJob/AddJob";
import CreateProfileUser from "./components/UserProfile/createProfile";
import OrgsJobList from "./components/OrgJobList/OrgJobList";
import ViewProfileOrg from "./components/ViewOrgProfile/ViewOrgProfile";
import Features from "./components/Features/Features";
import RecommendedJobs from "./components/RecommendedJobs/RecommendedJobs";
import Error from "./components/Error/Error";
import UserInfoForm from "./components/UserInfoForm/UserInfoForm";
import ViewApplicants from "./components/ViewApplicants/ViewApplicants";
import UpdateJob from "./components/UpdateJob/UpdateJob";
import ViewProfileByOrg from "./components/ViewProfileByOrg/ViewProfileByOrg";
import AboutPage from "./components/About/About";
import ViewProfileByUser from "./components/ViewOrgProfileByUser/ViewOrgProfileByUser";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("userType");
  const authToken = localStorage.getItem("authToken");

  // Check authentication on initial load or reload
  useEffect(() => {
    const publicRoutes = ["/", "/signup", "/login", "/aboutUs", "/features"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!authToken || !userType) {
      if (!isPublicRoute) {
        navigate("/login"); // Redirect to login only if the user is trying to access a protected route
      }
    }
  }, [authToken, userType, location.pathname, navigate]);

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/aboutUs' element={<AboutPage />} />
          <Route path='/features' element={<Features />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Error />} />

          {/* VOLUNTEER */}
          <Route path='/myjobs' element={<MyJobPage />} />
          <Route path='/job/:id' element={<JobPage />} />

          {/* COMMON URL */}
          <Route path='/createProfile' element={userType==='user' ? <CreateProfileUser /> : <CreateProfileOrg />} />
          <Route path='/updateProfile' element={userType==='user' ? <UpdateProfileUser /> : <UpdateProfileOrg />} />
          <Route path='/viewProfile' element={userType==='user' ? <ViewProfileUser /> : <ViewProfileOrg />} />
          <Route path='/jobList' element={userType==='user' ? <UsersJobList /> : <OrgsJobList />} />
          <Route path='/view_profile/:id' element={userType==='user' ? <ViewProfileByUser /> : <ViewProfileByOrg />} />

          {/* ORG */}
          <Route path='/addjob' element={<AddJob />} />
          <Route path='/editJob/:jobId' element={<UpdateJob />} />
          <Route path='/recommendedJobs' element={<RecommendedJobs />} />
          <Route path='/form' element={<UserInfoForm />} />
          <Route path='/recruit/:id' element={<ViewApplicants />} />

        </Routes>
        <Footer />
    </>
  );
}

export default App;
