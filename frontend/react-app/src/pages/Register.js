import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/api";

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...form, role });
      setMsg("Account created successfully. Please login.");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
      <h2>{role === "employer" ? "Employer" : "Job Seeker"} Registration</h2>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input placeholder="Full Name" required
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input type="email" placeholder="Email" required
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Password (min 6 chars)" minLength={6} required
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button type="submit">Create Account</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Register;


