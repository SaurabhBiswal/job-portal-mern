import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/password/forgot", { email });
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error("User not found!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h2 className="text-4xl font-black mb-4 text-gray-800">FORGOT PASSWORD?</h2>
        <p className="mb-8 text-gray-500">Apna email dalo, hum link bhejenge.</p>
        <form onSubmit={handleForgot} className="space-y-4">
          <input type="email" placeholder="Registered Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 border-2 rounded-2xl outline-none focus:border-blue-600" required />
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold">SEND RESET LINK</button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;