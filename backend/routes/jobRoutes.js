const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// POST a job
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  const savedJob = await job.save();
  res.json(savedJob);
});

module.exports = router;


