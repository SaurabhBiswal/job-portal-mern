const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    salary: String,
    location: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);


