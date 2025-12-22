export default function EmployerDashboard({ jobs, onDelete }) {
  if (jobs.length === 0)
    return <p className="text-gray-500">No jobs posted yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-4 rounded shadow"
        >
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.company}</p>
          <p className="text-sm">{job.location} • {job.type}</p>

          <button
            onClick={() => onDelete(job.id)}
            className="mt-3 bg-red-500 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
