import React, { useEffect } from "react";
import BookCol from "../Book/BookCol";
import { useAuthStore } from "../../store/useAuthStore";
import { useFavouriteStore } from "../../store/useFavouriteStore";

const Favourites = () => {
  const { user } = useAuthStore();
  const { favorites, fetchFavorites } = useFavouriteStore();

  // Fetch favorite books when user is available
  useEffect(() => {
    if (user?._id) {
      fetchFavorites(user._id);
    }
  }, [user]);

  return (
    <>
      <div className="hidden sm:block flex-1 h-90vh overflow-auto w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Favourites</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-5">
          {favorites.length > 0 ? (
            favorites.map((item, i) => (
              <div key={i}>
                <BookCol data={item} Favourite={true} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No Favourite books available</p>
          )}
        </div>
      </div>

      <div className="block sm:hidden flex-1 h-90vh overflow-auto w-full p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Favourites</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-5">
          {favorites.length > 0 ? (
            favorites.map((item, i) => (
              <div key={i}>
                <BookCol data={item} Favourite={true} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No Favourite books available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourites;
