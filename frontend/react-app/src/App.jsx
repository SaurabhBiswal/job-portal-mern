import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";

export default function App() {
  const [role, setRole] = useState("jobseeker");
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  // 🔥 FETCH JOBS FROM BACKEND (IMPORTANT)
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🔥 POST JOB → MONGODB
  const addJob = async (job) => {
    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    const savedJob = await res.json();
    setJobs([savedJob, ...jobs]);
  };

  const applyJob = (job) => {
    if (appliedJobs.find((j) => j._id === job._id)) return;
    setAppliedJobs([...appliedJobs, job]);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())) &&
      (location ? job.location === location : true) &&
      (type ? job.type === type : true)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Job Portal</h1>

          <div className="bg-white border rounded-lg">
            <button
              onClick={() => setRole("jobseeker")}
              className={`px-4 py-2 ${
                role === "jobseeker" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Job Seeker
            </button>
            <button
              onClick={() => setRole("employer")}
              className={`px-4 py-2 ${
                role === "employer" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Employer
            </button>
          </div>
        </div>

        {role === "employer" && <PostJob addJob={addJob} />}

        {role === "jobseeker" && (
          <>
            <SearchBar search={search} setSearch={setSearch} />
            <Filters
              location={location}
              setLocation={setLocation}
              type={type}
              setType={setType}
            />

            <JobList
              jobs={filteredJobs}
              onApply={applyJob}
              appliedJobs={appliedJobs}
            />

            <h2 className="text-xl font-semibold mt-10 mb-4">
              Applied Jobs
            </h2>

            <JobList jobs={appliedJobs} hideApply />
          </>
        )}
      </div>
    </div>
  );
}













