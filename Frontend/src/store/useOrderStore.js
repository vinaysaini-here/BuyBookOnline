import { create } from "zustand";
import axios from "axios";
import { axiosInstance } from "../lib/axios";

export const useOrderStore = create((set, get) => ({
  orders: [], // Store the user's order history

  // Fetch order history
  fetchOrderHistory: async (userId) => {
    if (!userId) return;

    try {
      const response = await axiosInstance.get("/api/order/getOrderHistory", {
        headers: { id: userId },
        withCredentials: true, // Send credentials for authentication
      });
      set({ orders: response.data.data });

    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  },

  // Remove an order from the history
  removeOrder: async (orderId, userId) => {
    if (!userId || !orderId) return;

    try {
      await axiosInstance.delete("/api/order/removeOrder", {
        headers: { orderid: orderId, id: userId },
        withCredentials: true, // Send credentials for authentication
      });

      // Update state by filtering out the removed order
      set({ orders: get().orders.filter((order) => order._id !== orderId) });
    } catch (error) {
      console.error("Error removing order:", error);
    }
  },
}));
