import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";;
import JobDetails from "./pages/JobDetails";
import RegisterSeeker from "./pages/RegisterSeeker";
import RegisterEmployer from "./pages/RegisterEmployer";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/seeker" element={<RegisterSeeker />} />
        <Route path="/register/employer" element={<RegisterEmployer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* ... baaki routes */}
      </Routes>
    </Router>
  );
}

export default App;
