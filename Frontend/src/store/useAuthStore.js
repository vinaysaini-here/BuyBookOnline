import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create((set, get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  setotp: false,
  setforgetPasswordEmailCheck: false,
  setnewPassword: false,
  isCheckingAuth: true,
  // accessToken: null,
  isAuthenticated: false,

  // Get User Info
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/user/check-auth");
      set({ user: res?.data ?? null });
    } catch (error) {
      // console.error("Failed to fetch user info:", error);
      toast.error("Please login to access your Account");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Sign Up
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/user/register", data);
      set({ user: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/user/login", data);
      // localStorage.setItem("accessToken", res.data.accessToken); // Save access token
      set({ user: res.data });
      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // // Refresh Token
  // refershUser: async () => {
  //   try {
  //     const res = await axiosInstance.post("/api/user/refresh-token");
  //     const newAccessToken = res.data.accessToken;

  //     // Save new access token
  //     localStorage.setItem("accessToken", newAccessToken);

  //     set({ accessToken: newAccessToken });

  //     // // Fetch user info with the new access token
  //     // await get().getUser({ accessToken: newAccessToken });

  //     console.log("Token refreshed successfully.");
  //   } catch (error) {
  //     console.error("Failed to refresh token:", error);
  //     // Redirect to login if token refresh fails
  //     localStorage.removeItem("accessToken");
  //     set({ user: null });
  //     window.location.href = "/login";
  //   }
  // },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/api/user/logout");
      // localStorage.removeItem("accessToken"); // Remove access token
      set({ user: null, isAuthenticated: false });
      toast.success("Logged out successfully");
      // window.location.href = "/login"; // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  },

  // OTP Verification
  otp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/user/verify-email", data);
      set({ user: res.data });
      toast.success("Verified successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Forgot Password: Send Reset Link
  forgetPasswordEmailCheck: async (data) => {
    try {
      await axiosInstance.post("/api/user/reset-password-link", data);
      toast.success("Reset password link sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send link.");
    }
  },

  // Reset Password
  newPassword: async (id, token, data) => {
    try {
      await axiosInstance.post(`/api/user/reset-password/${id}/${token}`, data);
      toast.success("Password reset successfully! Please log in.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  },
}));
