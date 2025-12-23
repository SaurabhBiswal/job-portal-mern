import api from "./axios";

export const login = async (email, password, role) => {
  const res = await api.post("/auth/login", {
    email,
    password,
    role, // "jobseeker" | "employer"
  });
  return res.data; // { token, user }
};
