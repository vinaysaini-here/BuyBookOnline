import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useCartStore = create((set) => ({
  cartItems: [], // Cart state

  // Fetch cart from backend
  fetchCart: async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get("http://localhost:8000/api/cart/viewCart", {
        headers: { id: userId },
        withCredentials: true,
      });

      const data = response.data.data;
      if (Array.isArray(data)) {
        set({ cartItems: data });
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },

  // Remove item from cart
  removeItem: async (bookId, userId) => {
    try {
      await axios.patch(`http://localhost:8000/api/cart/removeBookFromCart/${bookId}`, {}, {
        headers: { id: userId },
        withCredentials: true,
      });

      toast.success("Book removed from cart");

      // Update the cart in Zustand after removing an item
      set((state) => ({
        cartItems: state.cartItems.filter(item => item._id !== bookId),
      }));
      
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  }
}));
