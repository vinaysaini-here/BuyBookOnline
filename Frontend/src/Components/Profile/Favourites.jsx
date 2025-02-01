import React, { useEffect, useState } from "react";
import BookCol from "../Book/BookCol";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const Favourites = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState([]); // Initialize as an empty array to avoid `.map` issues

  useEffect(() => {
    const fetchFavourite = async () => {
      if (!user || !user._id) {
        // console.error("User is not available or missing _id");
        return; // Stop execution if user is null
      }

      console.log("Fetching favourites for user:", user._id);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/favorites/getFavoriteBooks",
          {
            headers: {
              id: user._id, // Ensure only _id is passed
            },
            withCredentials: true,
          }
        );

        // console.log("Fetched favourites:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };

    if (user) {
      fetchFavourite(); // Call function only when user is available
    }
  }, [ user]); // Re-run when user changes

  return (
    <>
      <div className="hidden sm:block flex-1 h-90vh overflow-auto w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Favourites</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-5">
          {data.length > 0 ? (
            data.map((item, i) => (
              <div key={i}>
                <BookCol data={item} Favourite = {true}/>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No Favourite books available
            </p>
          )}
        </div>
      </div>
      <div className="block sm:hidden flex-1 h-90vh overflow-auto w-full p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Favourites</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-5">
          {data.length > 0 ? (
            data.map((item, i) => (
              <div key={i}>
                <BookCol data={item} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No Favourite books available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourites;
