import { useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./components/Signup/SignupPage";
import JobPage from "./components/JobPage/JobPage";
import ProfileSection from "./components/ViewProfile/Profile";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import OrgProfile from "./components/OrgProfile/OrgProfile";
import MyJobPage from "./components/MyJobs/MyJobPage";
import UpdateOrgProfile from "./components/UpdateOrgProfile/UpdateOrgProfile";
import JobList from "./components/JobList/JobList";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import AddJob from "./components/AddJob/AddJob";
import CreateProfile from "./components/UserProfile/createProfile";
import OrgJobList from "./components/OrgJobList/OrgJobList";
import JobandUser from "./components/JobandUser/JobandUser";
import OrgProfileSection from "./components/ViewOrgProfile/ViewOrgProfile";
import Features from "./components/Features/Features";
import RecommendedJobs from "./components/RecommendedJobs/RecommendedJobs";
import Error from "./components/Error/Error";
import UserInfoForm from "./components/UserInfoForm/UserInfoForm";
import ViewApplicants from "./components/ViewApplicants/ViewApplicants";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/job' element={<JobPage />} />
          <Route path='/myjobs' element={<MyJobPage />} />
          <Route path='/updateOrgProfile' element={<UpdateOrgProfile />} />
          <Route path='/jobList' element={<JobList />} />
          <Route path='/orgJobList' element={<OrgJobList />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/createProfile' element={<CreateProfile />} />
          <Route path='/updateProfile' element={<UpdateProfile />} />
          <Route path='/userProfile' element={<ProfileSection />} />
          <Route path='/viewOrgProfile' element={<OrgProfileSection />} />
          <Route path='/orgProfile' element={<OrgProfile />} />
          <Route path='/currentjobs' element={<JobPage />} />
          <Route path='/job/:id' element={<JobPage />} />
          <Route path='/addjob' element={<AddJob />} />
          <Route path='/recommendedJobs' element={<RecommendedJobs />} />
          <Route path='/form' element={<UserInfoForm />} />
          <Route path='*' element={<Error />} />
          <Route path='/recruit/:id' element={<ViewApplicants />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
