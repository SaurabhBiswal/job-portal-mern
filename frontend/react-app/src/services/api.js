import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (name, email, password, role) => api.post('/auth/register', { name, email, password, role });
export const getJobs = () => api.get('/jobs');
export const applyJob = (jobId) => api.post('/applications/apply', { jobId });
export const getAppliedJobs = () => api.get('/applications/my-applications');
export const postJob = (jobData) => api.post('/jobs/post', jobData);
export default api;