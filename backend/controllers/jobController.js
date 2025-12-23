import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/Job.js";

// 1. GET ALL JOBS (With Search Filter)
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { search, location } = req.query;
  let query = { expired: false };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  
  const jobs = await Job.find(query);
  res.status(200).json({ success: true, jobs });
});

// 2. POST JOB (Employer Only)
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "employer") {
    return next(new ErrorHandler("Only Employers can post jobs!", 400));
  }
  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

  if (!title || !description || !category || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  const job = await Job.create({
    title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo,
    postedBy: req.user._id
  });
  res.status(201).json({ success: true, message: "Job Posted!", job });
});

// 3. DELETE JOB
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) return next(new ErrorHandler("Job not found!", 404));

  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job Deleted!" });
});