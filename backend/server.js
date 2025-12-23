import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

/* =======================
   DB CONNECTION
======================= */
mongoose
  .connect("mongodb+srv://punpunsaurabh2002_db_user:Punpun2002@job-portal-cluster.ruztisb.mongodb.net/jobportal")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* =======================
   MODELS
======================= */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});
const User = mongoose.model("User", userSchema);

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  type: String,
  salary: String,
  description: String
});
const Job = mongoose.model("Job", jobSchema);

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  email: String,
  status: { type: String, default: "applied" }
});
const Application = mongoose.model("Application", applicationSchema);

/* =======================
   AUTH
======================= */
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed, role });
  res.json({ message: "Registered" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ email: user.email, role: user.role });
});

/* =======================
   JOBS
======================= */
app.post("/api/jobs", async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

/* =======================
   APPLY TO JOB ✅ (ONLY ONE)
======================= */
app.post("/api/jobs/:id/apply", async (req, res) => {
  const { email } = req.body;

  const exists = await Application.findOne({
    jobId: req.params.id,
    email
  });

  if (exists) {
    return res.status(400).json({ message: "Already applied" });
  }

  await Application.create({
    jobId: req.params.id,
    email,
    status: "applied"
  });

  res.json({ message: "Applied successfully" });
});

/* =======================
   JOBSEEKER DASHBOARD
======================= */
app.get("/api/jobs/applied/:email", async (req, res) => {
  const apps = await Application.find({ email: req.params.email }).populate("jobId");

  const jobs = apps.map(app => ({
    ...app.jobId._doc,
    applied: true,
    applicationId: app._id
  }));

  res.json(jobs);
});

/* =======================
   EMPLOYER
======================= */
app.get("/api/applications", async (req, res) => {
  const apps = await Application.find().populate("jobId");
  res.json(apps);
});

app.patch("/api/applications/:id", async (req, res) => {
  const { status } = req.body;
  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updated);
});

/* =======================
   MY APPLICATIONS
======================= */
app.get("/api/my-applications/:email", async (req, res) => {
  const apps = await Application.find({ email: req.params.email }).populate("jobId");
  res.json(apps);
});

/* =======================
   SERVER (LAST LINE)
======================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


