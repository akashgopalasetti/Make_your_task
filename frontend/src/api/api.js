// frontend/src/api/api.js
import axios from "axios";

function normalizeBase(url) {
  if (!url) return url;
  // ensure endsWith "/api" (no duplicate slashes)
  return url.endsWith("/api") ? url.replace(/\/+$/, "") + "/api" : url.replace(/\/+$/, "") + "/api";
}

const envUrl = import.meta.env.VITE_API_URL || "";
const base = envUrl ? normalizeBase(envUrl) : "https://make-your-task0.onrender.com/api";

const API = axios.create({
  baseURL: base,
  withCredentials: true,
});

console.log("API baseURL:", API.defaults.baseURL);

export default API;
