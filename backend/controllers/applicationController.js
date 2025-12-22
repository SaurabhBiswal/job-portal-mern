const Application = require('../models/Application');
const Job = require('../models/Job');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
});

exports.uploadResume = upload.single('resume');

exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const seekerId = req.user.id;
    const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;

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
      seekerId,
      resume: resumePath
    });

    await application.save();

    res.json({ success: true, message: 'Applied successfully with resume!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const seekerId = req.user.id;

    const applications = await Application.find({ seekerId })
      .populate('jobId')
      .sort({ appliedAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load applied jobs' });
  }
};