import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create((set, get) => ({
  user: null,
  isfetchingUser: false,
  isSigningUp: false,
  isLoggingIn: false,
  setotp: false,
  setforgetPasswordEmailCheck: false,
  setnewPassword: false,
  isCheckingAuth: true,
  // accessToken: null,
  isAuthenticated: false,
  isUpdatingProfile: false,

  // Check Authentication status based on cookies
  checkAuth: async () => {
    // Check if the user is authenticated by looking at the 'is_auth' cookie
    const isAuth = Cookies.get("is_auth") === "true"; // Check cookie
    set({ isAuthenticated: isAuth, isCheckingAuth: false });
    if (isAuth) {// Fetch user data if authenticated
      await get().fetchUser();
    } else {
      set({ user: null });
    }
  },

  // Fetch User Info
  fetchUser: async () => {
    try {
      set({ isfetchingUser: true });
      const response = await axiosInstance.get("/api/user/user-info", { withCredentials: true });
      const userData = response.data?.user;
      set({ user:  {...userData, id: userData?._id} });  // Set user info to Zustand store
    } catch (error) {
      console.error("Error fetching User:", error);
      toast.error("Failed to fetch user info.");
    } finally {
      set({ isfetchingUser: false });
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
      const res = await axiosInstance.post("/api/user/login", data, { withCredentials: true });
      
      // Check if the 'is_auth' cookie is set
      if (Cookies.get("is_auth") === "true") {
        set({ user: res.data?.user, isAuthenticated: true });
        toast.success("Logged in successfully");
      } else {
        set({ isAuthenticated: false });
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in.");
    } finally {
      set({ isLoggingIn: false });
    }
  },



  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/api/user/logout", {}, { withCredentials: true });
      
      // Remove cookies related to authentication
      Cookies.remove("is_auth");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Reset authentication state in Zustand
      set({ user: null, isAuthenticated: false });
      toast.success("Logged out successfully");
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

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/api/user/update-profile", data);
      set({ user: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },




}));
