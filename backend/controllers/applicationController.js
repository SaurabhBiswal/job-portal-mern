import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// 1. Post Application (Job Seeker applies for a job)
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, address, jobId } = req.body;
  if (req.user.role === "employer") {
    return next(new ErrorHandler("Employers can't apply for jobs!", 400));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) return next(new ErrorHandler("Job not found!", 404));

  const application = await Application.create({
    name, email, phone, address,
    applicantID: { user: req.user._id, role: "jobseeker" },
    employerID: { user: jobDetails.postedBy, role: "employer" },
    jobId,
    resume: { public_id: "dummy", url: "https://example.com/resume.pdf" } 
  });

  res.status(200).json({ success: true, message: "Application Sent!" });
});

// 2. Employer View (Get all apps for their jobs)
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "employer") {
    return next(new ErrorHandler("Access denied!", 403));
  }
  const applications = await Application.find({ "employerID.user": _id });
  res.status(200).json({ success: true, applications });
});

// 3. Job Seeker View (Get all jobs they applied for)
// Iska naam dhyan se dekhna, yahi error de raha tha
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "jobseeker") {
    return next(new ErrorHandler("Access denied!", 403));
  }
  const applications = await Application.find({ "applicantID.user": _id });
  res.status(200).json({ success: true, applications });
});