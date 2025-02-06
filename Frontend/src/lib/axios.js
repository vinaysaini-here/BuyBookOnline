import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE ==="development" ? "http://localhost:8000" : "/api" ,// Your API base URL
  withCredentials: true, // Allows sending cookies with requests
});


export { axiosInstance };
