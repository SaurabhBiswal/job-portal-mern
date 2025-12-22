import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterRole from "./pages/RegisterRole";
import JobsList from "./pages/JobsList";
import EmployerDashboard from "./pages/EmployerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Registration */}
        <Route path="/register" element={<RegisterRole />} />
        <Route path="/register/:role" element={<Register />} />

        {/* Dashboards */}
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


