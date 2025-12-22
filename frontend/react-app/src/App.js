import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import JobList from './pages/JobList';
import AppliedJobs from './pages/AppliedJobs';
import EmployerDashboard from './pages/EmployerDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;