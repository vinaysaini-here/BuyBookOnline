import React from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const BookCol = ({ data }) => {
  // console.log(data);

  const navigate = useNavigate();

  const handleViewBook = () => {
    navigate("/viewbook");
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-72">
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
      </div>
    </div>
  );
};

export default BookCol;
