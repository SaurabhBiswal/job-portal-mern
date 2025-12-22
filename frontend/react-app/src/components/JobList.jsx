export default function JobList({
  jobs,
  onApply,
  appliedJobs = [],
  hideApply,
}) {
  if (jobs.length === 0)
    return (
      <div className="bg-white border rounded-xl p-8 text-center text-slate-500">
        No jobs found.
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => {
        const applied = appliedJobs.find(
          (j) => j.id === job.id
        );

        return (
          <div
            key={job.id}
            className="bg-white rounded-xl border shadow-sm p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {job.title}
                </h3>
                <p className="text-slate-600">
                  {job.company}
                </p>
              </div>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                {job.type}
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              📍 {job.location}
            </p>

            <p className="text-blue-600 font-medium mt-2">
              {job.salary}
            </p>

            {!hideApply && (
              <button
                disabled={applied}
                onClick={() => onApply(job)}
                className={`mt-4 w-full py-2 rounded-lg text-white ${
                  applied
                    ? "bg-gray-400"
                    : "bg-green-600"
                }`}
              >
                {applied ? "Applied" : "Apply"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}











