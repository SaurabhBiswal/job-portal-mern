// JobSeekerDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("email"); // ensure this exists (set at login)

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    if (!email) {
      setError("You must be logged in (email missing).");
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      const [allJobsRes, appliedRes] = await Promise.all([
        axios.get("http://localhost:5000/api/jobs"),
        axios.get(`http://localhost:5000/api/jobs/applied/${encodeURIComponent(email)}`)
      ]);

      const allJobs = Array.isArray(allJobsRes.data) ? allJobsRes.data : [];
      const appliedJobs = Array.isArray(appliedRes.data) ? appliedRes.data : [];

      // appliedRes returns job objects (from server) — extract their _id
      const appliedIds = appliedJobs.map(j => String(j._id || j._id)); // safe cast

      const merged = allJobs.map(job => ({
        ...job,
        applied: appliedIds.includes(String(job._id))
      }));

      setJobs(merged);
    } catch (err) {
      console.error("fetchJobs error:", err);
      // if axios error you can examine err.response
      setError(err?.response?.data?.message || err.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    if (!email) {
      alert("You must be logged in to apply.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/apply`,
        { email }
      );

      // success -> update UI
      setJobs(prev =>
        prev.map(job =>
          job._id === jobId ? { ...job, applied: true } : job
        )
      );

      alert(res.data?.message || "Applied successfully");
    } catch (err) {
      console.error("applyJob error:", err);
      const msg = err?.response?.data?.message || err.message || "Apply failed";
      alert(msg);
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs found.</p>}

      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.type} | {job.salary}</p>
          <p>{job.description}</p>

          {job.applied ? (
            <button disabled style={{ background: "green", color: "white" }}>
              Applied ✅
            </button>
          ) : (
            <button onClick={() => applyJob(job._id)}>
              Apply Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

