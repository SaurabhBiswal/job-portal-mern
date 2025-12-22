export const getJobs = () =>
  JSON.parse(localStorage.getItem("jobs")) || [];

export const saveJobs = (jobs) =>
  localStorage.setItem("jobs", JSON.stringify(jobs));

export const getAppliedJobs = () =>
  JSON.parse(localStorage.getItem("appliedJobs")) || [];

export const saveAppliedJobs = (jobs) =>
  localStorage.setItem("appliedJobs", JSON.stringify(jobs));



