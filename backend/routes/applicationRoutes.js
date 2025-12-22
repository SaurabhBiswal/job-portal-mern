const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Application = require("../models/Application");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// APPLY JOB WITH RESUME
router.post("/apply", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF required" });
    }

    // Upload resume to Cloudinary (promise wrapper)
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "job_resumes",
          resource_type: "raw"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save application
    const application = await Application.create({
      job: req.body.jobId,
      applicant: req.user.id,
      resume: uploadResult.secure_url
    });

    res.status(201).json({
      message: "Applied successfully!",
      resumeUrl: uploadResult.secure_url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Upload failed",
      error: err.message
    });
  }
});

module.exports = router;

