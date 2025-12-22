const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Application = require('../models/Application'); // model bana lena
const { protect } = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Apply Route
router.post('/apply', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Resume PDF required' });

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'job_resumes', resource_type: 'raw' },
      (error, result) => { throw error || result; }
    ).end(req.file.buffer);

    const application = await Application.create({
      jobId: req.body.jobId,
      userId: req.user._id,
      resume: result.secure_url
    });

    res.status(201).json({ message: 'Applied successfully!', url: result.secure_url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
