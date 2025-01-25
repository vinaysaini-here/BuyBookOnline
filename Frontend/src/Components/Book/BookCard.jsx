import React from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const BookCard = () => {
    const navigate = useNavigate();
    const handleViewBook = () => {
      navigate("/viewbook");
    };
    const book = {
      title: "Book Name",
      description: "This is a book that.",
      price: "$125",
      image: assets.BookImg,
      rating: 4,
    };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-full md:w-80">
      {/* Image Section */}
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <h2 className="text-red-500 text-lg font-bold">{book.title}</h2>
        <p className="text-gray-500 text-sm">{book.description}</p>

        {/* Price and Rating */}
        <div className="flex justify-between items-center my-3">
          <span className="text-lg font-bold text-gray-800">{book.price}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-yellow-400 ${
                  i < book.rating ? "fill-current" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

      

        {/* Colors */}
        

        {/* Add to Cart Button */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
