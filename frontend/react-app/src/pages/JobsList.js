import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading jobs...</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Available Jobs</h1>

      {jobs.length === 0 && (
        <p style={{ textAlign: "center" }}>No jobs available</p>
      )}

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{job.title}</h3>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.jobType}</p>
          <p>{job.description}</p>

          {/* STEP 7 me yahan Apply button ka logic aayega */}
          <button
            style={{
              marginTop: "10px",
              padding: "10px 16px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
