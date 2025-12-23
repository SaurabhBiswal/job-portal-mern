import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterSeeker = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/register", { ...formData, role: "jobseeker" });
      toast.success("Seeker Account Created!");
      navigate("/login?role=jobseeker");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleRegister} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border-t-8 border-blue-600">
        <h2 className="text-3xl font-black text-center mb-8">Join as <span className="text-blue-600">Seeker</span></h2>
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full p-4 border rounded-2xl outline-blue-500" required />
          <input type="email" placeholder="Email Address" onChange={(e)=>setFormData({...formData, email:e.target.value})} className="w-full p-4 border rounded-2xl outline-blue-500" required />
          <input type="number" placeholder="Phone Number" onChange={(e)=>setFormData({...formData, phone:e.target.value})} className="w-full p-4 border rounded-2xl outline-blue-500" required />
          <input type="password" placeholder="Password" onChange={(e)=>setFormData({...formData, password:e.target.value})} className="w-full p-4 border rounded-2xl outline-blue-500" required />
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition">Create Seeker Account</button>
        </div>
        <p className="mt-6 text-center">Already member? <Link to="/login" className="text-blue-600 font-bold">Login</Link></p>
      </form>
    </div>
  );
};
export default RegisterSeeker;