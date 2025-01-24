import React, { useState } from "react";
import assets from "../../assets/assets";
import NavBarLogin from "../../Components/Navbar/NavBarLogin";

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

  const handleApplyCoupon = () => {
    alert(`Coupon "${coupon}" applied!`);
    setCoupon("");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartTotal = subtotal;
  3;
  return (
    <div>
      <NavBarLogin />
      <div className="w-full h-[100%] flex justify-center align-middle bg-yellow-100">
        <div className="p-8 bg-yellow-100 min-h-screen w-80vw ml-auto mr-auto">
          <h1 className="text-2xl font-bold mb-6">
            Cart ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">Photo</th>
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Subtotal</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 text-black">{item.name}</td>
                    <td className="py-2 px-4 text-black">${item.price}</td>
                    <td className="py-2 px-4 text-black flex items-center space-x-2">
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
                    <td className="py-2 px-4 text-black">
                      ${item.price * item.quantity}
                    </td>
                    <td className="py-2 px-4">
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
              >
                Apply Coupon
              </button>
            </div>
            <button
              onClick={() => alert("Cart updated!")}
              className="mt-4 md:mt-0 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Update Cart
            </button>
          </div>

          <div className="mt-8 p-6 bg-gray-800 text-white rounded-md w-full max-w-sm ml-auto">
            <h2 className="text-lg font-bold">Cart totals</h2>
            <div className="flex justify-between mt-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span>Cart totals</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
