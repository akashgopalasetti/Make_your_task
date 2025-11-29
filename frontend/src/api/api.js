import axios from "axios";

const BACKEND = import.meta.env.VITE_API_URL || "https://your-backend.onrender.com/api";

const API = axios.create({
  baseURL: BACKEND,
  withCredentials: true,
});

export default API;
