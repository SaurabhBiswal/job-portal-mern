import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [myApps, setMyApps] = useState([]);

  useEffect(() => {
    const fetchMyApps = async () => {
      try {
        const { data } = await api.get("/application/jobseeker/getall");
        setMyApps(data.applications);
      } catch (err) {
        toast.error("Error fetching applications");
      }
    };
    fetchMyApps();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">My Job Journey</h2>
      {myApps.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        myApps.map((app) => (
          <div key={app._id} className="border-l-4 border-blue-500 bg-white p-6 mb-4 shadow-sm rounded-r-xl">
             <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Application ID: {app._id}</h3>
                  <p className="text-gray-500">Applied on: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">Status: {app.status}</p>
                </div>
             </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyApplications;