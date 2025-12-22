import { useState } from "react";

export default function EmployerView({ addJob }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    salary: "",
    location: "Bangalore",
    type: "Full-time",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      ...form,
    };

    addJob(newJob);

    setForm({
      title: "",
      company: "",
      salary: "",
      location: "Bangalore",
      type: "Full-time",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Job Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        required
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Company Name"
        value={form.company}
        onChange={(e) =>
          setForm({ ...form, company: e.target.value })
        }
        required
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm({ ...form, salary: e.target.value })
        }
        required
      />

      <select
        className="w-full border p-2 mb-3"
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      >
        <option>Bangalore</option>
        <option>Hyderabad</option>
        <option>Remote</option>
      </select>

      <select
        className="w-full border p-2 mb-4"
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option>Full-time</option>
        <option>Internship</option>
        <option>Contract</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
}
