import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  // Wahi 4 fields jo tere HTML mein thi
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    
    try {
      // Fetch ki jagah axios/api instance
      const { data } = await api.post(
        "/api/v1/job/post", 
        { title, description, location, salary }, 
        { withCredentials: true } // Token handle karne ke liye
      );

      toast.success("Job created successfully");
      navigate("/employer/dashboard"); // window.location.href ka React version
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Job</h2>

        <form onSubmit={handlePost} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition duration-300"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;