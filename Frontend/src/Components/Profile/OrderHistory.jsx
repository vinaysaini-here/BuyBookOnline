import React from "react";

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      book: "Ikigai",
      description: "Even if we don't know it yet, Ikigai translates as ...",
      price: 392,
      status: "Order placed",
      mode: "COD",
    },
    {
      id: 2,
      book: "Tongue In Cheek: The Funny Side Of Life",
      description: "Tongue in Cheek is a rib-tickling ride...",
      price: 1008,
      status: "Order placed",
      mode: "COD",
    },
    {
      id: 3,
      book: "How to Win Friends and Influence People",
      description: "Do you feel stuck in life, not knowing how to make ...",
      price: 233,
      status: "Out for delivery",
      mode: "COD",
    },
    {
      id: 4,
      book: "Rich Dad Poor Dad",
      description: "The titular 'rich dad' is his best friend's father ...",
      price: 798,
      status: "Order placed",
      mode: "COD",
    },
    {
      id: 5,
      book: "How to Win Friends and Influence People",
      description: "Do you feel stuck in life, not knowing how to make ...",
      price: 233,
      status: "Canceled",
      mode: "COD",
    },
    {
      id: 6,
      book: "Rich Dad Poor Dad",
      description: "The titular 'rich dad' is his best friend's father ...",
      price: 798,
      status: "Order placed",
      mode: "COD",
    },
  ];
  return (
    <>
      <div className="hidden sm:block flex-1 h-90vh overflow-auto w-3/4 p-6">
        <h1 className="text-2xl text-gray-900 font-bold mb-6">
          Your Order History
        </h1>
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
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  order.status === "Canceled"
                    ? "bg-red-200 text-red-700"
                    : index % 2 === 0
                    ? "bg-gray-100"
                    : "bg-gray-50"
                }`}
              >
                <td className="border text-gray-800 p-2 text-center">
                  {index + 1}
                </td>
                <td className="border text-gray-800 p-2">{order.book}</td>
                <td className="border text-gray-800 p-2">
                  {order.description}
                </td>
                <td className="border text-gray-800 p-2 text-center">
                  ₹ {order.price}
                </td>
                <td
                  className={`border p-2 text-center ${
                    order.status === "Order placed"
                      ? "text-green-500"
                      : order.status === "Out for delivery"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border text-gray-800 p-2 text-center">
                  {order.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block sm:hidden flex-1 h-90vh overflow-auto w-full p-4 sm:p-6">
  <h1 className="text-xl sm:text-2xl text-gray-900 font-bold mb-4 sm:mb-6">
    Your Order History
  </h1>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse border min-w-max">
      <thead>
        <tr className="bg-white text-gray-900 shadow-xl">
          <th className="border p-2 whitespace-nowrap">Sr.</th>
          <th className="border p-2 whitespace-nowrap">Books</th>
          <th className="border p-2 whitespace-nowrap">Description</th>
          <th className="border p-2 whitespace-nowrap">Price</th>
          <th className="border p-2 whitespace-nowrap">Status</th>
          <th className="border p-2 whitespace-nowrap">Mode</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr
            key={order.id}
            className={`${
              order.status === "Canceled"
                ? "bg-red-200 text-red-700"
                : index % 2 === 0
                ? "bg-gray-100"
                : "bg-gray-50"
            }`}
          >
            <td className="border text-gray-800 p-2 text-center">
              {index + 1}
            </td>
            <td className="border text-gray-800 p-2">{order.book}</td>
            <td className="border text-gray-800 p-2">{order.description}</td>
            <td className="border text-gray-800 p-2 text-center">
              ₹ {order.price}
            </td>
            <td
              className={`border p-2 text-center ${
                order.status === "Order placed"
                  ? "text-green-500"
                  : order.status === "Out for delivery"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {order.status}
            </td>
            <td className="border text-gray-800 p-2 text-center">
              {order.mode}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </>
  );
};

export default OrderHistory;
