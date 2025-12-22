const express = require('express');
const router = express.Router();
const { applyJob, getAppliedJobs } = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply to job
router.post('/apply', authMiddleware, applyJob);

// Get my applied jobs
router.get('/my-applications', authMiddleware, getAppliedJobs);

module.exports = router;

