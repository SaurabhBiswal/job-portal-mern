import JobList from "./JobList";

export default function JobSeekerView({ jobs, applyJob, appliedJobs }) {
  return (
    <>
      <JobList jobs={jobs} applyJob={applyJob} />

      <h2 className="text-xl font-bold mt-10 mb-3">Applied Jobs</h2>

      {appliedJobs.length === 0 && (
        <p className="text-gray-500">No applied jobs yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-green-50 border p-4 rounded"
          >
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.company}</p>
            <p className="text-sm">
              {job.location} • {job.type}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
