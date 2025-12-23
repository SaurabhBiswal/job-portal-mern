import express from "express";
import { getAllJobs, postJob, deleteJob } from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs); // Public search
router.post("/post", isAuthenticated, postJob); // Employer only
router.delete("/delete/:id", isAuthenticated, deleteJob); // Employer only

export default router;
