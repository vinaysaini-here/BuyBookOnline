import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `/api/order/updateOrderStatus/${orderId}`, // Corrected path with order id
        { status: newStatus },
        { withCredentials: true }
      );
      // Update the local orders state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/order/getallOrder", {
          withCredentials: true,
        });
        setOrders(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center sm:block flex-1 overflow-auto w-full sm:w-3/4 p-6 h-100vh">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">All Orders</h1>
      <ul className="border rounded-xl p-3 border-gray-800">
        {orders.map((order) => (
          <li key={order._id} className="mb-2">
            <strong>Order ID:</strong> {order._id} <br />
            <strong>Status:</strong> {order.status} <br />
            <strong>Book:</strong> {order.book?.title || "N/A"} <br />
            <strong>User:</strong> {order.user?.name || "N/A"} <br />
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            <div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="bg-gray-600 rounded-sm mt-2 text-lg"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllOrders;
