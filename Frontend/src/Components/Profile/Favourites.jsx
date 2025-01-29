import React, { useEffect, useState } from "react";
import BookCol from "../Book/BookCol";
import axios from "axios";

const Favourites = () => {

  const [data, setData] = useState([]); // Initialize as an empty array to avoid `.map` issues

  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/favorites/getFavoriteBooks", {headers: {
            
            id: "6794b8c00a5a3c5755a95b94", // Replace with the actual user ID (e.g., from auth state)
          }, withCredentials: true }
        );
        console.log(response.data);
        setData(response.data); // Access the "data" property from the response
      } catch (error) {
        console.error("Error fetching favourate books:", error);
      }
    };

    fetchFavourite();
  }, []);



  return (
    <div className="flex-1 overflow-auto w-3/4 p-6">
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
            No Favourate books available
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
