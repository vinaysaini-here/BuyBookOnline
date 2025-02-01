import React from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const BookCol = ({ data , Favourite }) => {
    const { user } = useAuthStore();

  const navigate = useNavigate();

  const handleViewBook = () => {
    if (data && data._id) {
      navigate(`/viewbook/${data._id}`); // Replace ":id" with the actual `id` of the book
    } else {
      alert("Book ID is missing. Cannot navigate to the book page.");
    }
  };

  const handleRemoveFavourite =async () => {
    const response = await axios.put("http://localhost:8000/api/favorites/removeBookToFavorite",   {},
      {
        headers: {
          bookid: data._id, // Using the book ID from useParams
          id: user._id, // Replace with the actual user ID (e.g., from auth state)
        },
        withCredentials: true, // Ensures authentication tokens are sent
      })
      alert("Removed from Favourites.");
  };


  const addToCart = () => {
    alert(`${book.title} item(s) added to the cart.`);
  };

  const formatToRupees = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };


  const book = {
    title: data?.title || "Unknown Title",
    description: data?.description || "No description available.",
    price: data?.price ? formatToRupees(data.price) : "₹0.00",
    image: data?.coverImage || assets.BookImg,
    rating: 4,
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-72 sm:w-90% md:w-72 lg:w-72 xl:w-72">
      {/* Image Section */}
      <div onClick={handleViewBook} className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="h-80 w-auto m-auto object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 onClick={handleViewBook} className="text-slate-800 text-lg font-bold">{book.title}</h2>
        <p onClick={handleViewBook} className="text-gray-500 text-sm">{book.description}</p>

        {/* Price and Rating */}
        <div onClick={handleViewBook} className="flex justify-between items-center my-3">
          <span className="text-lg font-bold text-gray-800">{book.price}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-yellow-400 ${i < book.rating ? "fill-current" : "opacity-30"
                  }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button onClick={addToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md">
          Add to Cart
        </button>
        {Favourite && (    <button
          onClick={handleRemoveFavourite}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md mt-2"
        >Remove From Favourate</button>)}
    
      </div>
    </div>
  );
};

export default BookCol;
