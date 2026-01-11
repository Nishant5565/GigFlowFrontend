import axios from "axios";
import API_URL from "./API_URL";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
