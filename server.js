// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");

const app = express();
const PORT = 3000;
const SECRET_KEY = "mysecretkey"; // Secret key for JWT

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Fake database (in-memory)
let users = [];
let applications = [];
let profiles = {};
let jobs = [];
let jobIdCounter = 1;

// Home Route
app.get('/', (req, res) => {
    res.json({ message: "Job Listing Portal Backend is running!" });
});

// ================= AUTH =================

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username & password required" });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    users.push({ username, password: hashedPassword });

    res.json({ message: "User registered successfully" });
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username & password required" });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        message: "Login successful",
        token
    });
});

// ================= MIDDLEWARE =================

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.username = decoded.username;
        next();
    });
}

// ================= PROFILE =================

app.post('/profile', verifyToken, (req, res) => {
    const { fullName, email, phone, skills } = req.body;

    profiles[req.username] = { fullName, email, phone, skills };

    res.json({ message: "Profile saved successfully" });
});

app.get('/profile', verifyToken, (req, res) => {
    const profile = profiles[req.username];

    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
});

// ================= JOBS =================

app.post('/jobs', verifyToken, (req, res) => {
    const { title, description, qualifications, location, salary } = req.body;

    const job = {
        id: jobIdCounter++,
        employer: req.username,
        title,
        description,
        qualifications,
        location,
        salary
    };

    jobs.push(job);
    res.json({ message: "Job created successfully", job });
});

app.get('/jobs', (req, res) => {
    res.json(jobs);
});

app.get('/jobs/search', (req, res) => {
    const { keyword, location } = req.query;

    let filteredJobs = jobs;

    if (keyword) {
        filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.description.toLowerCase().includes(keyword.toLowerCase()) ||
            job.qualifications.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    if (location) {
        filteredJobs = filteredJobs.filter(job =>
            job.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    res.json(filteredJobs);
});

app.delete('/jobs/:id', verifyToken, (req, res) => {
    const jobId = parseInt(req.params.id);

    const index = jobs.findIndex(
        job => job.id === jobId && job.employer === req.username
    );

    if (index === -1) {
        return res.status(404).json({ message: "Job not found or not authorized" });
    }

    jobs.splice(index, 1);
    res.json({ message: "Job deleted successfully" });
});

// ================= APPLICATIONS =================

app.post('/jobs/:id/apply', verifyToken, (req, res) => {
    const jobId = parseInt(req.params.id);
    const job = jobs.find(j => j.id === jobId);

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    const application = {
        jobId,
        jobTitle: job.title,
        employer: job.employer,
        applicant: req.username,
        appliedAt: new Date()
    };

    applications.push(application);
    res.json({ message: "Applied successfully", application });
});

app.get('/dashboard/seeker', verifyToken, (req, res) => {
    const seekerApps = applications.filter(
        app => app.applicant === req.username
    );
    res.json(seekerApps);
});

app.get('/dashboard/employer', verifyToken, (req, res) => {
    const employerJobs = jobs.filter(
        job => job.employer === req.username
    );

    const employerApps = applications.filter(
        app => app.employer === req.username
    );

    res.json({
        jobsPosted: employerJobs,
        applications: employerApps
    });
});

// ================= START SERVER =================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
