import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Yahan /v1 zaroori hai
  withCredentials: true,
});

export default api;