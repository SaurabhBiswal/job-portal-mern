import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";
import {
  getJobs,
  saveJobs,
  getAppliedJobs,
  saveAppliedJobs,
} from "./utils/storage";

export default function App() {
  const [role, setRole] = useState("jobseeker");
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setJobs(getJobs());
    setAppliedJobs(getAppliedJobs());
  }, []);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    saveAppliedJobs(appliedJobs);
  }, [appliedJobs]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now() }]);
  };

  const applyJob = (job) => {
    if (appliedJobs.find((j) => j.id === job.id)) return;
    setAppliedJobs([...appliedJobs, job]);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        job.company
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (location ? job.location === location : true) &&
      (type ? job.type === type : true)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Job Portal
          </h1>

          <div className="bg-white border rounded-lg">
            <button
              onClick={() => setRole("jobseeker")}
              className={`px-4 py-2 ${
                role === "jobseeker"
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              Job Seeker
            </button>
            <button
              onClick={() => setRole("employer")}
              className={`px-4 py-2 ${
                role === "employer"
                  ? "bg-blue-600 text-white"
                  : ""
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












