import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { user } = useAuthStore(); // Get the user from the auth store
  const { orders, fetchOrderHistory } = useOrderStore(); // Get orders and function from the order store
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      fetchOrderHistory(user._id); // Fetch order history for the authenticated user
    }
  }, [user, fetchOrderHistory]); // Re-run effect when user changes

  useEffect(() => {
    // Log the orders fetched to the console for debugging
    console.log("Orders from store:", orders);
  }, [orders]); // Only log when orders change

  return (
    <>
      {/* Large screens */}
      <div className="hidden sm:block flex-1 h-90vh overflow-auto w-3/4 p-6">
        <h1 className="text-2xl text-gray-900 font-bold mb-6">Your Order History</h1>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-white text-gray-900 shadow-xl ">
              <th className="border p-2">Sr.</th>
              <th className="border p-2">Books</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Mode</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${order.status === "Canceled"
                    ? "bg-red-200 text-red-700"
                    : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-gray-50"
                    }`}
                >
                  <td className="border text-gray-800 p-2 text-center">{index + 1}</td>
                  <td className="border text-gray-800 p-2 cursor-pointer hover:text-blue-400 hover:underline transition duration-200" onClick={() => navigate(`/viewbook/${order.book?._id}`)} >{order.book?.title || "N/A"}</td>
                  <td className="border text-gray-800 p-2">{order.book?.description}</td>
                  <td className="border text-gray-800 p-2 text-center">₹ {order.book?.price}</td>
                  <td
                    className={`border p-2 text-center ${order.status === "Order Placed"
                      ? "text-green-500"
                      : order.status === "Out For Delivery"
                        ? "text-yellow-500"
                        : "text-red-500"
                      }`}
                  >
                    {order.status}
                  </td>
                  <td className="border text-gray-800 p-2 text-center">
                    {/* {order.mode} */}
                    Cash On Delivery
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistory;
