import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// APPLY to a job
router.post("/", async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const exists = await Application.findOne({ jobId, userId });
    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const app = new Application({ jobId, userId });
    await app.save();

    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: "Apply failed" });
  }
});

export default router;
