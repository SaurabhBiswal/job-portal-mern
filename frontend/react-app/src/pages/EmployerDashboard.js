import React, { useEffect, useState } from "react";
import { getEmployerJobs } from "../services/api";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getEmployerJobs()
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Employer Dashboard</h1>

      {jobs.length === 0 && <p>No jobs posted yet</p>}

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px"
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>Applicants: {job.applicantsCount}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployerDashboard;
