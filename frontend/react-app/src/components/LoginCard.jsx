import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginCard({ role, title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // API call with lowercase role
      const res = await api.post("/user/login", { email, password, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); 
      localStorage.setItem("role", res.data.user.role);

      alert(res.data.message);

      // Final redirect logic using lowercase roles
      if (res.data.user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (e) {
      alert(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">{title}</h2>
      <input
        className="border w-full p-3 mb-4 rounded focus:outline-blue-500"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-3 mb-6 rounded focus:outline-blue-500"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full p-3 rounded transition duration-200"
        onClick={handleLogin}
      >
        Login as {role}
      </button>
    </div>
  );
}