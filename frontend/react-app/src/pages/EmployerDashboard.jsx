import React, { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    title: "", description: "", location: "", salary: ""
  });

  useEffect(() => {
    fetchMyJobs();
    fetchApplications();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const { data } = await api.get("/job/getall"); // Tere backend ke hisaab se
      setJobs(data.jobs || []);
    } catch (err) {
      toast.error("Failed to load jobs");
    }
  };

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/application/employer/getall");
      setApplications(data.applications || []);
    } catch (err) {
      toast.error("Failed to load applications");
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await api.post("/job/post", formData);
      toast.success("Job posted successfully!");
      setFormData({ title: "", description: "", location: "", salary: "" });
      fetchMyJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Job post failed");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Employer Dashboard</h1>

      {/* Post New Job Form */}
      <div className="bg-white p-8 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-6">Post New Job</h2>
        <form onSubmit={handlePostJob} className="space-y-4">
          <input type="text" placeholder="Job Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded" required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded" required />
          <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-3 border rounded" required />
          <input type="text" placeholder="Salary" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} className="w-full p-3 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold">Post Job</button>
        </form>
      </div>

      {/* My Posted Jobs */}
      <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {jobs.map(job => (
          <div key={job._id} className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-600">{job.location} - {job.salary}</p>
          </div>
        ))}
      </div>

      {/* Received Applications */}
      <h2 className="text-2xl font-bold mb-4">Received Applications</h2>
      <div className="grid gap-6">
        {applications.map(app => (
          <div key={app._id} className="bg-white p-6 rounded-2xl shadow flex justify-between">
            <div>
              <h3 className="text-xl font-bold">{app.name}</h3>
              <p className="text-gray-600">Email: {app.email}</p>
              <p className="text-gray-600">Phone: {app.phone}</p>
            </div>
            <a href={app.resume.url} target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded">View Resume</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;