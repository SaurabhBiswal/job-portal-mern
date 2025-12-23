import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/Job.js"; // Ye line ab match karegi

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "jobseeker") {
    return next(new ErrorHandler("Job Seeker not allowed to post jobs!", 400));
  }
  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});