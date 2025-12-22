const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = new Application({
      job: jobId,
      applicant: userId,
    });

    await application.save();

    res.status(201).json({ message: "Job applied successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
