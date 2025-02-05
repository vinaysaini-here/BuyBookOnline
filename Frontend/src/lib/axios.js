import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Your API base URL
  withCredentials: true, // Allows sending cookies with requests
});


export { axiosInstance };
