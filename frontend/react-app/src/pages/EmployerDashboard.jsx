// EmployerDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployerDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await axios.get("http://localhost:5000/api/applications");
    setApps(res.data); // res.data is array of { _id, jobId, email, status }
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`http://localhost:5000/api/applications/${id}`, { status });
    // Update local UI immediately
    setApps(prev => prev.map(a => (a._id === id ? { ...a, status } : a)));
  };

  return (
    <div>
      <h2>Employer Dashboard</h2>
      {apps.map(app => (
        <div key={app._id} style={{ border: "1px solid #ddd", padding: 12, margin: 8 }}>
          <h3>{app.jobId?.title}</h3>
          <p>{app.jobId?.company}</p>
          <p>Applicant: {app.email}</p>
          <p>Status: <strong>{app.status}</strong></p>

          <div style={{ marginTop: 8 }}>
            <button onClick={() => updateStatus(app._id, "shortlisted")}>Shortlist</button>
            <button onClick={() => updateStatus(app._id, "rejected")} style={{ marginLeft: 8 }}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

