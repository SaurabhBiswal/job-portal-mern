import { Routes, Route, Navigate } from "react-router-dom";

import EmployerLogin from "./pages/EmployerLogin";
import JobSeekerLogin from "./pages/JobSeekerLogin";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login/jobseeker" />} />

      {/* Login routes */}
      <Route path="/login/employer" element={<EmployerLogin />} />
      <Route path="/login/jobseeker" element={<JobSeekerLogin />} />

      {/* Dashboards */}
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobseeker/dashboard"
        element={
          <ProtectedRoute>
            <JobSeekerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login/jobseeker" />} />
    </Routes>
  );
}

export default App;


