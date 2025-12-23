import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary"; // Cloudinary import zaroori hai

// 1. Post Application (Job Seeker applies with REAL Resume)
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, address, jobId } = req.body;
  
  // Role Check
  if (req.user.role === "employer") {
    return next(new ErrorHandler("Employers can't apply for jobs!", 400));
  }

  // File Check (Jo Multer se aayegi)
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["application/pdf", "image/png", "image/jpeg"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload PDF or Image!", 400));
  }

  // Cloudinary Pe Upload (Asli Resume Logic)
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath, {
    folder: "JOB_PORTAL_RESUMES",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Error");
    return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) return next(new ErrorHandler("Job not found!", 404));

  // MongoDB Mein Entry (Asli URL ke saath)
  const application = await Application.create({
    name, email, phone, address,
    applicantID: { user: req.user._id, role: "jobseeker" },
    employerID: { user: jobDetails.postedBy, role: "employer" },
    jobId,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url, // Ye URL ab recruiter dekh payega
    }
  });

  res.status(200).json({ success: true, message: "Application Sent!" });
});

// 2. Employer View (Get all apps with populated Seeker & Job details)
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "employer") {
    return next(new ErrorHandler("Access denied!", 403));
  }
  // Populate use kar rahe hain taaki Recruiter ko Seeker ka naam aur Job title dikhe
  const applications = await Application.find({ "employerID.user": _id })
    .populate("jobId", "title") 
    .populate("applicantID.user", "name email");

  res.status(200).json({ success: true, applications });
});

// 3. Job Seeker View
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "jobseeker") {
    return next(new ErrorHandler("Access denied!", 403));
  }
  const applications = await Application.find({ "applicantID.user": _id });
  res.status(200).json({ success: true, applications });
});