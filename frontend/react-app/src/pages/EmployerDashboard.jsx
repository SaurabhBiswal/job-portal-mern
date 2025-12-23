import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get("/application/employer/getall");
        setApplications(data.applications);
        setLoading(false);
      } catch (err) {
        toast.error("Could not fetch applications");
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold">Loading Applications...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-black mb-10 text-gray-800">Applications Received</h1>
      
      {applications.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
          No applications received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{app.name}</h3>
                <p className="text-gray-600 mb-1"><strong>Applied For:</strong> {app.jobId?.title || "N/A"}</p>
                <p className="text-gray-600 mb-1"><strong>Email:</strong> {app.email}</p>
                <p className="text-gray-600 mb-1"><strong>Phone:</strong> {app.phone}</p>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <a 
                  href={app.resume.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-center bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
                >
                  View Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;;