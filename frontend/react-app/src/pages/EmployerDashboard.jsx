import React from "react";
import { Link } from "react-router-dom";

const EmployerDashboard = ({ user }) => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Employer Portal 🏢</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <Link to="/job/post" className="p-10 bg-blue-900 text-white rounded-3xl shadow-2xl hover:bg-black transition-all group">
          <h2 className="text-2xl font-bold">Post a New Job</h2>
          <p className="mt-2 opacity-70">Create listings to find best talent.</p>
          <div className="mt-6 font-black group-hover:translate-x-2 transition-transform">GO →</div>
        </Link>

        <Link to="/employer/applications" className="p-10 bg-white border-2 border-gray-100 rounded-3xl shadow-xl hover:border-blue-500 transition-all group">
          <h2 className="text-2xl font-bold text-blue-900">View Applications</h2>
          <p className="mt-2 text-gray-400">Manage candidates who applied for your jobs.</p>
          <div className="mt-6 font-black text-blue-900 group-hover:translate-x-2 transition-transform">GO →</div>
        </Link>

      </div>
    </div>
  );
};
export default EmployerDashboard;