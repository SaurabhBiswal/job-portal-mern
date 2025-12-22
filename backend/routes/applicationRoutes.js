const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const authMiddleware = require("../middlewares/authMiddleware");


/**
 * APPLY TO A JOB
 * POST /api/applications/:jobId
 */
router.post("/:jobId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const alreadyApplied = await Application.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = new Application({
      user: userId,
      job: jobId,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET MY APPLIED JOBS
 * GET /api/applications/me
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).populate("job");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


