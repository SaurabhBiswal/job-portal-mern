import React, { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const Login = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get("role") || "jobseeker";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/user/login", { email, password, role: roleFromUrl });
      toast.success(data.message);
      setUser(data.user);
      navigate(data.user.role === "employer" ? "/employer/dashboard" : "/jobseeker/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-center mb-2 uppercase tracking-tight">Login</h2>
        <p className="text-center text-gray-400 mb-8 font-medium">Logging in as <span className="text-blue-600 font-bold uppercase">{roleFromUrl}</span></p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" placeholder="Email Address" className="w-full p-4 border rounded-xl outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-4 border rounded-xl outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <div className="text-right">
            <Link to="/forgot-password" title="Reset Password" className="text-sm font-bold text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;