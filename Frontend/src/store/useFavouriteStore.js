// import { create } from "zustand";
// import axios from "axios";

// export const useFavouriteStore = create((set, get) => ({
//   favorites: [], // Store favorite books globally

//   // Fetch favorite books
//   fetchFavorites: async (userId) => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/favorites/getFavoriteBooks",
//         {
//           headers: { id: userId },
//           withCredentials: true,
//         }
//       );
//       set({ favorites: response.data.data }); // Update state with fetched favorites
//     } catch (error) {
//       console.error("Error fetching favorite books:", error);
//     }
//   },

//   // Remove a book from favorites
//   removeFavorite: async (bookId, userId) => {
//     if (!userId || !bookId) return;

//     try {
//       await axios.delete(`http://localhost:8000/api/favorites/remove/${bookId}`, {
//         headers: { id: userId },
//         withCredentials: true,
//       });

//       // Update global state by filtering out removed book
//       set({ favorites: get().favorites.filter((book) => book._id !== bookId) });
//     } catch (error) {
//       console.error("Error removing book from favorites:", error);
//     }
//   },
// }));


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
