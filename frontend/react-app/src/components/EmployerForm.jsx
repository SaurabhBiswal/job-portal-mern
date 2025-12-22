import { useState } from "react";

export default function EmployerForm({ setJobs }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [type, setType] = useState("Full-time");

  const handleSubmit = (e) => {
    e.preventDefault();

    setJobs((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        company,
        salary,
        location,
        type,
      },
    ]);

    setTitle("");
    setCompany("");
    setSalary("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-3xl"
    >
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <select
        className="w-full mb-3 p-2 border rounded"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option>Bangalore</option>
        <option>Hyderabad</option>
        <option>Remote</option>
      </select>

      <select
        className="w-full mb-4 p-2 border rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Full-time</option>
        <option>Internship</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
}
