import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Engineers Depot Style */}
      <section className="hero-gradient min-h-[85vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-[#0a192f]">
        <h1 className="text-5xl md:text-7xl font-black text-white max-w-4xl leading-[1.1]">
          Find Your <span className="text-orange-500">Dream</span> Tech Job Today
        </h1>
        <p className="text-gray-400 mt-6 text-lg max-w-2xl">
          Direct recruitment for engineers. No hidden steps, just direct applications.
        </p>

        {/* Search Bar - No fixed categories, just input */}
        <div className="mt-12 bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 w-full max-w-4xl">
          <div className="flex items-center gap-3 px-4 flex-1 border-r border-gray-100">
            <FiSearch className="text-orange-500 text-xl" />
            <input type="text" placeholder="Search by Job Title..." className="w-full py-4 outline-none text-slate-800 font-medium" />
          </div>
          <div className="flex items-center gap-3 px-4 flex-1">
            <FiMapPin className="text-orange-500 text-xl" />
            <input type="text" placeholder="Location..." className="w-full py-4 outline-none text-slate-800 font-medium" />
          </div>
          <button className="bg-[#0a192f] text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-500 transition-all duration-300">
            Search
          </button>
        </div>
      </section>

      {/* Latest Jobs Section (Isme Jobs Backend se aayengi, hardcoded nahi) */}
      <section className="py-20 px-8 bg-white text-center">
        <h2 className="text-3xl font-black text-[#0a192f]">Latest Job Openings</h2>
        <p className="text-gray-500 mb-10">Real-time updates from employers</p>
        <div className="max-w-7xl mx-auto flex justify-center">
             <Link to="/jobs" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition">Browse All Jobs</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;