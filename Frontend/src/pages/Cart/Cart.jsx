import React, { useState } from "react";
import assets from "../../assets/assets";
import NavBar from "../../Components/Navbar/NavBar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Book1",
      price: 59,
      quantity: 4,
      image: assets.Book1,
    },
    {
      id: 2,
      name: "Book2",
      price: 168,
      quantity: 1,
      image: assets.Book2,
    },
    {
      id: 3,
      name: "Book3",
      price: 70,
      quantity: 1,
      image: assets.Book4,
    },
  ]);
  const [coupon, setCoupon] = useState("");

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

 
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartTotal = subtotal;
  3;
  return (
    <div>
  <NavBar />
  <div className="w-full h-full flex justify-center bg-HomeBgColor">
    <div className="p-4 sm:p-8 bg-HomeBgColor min-h-screen w-full max-w-7xl">
      {/* Cart Title */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Cart ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
      </h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-max w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white text-sm sm:text-base">
              <th className="py-2 px-3 sm:px-4 text-left">Photo</th>
              <th className="py-2 px-3 sm:px-4 text-left">Product</th>
              <th className="py-2 px-3 sm:px-4 text-left">Price</th>
              <th className="py-2 px-3 sm:px-4 text-left">Quantity</th>
              <th className="py-2 px-3 sm:px-4 text-left">Subtotal</th>
              <th className="py-2 px-3 sm:px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b text-sm sm:text-base">
                <td className="py-2 px-3 sm:px-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-3 sm:px-4 text-black">{item.name}</td>
                <td className="py-2 px-3 sm:px-4 text-black">${item.price}</td>
                <td className="py-2 px-3 sm:px-4 text-black flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-1 my-4 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </td>
                <td className="py-2 px-3 sm:px-4 text-black">
                  ${item.price * item.quantity}
                </td>
                <td className="py-2 px-3 sm:px-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions & Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
        <button
          onClick={() => alert("Cart updated!")}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Update Cart
        </button>

        {/* Cart Totals */}
        <div className="mt-4 md:mt-0 p-6 bg-gray-800 text-white rounded-md w-full max-w-sm">
          <h2 className="text-lg font-bold">Cart Totals</h2>
          <div className="flex justify-between mt-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-4">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="mt-6 w-full px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Cart;
