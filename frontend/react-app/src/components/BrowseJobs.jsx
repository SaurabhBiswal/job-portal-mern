import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const { data } = await api.get(`/job/getall?search=${search}`);
      setJobs(data.jobs);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search]); // Jab bhi search type karoge, list update hogi

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🔍 Explore Opportunities</h2>
      
      <input 
        type="text" 
        placeholder="Search jobs by title (e.g. React Developer)..." 
        className="w-full p-4 mb-8 border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job._id} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-blue-600 font-medium mb-2">{job.category}</p>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>
            <Link to={`/job/${job._id}`} className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseJobs;