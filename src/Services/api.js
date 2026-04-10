import axios from "axios";

// Base URL from environment variable — falls back to localhost for development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3006/api",
  withCredentials: true,
});

export const DELIVERY_CHARGE = 200;
export const FREE_SHIPPING_THRESHOLD = 2000;

export default api;
