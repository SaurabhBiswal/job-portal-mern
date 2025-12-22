const express = require("express");
const router = express.Router();
const { authMiddleware, isEmployer } = require("../middlewares/authMiddleware");
const { getEmployerJobs } = require("../controllers/jobController");

router.get("/employer", authMiddleware, isEmployer, getEmployerJobs);

module.exports = router;



