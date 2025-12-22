export default function JobList({
  jobs,
  onApply,
  appliedJobs = [],
  hideApply = false,
}) {
  if (!jobs || jobs.length === 0) {
    return (
      <div style={{ padding: "20px", color: "gray" }}>
        No jobs found.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {jobs.map((job) => {
        const alreadyApplied = appliedJobs.some(
          (j) => j._id === job._id
        );

        return (
          <div
            key={job._id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "6px",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>
              {job.location} • {job.type}
            </p>
            <p>{job.salary}</p>

            {!hideApply && (
              <button
                onClick={() => onApply(job)}
                disabled={alreadyApplied}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: alreadyApplied
                    ? "gray"
                    : "green",
                  color: "white",
                  border: "none",
                  cursor: alreadyApplied
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {alreadyApplied ? "Applied" : "Apply"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}















