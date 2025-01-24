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

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/user/register", data);
      set({ user: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/user/login", data);
      set({ user: res.data });
      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  otp: async (data) => {
    set({ setotp: true });
    try {
      const res = await axiosInstance.post("/api/user/verify-email", data);
      set({ user: res.data });
      toast.success("verified successfully");
      return res.data;

      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ setotp: false });
    }
  },

  forgetPasswordEmailCheck: async (data) => {
    set({ setforgetPasswordEmailCheck: true });
    try {
      await axiosInstance.post("/api/user/reset-password-link", data);
      toast.success("Reset password link sent successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ setforgetPasswordEmailCheck: false });
    }
  },

  newPassword: async (id, token, data) => {
    set({ setnewPassword: true }); // Set loading state

    try {
      const res = await axiosInstance.post(
        `/api/user/reset-password/${id}/${token}`,
        data
      );
      toast.success("Password reset successfully! Please log in.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      set({ setnewPassword: false }); // Reset loading state
    }
  },




  


}));
