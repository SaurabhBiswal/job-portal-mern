// MyApplications.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const email = localStorage.getItem("email"); // must store email on login

  useEffect(() => {
    if (!email) return;
    fetchMyApplications();
  }, [email]);

  const fetchMyApplications = async () => {
    const res = await axios.get(`http://localhost:5000/api/my-applications/${email}`);
    setApps(res.data); // each app has .jobId populated
  };

  return (
    <div>
      <h2>My Applications</h2>
      {apps.length === 0 && <p>No applications yet.</p>}
      {apps.map(app => (
        <div key={app._id} style={{ border: "1px solid #ddd", padding: 12, margin: 8 }}>
          <h3>{app.jobId?.title}</h3>
          <p>{app.jobId?.company}</p>
          <p>Status: <strong>{app.status}</strong></p>
        </div>
      ))}
    </div>
  );
}
