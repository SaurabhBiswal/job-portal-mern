import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get("/application/employer/getall");
        setApplications(data.applications);
      } catch (err) {
        toast.error("Failed to load applications");
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Received Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">No one has applied yet.</p>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold text-blue-600">{app.name}</h4>
                <p className="text-gray-600">Email: {app.email}</p>
                <p className="text-gray-600">Phone: {app.phone}</p>
                <p className="mt-2 text-sm text-gray-400">Applied for Job ID: {app.jobId}</p>
              </div>
              <div className="flex flex-col gap-2">
                <a 
                  href={app.resume.url} 
                  target="_blank" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center hover:bg-black transition"
                >
                  View Resume
                </a>
                <span className="text-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerApplications;