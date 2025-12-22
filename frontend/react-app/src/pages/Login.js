import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async (role) => {
    try {
      setLoading(true);
      setMsg("");

      const res = await login(email, password);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", res.data.name);

      if (role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      setMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      {/* Employer */}
      <div style={card}>
        <h2>👨‍💼 Employer Login</h2>
        <p>Post jobs & manage applicants</p>

        <input
          placeholder="Employer Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => handleLogin("employer")} disabled={loading}>
          Employer Login
        </button>
      </div>

      {/* Job Seeker */}
      <div style={card}>
        <h2>👨‍🎓 Job Seeker Login</h2>
        <p>Search & apply for jobs</p>

        <input
          placeholder="Job Seeker Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => handleLogin("jobseeker")} disabled={loading}>
          Job Seeker Login
        </button>
      </div>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <p style={{ marginTop: "20px" }}>
        New user?{" "}
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Create an account
        </span>
      </p>
    </div>
  );
};

const container = {
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  marginTop: "80px",
};

const card = {
  width: "320px",
  padding: "20px",
  background: "white",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

export default Login;

