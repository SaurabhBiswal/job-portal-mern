import { useState } from "react";

export default function PostJob({ addJob }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    salary: "",
    location: "Bangalore",
    type: "Full-time",
  });

  function submit(e) {
    e.preventDefault();

    if (!form.title || !form.company) return;

    addJob(form);

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
      onSubmit={submit}
      className="bg-white p-6 rounded shadow mb-8 max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Job Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Company"
        value={form.company}
        onChange={(e) =>
          setForm({ ...form, company: e.target.value })
        }
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm({ ...form, salary: e.target.value })
        }
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
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
}






