import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/job/getall").then((res) => setJobs(res.data.jobs)).catch(() => toast.error("Jobs load nahi hui!"));
  }, []);

  // Filter Logic
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) && 
    (filter === "" || job.category === filter)
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-gray-900">BROWSE ALL JOBS</h1>
        
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input 
            type="text" placeholder="Search job title..." 
            className="flex-1 p-4 rounded-2xl border-none shadow-md outline-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="p-4 rounded-2xl border-none shadow-md outline-blue-500 font-bold"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">Mobile Development</option>
            <option value="Graphics & Design">Graphics & Design</option>
          </select>
        </div>

        {/* Job Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-[30px] shadow-lg border hover:scale-105 transition-all">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{job.category}</span>
              <h3 className="text-xl font-black mt-2 mb-4">{job.title}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">{job.description}</p>
              <Link to={`/job/${job._id}`} className="block text-center bg-black text-white py-3 rounded-xl font-bold">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BrowseJobs;