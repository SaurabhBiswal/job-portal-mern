import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const register = (data) =>
  API.post("/auth/register", data);

// JOBS
export const getAllJobs = () => API.get("/jobs");
export const getEmployerJobs = () => API.get("/jobs/employer");

// APPLICATIONS
export const applyJob = (formData) =>
  API.post("/applications/apply", formData);

