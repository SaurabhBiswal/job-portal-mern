import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import EmployerDashboard from "./pages/EmployerDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/employer-dashboard" element={<EmployerDashboard />} />
    </Routes>
  );
}


