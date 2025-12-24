import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

// Register
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) return next(new ErrorHandler("Email already registered!", 400));

  const user = await User.create({ name, email, phone, password, role });
  sendToken(user, 201, res, "Registered Successfully!");
});

// Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Email, password and role required!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid credentials!", 401));

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) return next(new ErrorHandler("Invalid credentials!", 401));

  if (user.role !== role) {
    return next(new ErrorHandler(`No user found with role ${role}!`, 404));
  }

  sendToken(user, 200, res, "Login Successful!");
});

// Forgot Password (demo)
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  // Real email baad mein add karenge (nodemailer)
  res.status(200).json({
    success: true,
    message: "Reset link sent to your email (demo mode)",
  });
});