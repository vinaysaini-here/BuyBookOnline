import React, { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import assets from "../../assets/assets";
import { FaRegHeart } from "react-icons/fa";

const BOOKS_DATA = [
  {
    id: 1,
    src: assets.Book1,
  },
  {
    id: 2,
    src: assets.Book2,
  },
  {
    id: 3,
    src: assets.Book3,
  },
];
const ViewBook = () => {
  const [selectedItem, setSelectedItem] = React.useState(BOOKS_DATA[0]);

  const handleClick = React.useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (operation) => {
    setQuantity((prev) => {
      if (operation === "increase") return prev + 1;
      if (operation === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const addToCart = () => {
    alert(`${quantity} item(s) added to the cart.`);
  };

  const buyNow = () => {
    alert(`Proceeding to buy ${quantity} item(s).`);
  };
  const handleFavourites = () => {
    alert(`Added to Favourites.`);
  };

  return (
    <div>
      <NavBar />
      <div className="w-full h-93vh flex justify-center align-middle bg-slate-50">
        <div className="w-80vw h-full flex flex-row justify-center items-center bg-slate-50">
          <div className="w-55% h-90% gap-4  bg-slate-50 flex items-center">
            <div className="w-1/4 h-full flex flex-col justify-center gap-3">
              {BOOKS_DATA.map((item, index) => {
                return (
                  <div
                    onClick={() => handleClick(item)}
                    key={`${item.id}-${index}`}
                    className="relative w-full h-32% bg-slate-500 rounded-lg flex items-center justify-center"
                  >
                    <img
                      src={item.src}
                      alt={`img-id-${item.id}`}
                      className="absolute h-full m-auto object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-400 w-full h-full rounded-lg relative flex items-center justify-center">
              <img
                src={selectedItem.src}
                alt={`img-id-${selectedItem.id}`}
                className="absolute h-full m-auto object-cover"
              />
            </div>
          </div>
          <div className="w-45% h-90% mr-4 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between flex-col text-black">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold pb-2">
                  Double Bed & Side Tables
                </h1>
                <button onClick={handleFavourites} className="text-3xl text-slate-700 pr-1"><FaRegHeart/></button>
              </div>
              <p className="text-2xl text-gray-800 font-semibold mt-2">
                $54.98
              </p>
              <p className="text-sm text-gray-500 mt-1 pb-6">(32 reviews)</p>
              <hr />
              <p className="text-gray-600 mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
              </p>

              <ul className="list-disc list-inside text-gray-600 mt-4">
                <li>Lorem ipsum dolor sit amet, adipi scing elit</li>
                <li>Lorem ipsum dolor sit amet, consectetuer adipi</li>
                <li>Lorem ipsum dolor sit amet, consectetuer adipi</li>
              </ul>
            </div>

            <div className="flex items-center mt-6">
              <button
                className="h-11 px-4 py-2 bg-slate-50 rounded-l-3xl border-t border-b border-l border-gray-200 hover:bg-gray-300"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="h-11 w-12 text-center bg-slate-50 border-t border-b border-gray-200"
              />
              <button
                className=" h-11 px-4 py-2 bg-slate-50 rounded-r-3xl border-t border-b border-r border-gray-200 hover:bg-gray-300"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div>
            <div className="flex space-x-4 mt-7">
              <button
                className="w-1/2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button
                className="w-1/2 px-6 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                onClick={buyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Extra Information */}
            <div className="text-gray-500 text-sm mt-7">
              <p>✅ Free worldwide shipping on all orders over $100</p>
              <p>
                ✅ Delivers in 3-7 Working Days{" "}
                <span className="text-blue-500">Shipping & Return</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
