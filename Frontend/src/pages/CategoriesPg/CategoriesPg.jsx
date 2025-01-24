import React, { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";

const CategoriesPg = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const products = Array(24).fill({
    title: "Vese Wali Books",
    originalPrice: "$230.00",
    discountedPrice: "$200.00",
    discount: "13%",
  });

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Our Collection Of Products
        </h1>

        <div className="flex justify-center mb-8 my-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search An Item"
              className="w-72 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M9 11a7 7 0 1014 0 7 7 0 00-14 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="pr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition duration-300"
            >
              <div className="relative h-48 bg-gray-300 rounded mb-4">
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
                  {product.discount}
                </span>
              </div>
              <h3 className="text-lg font-medium mb-2">{product.title}</h3>
              <div className="flex justify-between items-center">
                <span className="line-through text-gray-500">
                  {product.originalPrice}
                </span>
                <span className="text-green-600 font-bold">
                  {product.discountedPrice}
                </span>
              </div>
              <button className="mt-4 w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPg;
