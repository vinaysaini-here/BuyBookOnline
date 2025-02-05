import axios from "axios";
import { useEffect, useState } from "react";


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/order/updateOrderStatus/${orderId}`,  // Corrected path with order id
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
        const response = await axios.get("http://localhost:8000/api/order/getallOrder", {
          withCredentials: true
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
    <div>
      <h2>All Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <strong>Order ID:</strong> {order._id} <br />
            <strong>Status:</strong> {order.status} <br />
            <strong>Book:</strong> {order.book?.title || "N/A"} <br />
            <strong>User:</strong> {order.user?.name || "N/A"} <br />
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            
            <div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
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



