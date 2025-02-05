import axios from "axios";
import { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            <strong>Book:</strong> {order.Book?.title || "N/A"} <br />
            <strong>User:</strong> {order.User?.name || "N/A"} <br />
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllOrders;
