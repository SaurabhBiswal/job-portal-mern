import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: ""
  });
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Upload resume PDF!");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("jobId", id);
    data.append("resume", resume);

    try {
      const res = await api.post("/api/v1/application/post", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      navigate("/jobs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Apply failed!");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Apply for Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded" required />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded" required />
        <input type="tel" placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded" required />
        <textarea placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded h-24" required />
        <input type="file" accept=".pdf" onChange={e => setResume(e.target.files[0])} className="w-full p-2" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;