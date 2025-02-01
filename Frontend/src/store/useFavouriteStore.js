
import { create } from "zustand";
import axios from "axios";

export const useFavouriteStore = create((set, get) => ({
  favorites: [], // Store favorite books

  // Fetch favorite books
  fetchFavorites: async (userId) => {
    if (!userId) return;

    try {
      const response = await axios.get(
        "http://localhost:8000/api/favorites/getFavoriteBooks",
        {
          headers: { id: userId },
          withCredentials: true,
        }
      );
      set({ favorites: response.data.data });
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  },

   // Remove a book from favorites
   removeFavorite: async (bookId, userId) => {
    if (!userId || !bookId) return;

    try {
      await axios.put(
        "http://localhost:8000/api/favorites/removeBookToFavorite",
        {},
        {
          headers: { bookid: bookId, id: userId },
          withCredentials: true,
        }
      );

      // Update state by filtering out the removed book
      set({ favorites: get().favorites.filter((book) => book._id !== bookId) });
    } catch (error) {
      console.error("Error removing book from favorites:", error);
    }
  },
}));
