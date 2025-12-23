import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const PostJob = () => {
  const [job, setJob] = useState({ title: "", description: "", category: "Web Development", country: "India", city: "", location: "", fixedSalary: "" });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await api.post("/job/post", job);
      toast.success("Job Posted Successfully! 🚀");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unauthorized - Login as Employer");
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Post New Vacancy</h1>
      <form onSubmit={handlePost} className="grid grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-lg border">
        <input type="text" placeholder="Job Title" onChange={(e)=>setJob({...job, title:e.target.value})} className="p-4 border rounded-xl" required />
        <input type="number" placeholder="Salary" onChange={(e)=>setJob({...job, fixedSalary:e.target.value})} className="p-4 border rounded-xl" required />
        <input type="text" placeholder="City" onChange={(e)=>setJob({...job, city:e.target.value})} className="p-4 border rounded-xl" required />
        <input type="text" placeholder="Exact Location" onChange={(e)=>setJob({...job, location:e.target.value})} className="p-4 border rounded-xl" required />
        <textarea placeholder="Job Description" onChange={(e)=>setJob({...job, description:e.target.value})} className="col-span-2 p-4 border rounded-xl h-32" required></textarea>
        <button className="col-span-2 bg-blue-900 text-white py-4 rounded-xl font-bold hover:scale-105 transition">Post Job</button>
      </form>
    </div>
  );
};
export default PostJob;