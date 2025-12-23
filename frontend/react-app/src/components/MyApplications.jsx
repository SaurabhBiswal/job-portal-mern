import React, { useEffect, useState } from "react";
import api from "../api/axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get("/application/employer/getall");
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Applications Received</h1>
        {applications.length <= 0 ? (
          <h4 className="text-xl text-gray-500">No Applications Found!</h4>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((element) => (
              <div key={element._id} className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-600 hover:shadow-lg transition-all">
                <div className="space-y-3">
                  <p className="text-lg font-bold text-blue-800">Applicant: <span className="text-gray-700 font-medium">{element.name}</span></p>
                  <p className="text-gray-600"><strong>Email:</strong> {element.email}</p>
                  <p className="text-gray-600"><strong>Phone:</strong> {element.phone}</p>
                  <p className="text-gray-600"><strong>Address:</strong> {element.address}</p>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
                      Delete Application
                    </button>
                    {/* Yahan hum baad mein Resume download ka logic bhi daal sakte hain */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplications;