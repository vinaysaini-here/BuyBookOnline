import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const { user } = useAuthStore();
  const { cartItems, fetchCart, removeItem  ,clearCartAfterOrder} = useCartStore();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart when user is available
  useEffect(() => {
    if (user) fetchCart(user._id);
  }, [user, fetchCart]);

  // Calculate total
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  }, [cartItems]);


  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/placeOrder",
        { order: cartItems },
        { headers: { id: user._id }, withCredentials: true }
      );
      
      toast.success("Order placed successfully!");
      clearCartAfterOrder(); // Clear cart after successful order
      navigate("/profile/orderhistory");
    } catch (error) {
      console.log(error);

      toast.error("Failed to place order. Please try again later.");
    }
  }

  return (
    <div>
      <NavBar />
      <div className="w-full h-full flex justify-center bg-HomeBgColor">
        <div className="p-4 sm:p-8 bg-HomeBgColor min-h-screen w-full max-w-7xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Cart ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-max w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-800 text-white text-sm sm:text-base">
                  <th className="py-2 px-3 sm:px-4 text-left">Photo</th>
                  <th className="py-2 px-3 sm:px-4 text-left">Product</th>
                  <th className="py-2 px-3 sm:px-4 text-left">Price</th>
                  <th className="py-2 px-3 sm:px-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id || index} className="border-b text-sm sm:text-base">
                    <td className="py-2 px-3 sm:px-4">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                      />
                    </td>
                    {/* <td className="py-2 px-3 sm:px-4 text-black " onClick={() => navigate(`/viewbook/${item._id}`)} >{item.title}</td> */}
                    <td
                      className="py-2 px-3 sm:px-4 text-black cursor-pointer hover:text-blue-400 hover:underline transition duration-200"
                      onClick={() => navigate(`/viewbook/${item._id}`)}
                    >
                      {item.title}
                    </td>
                    <td className="py-2 px-3 sm:px-4 text-black">₹{item.price}</td>
                    <td className="py-2 px-3 sm:px-4">
                      <button
                        onClick={() => removeItem(item._id, user._id)}
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
            <button onClick={() => toast.success("Cart updated!")}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Update Cart
            </button>

            <div className="mt-4 md:mt-0 p-6 bg-gray-800 text-white rounded-md w-full max-w-sm">
              <h2 className="text-lg font-bold">Cart Totals</h2>
              <div className="flex justify-between mt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button onClick={PlaceOrder}
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
