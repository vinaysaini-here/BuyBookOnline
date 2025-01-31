import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Your API base URL
  withCredentials: true, // Allows sending cookies with requests
});

// // Request Interceptor: Attach access token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor: Handle token expiration
// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired token (401 Unauthorized)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark the request as retried to avoid loops

//       try {
//         // Refresh the access token using the refresh-token API
//         const refreshResponse = await axios.post(
//           "http://localhost:8000/api/refresh-token", // Replace with your refresh token endpoint
//           {},
//           { withCredentials: true } // Send cookies with the request
//         );

//         const newAccessToken = refreshResponse.data.accessToken;

//         // Save the new access token to localStorage
//         localStorage.setItem("accessToken", newAccessToken);

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Failed to refresh token:", refreshError);

//         // Optionally, redirect the user to login if the refresh token is invalid
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error); // Pass the error if not handled
//   }
// );

export { axiosInstance };
