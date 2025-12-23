import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/password/forgot", { email });
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error("User not found!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h2 className="text-4xl font-black mb-4">RESET PASSWORD</h2>
      <p className="text-gray-500 mb-8">Apna registered email dalo.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 border-2 rounded-2xl outline-none focus:border-blue-600" required />
        <button className="w-full bg-black text-white py-4 rounded-2xl font-bold">SEND RESET LINK</button>
        <div className="text-center"><Link to="/login" className="text-blue-600 underline">Back to Login</Link></div>
      </form>
    </div>
  );
};
export default ForgotPassword;