import { useEffect, useState } from "react";
import {
  getJobs,
  applyJobAPI,
  getAppliedJobsAPI,
} from "../api";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const jobsData = await getJobs();
    setJobs(jobsData);

    const appliedData = await getAppliedJobsAPI();
    setAppliedJobs(appliedData);
  }

  async function handleApply(jobId) {
    try {
      await applyJobAPI(jobId);
      await loadAll(); // 🔥 refresh state
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Job Dashboard
      </h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            applied={appliedJobs.some(
              (a) => a.job._id === job._id
            )}
            onApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
}









