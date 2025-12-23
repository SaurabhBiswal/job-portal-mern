import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "employer") {
    return next(new ErrorHandler("Employer not allowed to apply for jobs!", 400));
  }

  const { name, email, phone, address, jobId } = req.body;

  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "employer",
  };

  const applicantID = {
    user: req.user._id,
    role: "jobseeker",
  };

  // Note: Abhi hum bina resume upload ke simple apply kar rahe hain
  const application = await Application.create({
    name, email, phone, address, applicantID, employerID,
    resume: { public_id: "dummy", url: "dummy_url" } 
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted Successfully!",
    application,
  });
});