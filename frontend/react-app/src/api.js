import axios from "axios";

const API = "http://localhost:5000/api";

export const getJobs = async () => {
  const res = await axios.get(`${API}/jobs`);
  return res.data;
};

export const applyJobAPI = async (jobId) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/applications/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAppliedJobsAPI = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/applications/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};



