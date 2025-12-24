import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterSeeker from "./pages/RegisterSeeker";
import RegisterEmployer from "./pages/RegisterEmployer";
import ForgotPassword from "./pages/ForgotPassword";
import BrowseJobs from "./pages/BrowseJobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import PostJob from "./pages/PostJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import NotFound from "./pages/NotFound";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <NavBar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/seeker" element={<RegisterSeeker />} />
        <Route path="/register/employer" element={<RegisterEmployer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/jobs" element={<BrowseJobs />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Protected Routes - Role Based */}
        <Route
          path="/apply/:id"
          element={token && role === "jobseeker" ? <ApplyJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/applications/me"
          element={token && role === "jobseeker" ? <MyApplications /> : <Navigate to="/login" />}
        />
        <Route
          path="/post-job"
          element={token && role === "employer" ? <PostJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/employer/dashboard"
          element={token && role === "employer" ? <EmployerDashboard /> : <Navigate to="/login" />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;