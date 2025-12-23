import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components & Layout
import Navbar from "./components/Navbar";


// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterSeeker from "./pages/RegisterSeeker";
import RegisterEmployer from "./pages/RegisterEmployer";
import ForgotPassword from "./pages/ForgotPassword";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob"; // Jo pages folder mein hai
import ApplyJob from "./pages/ApplyJob"; // Jo maine naya banwaya
import MyApplications from "./pages/MyApplications"; // Seeker dashboard
import EmployerDashboard from "./pages/EmployerDashboard"; // Recruiter dashboard
import NotFound from "./pages/NotFound"; // 404 page

function App() {
  const [user, setUser] = useState(null);

  // App load hote hi check karo ki user logged in hai ya nahi
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register/seeker" element={<RegisterSeeker />} />
        <Route path="/register/employer" element={<RegisterEmployer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Job Seeker Routes (Applied Jobs & Resume Section) */}
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/applications/me" element={<MyApplications />} />

        {/* Employer Routes (Job Posting & Seeing Resumes) */}
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />

        {/* Error Handling */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* <Footer /> */}
    </Router>
  );
}

export default App;