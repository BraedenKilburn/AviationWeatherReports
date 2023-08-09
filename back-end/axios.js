import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { "X-API-Key": process.env.API_KEY },
});

export default axiosInstance;
