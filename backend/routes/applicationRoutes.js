import express from "express";
import { 
  postApplication, 
  employerGetAllApplications, 
  jobseekerGetAllApplications 
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);

export default router;