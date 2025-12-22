const Job = require("../models/Job");
const Application = require("../models/Application");

// GET employer's jobs with applicants count
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });
        return {
          ...job._doc,
          applicantsCount: count
        };
      })
    );

    res.status(200).json(jobsWithApplicants);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employer jobs" });
  }
};
