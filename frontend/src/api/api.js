// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    err.normalizedMessage = err?.response?.data?.message || err?.response?.data || err.message;
    return Promise.reject(err);
  }
);

export default API;
