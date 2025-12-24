import express from "express";
const router = express.Router();

import { register, login, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Register & Login routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;