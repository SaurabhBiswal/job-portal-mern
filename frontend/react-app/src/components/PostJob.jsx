import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "", description: "", category: "", country: "India", city: "", location: "", fixedSalary: ""
  });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/job/post", jobData);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-black mb-10 text-gray-800">Post a New Vacancy 📢</h1>
      <form onSubmit={handlePost} className="bg-white p-8 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Job Title" onChange={(e)=>setJobData({...jobData, title:e.target.value})} className="p-4 border rounded-xl" required />
        <select onChange={(e)=>setJobData({...jobData, category:e.target.value})} className="p-4 border rounded-xl" required>
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
        <input type="number" placeholder="Fixed Salary" onChange={(e)=>setJobData({...jobData, fixedSalary:e.target.value})} className="p-4 border rounded-xl" required />
        <input type="text" placeholder="City" onChange={(e)=>setJobData({...jobData, city:e.target.value})} className="p-4 border rounded-xl" required />
        <textarea placeholder="Job Description" onChange={(e)=>setJobData({...jobData, description:e.target.value})} className="col-span-full p-4 border rounded-xl h-32" required></textarea>
        <button className="col-span-full bg-blue-900 text-white py-4 rounded-xl font-bold text-xl hover:bg-black transition-all">Post Job Now</button>
      </form>
    </div>
  );
};
export default PostJob;