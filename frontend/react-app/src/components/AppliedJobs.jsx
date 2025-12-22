export default function AppliedJobs({ jobs }) {
  if (jobs.length === 0) {
    return (
      <p className="text-gray-500">
        No applied jobs yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-green-50 border border-green-200 p-4 rounded"
        >
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-sm">{job.company}</p>
          <p className="text-xs text-gray-600">
            {job.location} • {job.type}
          </p>
        </div>
      ))}
    </div>
  );
}
