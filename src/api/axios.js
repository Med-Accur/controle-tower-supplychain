import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  withCredentials: true,           
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error("API error:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
);

export default api;
