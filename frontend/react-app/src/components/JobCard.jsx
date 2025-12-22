export default function JobCard({ job, applied, onApply }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-600">{job.company}</p>

        <div className="flex gap-3 mt-2 text-sm text-gray-500">
          <span>{job.location}</span>
          <span>•</span>
          <span>{job.type}</span>
        </div>

        <p className="mt-2 font-medium text-gray-700">₹ {job.salary}</p>
      </div>

      <button
        disabled={applied}
        onClick={() => onApply(job._id)}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          applied
            ? "bg-gray-300 cursor-not-allowed text-gray-700"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {applied ? "Applied ✔️" : "Apply"}
      </button>
    </div>
  );
}
