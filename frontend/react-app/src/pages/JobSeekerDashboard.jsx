import React from "react";
import { Link } from "react-router-dom";

const JobSeekerDashboard = ({ user }) => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name} 👋</h1>
        <p className="text-gray-500 mt-2">Manage your job search and applications.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Link to="/job/getall" className="p-6 bg-blue-600 text-white rounded-2xl shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-bold">🔍 Find New Jobs</h2>
            <p className="opacity-80">Browse latest listings from top companies.</p>
          </Link>

          <Link to="/my/applications" className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-bold text-blue-600">📑 My Applications</h2>
            <p className="text-gray-500">Track the status of your applied jobs.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;