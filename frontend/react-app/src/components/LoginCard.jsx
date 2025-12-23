import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LoginCard({ role, title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
        role
      });

      localStorage.setItem("token", res.data.token);

      if (role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/dashboard");
      }
    } catch (e) {
      alert("Login failed");
      console.log(e?.response?.data || e.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-xl mb-4 text-center">{title}</h2>

      <input
        className="border w-full p-2 mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border w-full p-2 mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white w-full p-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
