import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  isAddingBook: false,
  //   isFetchingBooks: false,

  addBook: async (data, userId) => {
    set({ isAddingBook: true });
    try {
      const response = await axiosInstance.post(
        "/api/book/saveBook",
        { data },
        { headers: { id: userId }, withCredentials: true }
        
      );

      toast.success("Book saved successfully")
    } catch (error) {
        console.log("Failed to save book", error);
        
    }
    finally{
        set ({isAddingBook :false})
    }
  },
}));
