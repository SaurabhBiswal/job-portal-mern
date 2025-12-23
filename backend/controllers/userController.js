import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

// 1. REGISTER
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full registration form!", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) return next(new ErrorHandler("Email already registered!", 400));
  
  const user = await User.create({ name, email, phone, password, role });
  sendToken(user, 201, res, "User Registered Successfully!");
});

// 2. LOGIN
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password and role.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email Or Password.", 400));

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) return next(new ErrorHandler("Invalid Email Or Password.", 400));

  if (user.role !== role.toLowerCase()) {
    return next(new ErrorHandler(`User with role ${role} not found!`, 404));
  }
  sendToken(user, 200, res, "User Logged In!");
});

// 3. LOGOUT
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.status(201).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Logged Out Successfully.",
  });
});

// 4. GET USER
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});