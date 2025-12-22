const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const seekerId = req.user.id;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const alreadyApplied = await Application.findOne({ jobId, seekerId });
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job!' });
    }

    const application = new Application({
      jobId,
      seekerId
    });

    await application.save();

    res.json({ success: true, message: 'Applied successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// NEW: Get applied jobs for current seeker
exports.getAppliedJobs = async (req, res) => {
  try {
    const seekerId = req.user.id;

    const applications = await Application.find({ seekerId })
      .populate('jobId')  // job details laayega
      .sort({ appliedAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load applied jobs' });
  }
};