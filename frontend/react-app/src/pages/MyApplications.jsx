import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await api.get("/api/v1/application/jobseeker/getall");
        setApplications(data.applications);
      } catch (err) {
        toast.error("Failed to fetch applications");
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-8">My Applied Jobs</h1>
      <div className="grid gap-4">
        {applications.map((app) => (
          <div key={app._id} className="p-6 bg-white border rounded-2xl shadow flex justify-between">
            <div>
              <h3 className="font-bold text-xl">{app.jobId?.title || "Job Title"}</h3>
              <p className="text-gray-500">Status: {app.status}</p>
            </div>
            <span className="text-blue-900 font-bold">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;