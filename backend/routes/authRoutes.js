import express from "express";
const router = express.Router();

// Controllers import
import { register, login, forgotPassword } from "../controllers/authController.js";

// All routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

export default router;