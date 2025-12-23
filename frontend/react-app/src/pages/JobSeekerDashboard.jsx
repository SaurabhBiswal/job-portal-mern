import { useEffect, useState } from "react";
import api from "../api/axios";
import ApplicationModal from "../components/ApplicationModal"; // Modal import kiya

export default function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null); // Modal open karne ke liye state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get("/job/getall");
        setJobs(data.jobs);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-900 border-b-4 border-blue-600 inline-block">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-2xl shadow-lg border-t-8 border-blue-600 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-bold">{job.title}</h3>
            <p className="text-blue-600 font-semibold mb-4">{job.category}</p>
            <p className="text-gray-600">📍 {job.location}, {job.city}</p>
            <p className="text-green-700 font-bold text-lg mt-2">💰 ₹{job.fixedSalary || `${job.salaryFrom}-${job.salaryTo}`}</p>
            <button 
              onClick={() => setSelectedJobId(job._id)} // Ab ye Modal kholega
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md"
            >
              Apply Now
            </button>
          </div>
        )) : <p className="text-xl text-gray-500 italic">No jobs found.</p>}
      </div>

      {/* Modal toggle logic */}
      {selectedJobId && (
        <ApplicationModal 
          jobId={selectedJobId} 
          onClose={() => setSelectedJobId(null)} 
        />
      )}
    </div>
  );
}