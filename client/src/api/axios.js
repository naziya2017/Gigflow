import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // allows HttpOnly cookies
});

export default api;
