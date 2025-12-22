import { useState } from "react";
import axios from "axios";

export default function Register({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Registered. Now login.");
    setPage("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl w-[360px] shadow">
        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input className="input" placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="input" type="password" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})} />

        <select className="input"
          onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button onClick={register} className="btn">Register</button>
      </div>
    </div>
  );
}
