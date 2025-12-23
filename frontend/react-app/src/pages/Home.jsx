import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT HALF: JOB SEEKER */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-12 text-center border-r-2 border-gray-100">
        <div className="text-6xl mb-6">👨‍💻</div>
        <h2 className="text-4xl font-black text-gray-800 mb-4">Job Seeker</h2>
        <p className="text-gray-500 mb-8 max-w-sm text-lg">
          Explore thousands of jobs, apply with one click and manage your career.
        </p>
        <div className="flex flex-col gap-4 w-64">
          <Link to="/login?role=jobseeker" className="bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
            Login as Seeker
          </Link>
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Create new account
          </Link>
        </div>
      </div>

      {/* RIGHT HALF: EMPLOYER */}
      <div className="flex-1 bg-gray-900 flex flex-col justify-center items-center p-12 text-center text-white">
        <div className="text-6xl mb-6">🏢</div>
        <h2 className="text-4xl font-black mb-4">Employer</h2>
        <p className="text-gray-400 mb-8 max-w-sm text-lg">
          Post your job requirements and hire the best talent from our community.
        </p>
        <div className="flex flex-col gap-4 w-64">
          <Link to="/login?role=employer" className="bg-white text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-200 transition">
            Login as Employer
          </Link>
          <Link to="/register" className="text-gray-400 font-bold hover:underline">
            Register Company
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;