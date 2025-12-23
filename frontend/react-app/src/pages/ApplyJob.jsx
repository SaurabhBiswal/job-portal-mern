import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const ApplyJob = () => {
  const { id } = useParams(); // URL se Job ID uthayega
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [resume, setResume] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Please upload your resume!");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("jobId", id);
    data.append("resume", resume); // Multer/FileUpload isko pakdega

    try {
      const res = await api.post("/api/v1/application/post", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed!");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Apply Now</h1>
      <form onSubmit={handleApply} className="space-y-4">
        <input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-xl" required />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded-xl" required />
        <input type="number" placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-xl" required />
        <textarea placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded-xl h-24" required></textarea>
        <input type="file" accept=".pdf, .png, .jpg" onChange={e => setResume(e.target.files[0])} className="w-full p-2" required />
        <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold">Submit</button>
      </form>
    </div>
  );
};

export default ApplyJob;