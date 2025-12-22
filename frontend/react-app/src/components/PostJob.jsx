import { useState } from "react";

export default function PostJob({ addJob }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    salary: "",
    location: "Bangalore",
    type: "Full-time",
  });

  const submit = () => {
    if (!form.title || !form.company) return;
    addJob(form);
    setForm({ ...form, title: "", company: "", salary: "" });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Post a Job</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["title", "company", "salary"].map((f) => (
          <input
            key={f}
            placeholder={f.toUpperCase()}
            value={form[f]}
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
            className="p-3 border rounded-lg"
          />
        ))}

        <select
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="p-3 border rounded-lg"
        >
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Remote</option>
        </select>

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="p-3 border rounded-lg"
        >
          <option>Full-time</option>
          <option>Internship</option>
        </select>
      </div>

      <button
        onClick={submit}
        className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Post Job
      </button>
    </div>
  );
}





