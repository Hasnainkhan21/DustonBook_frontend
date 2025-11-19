import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../Services/orderService";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const Adminorders = () => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null); // which order is expanded
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrders();
      // support both list and { data / orders } shapes
      const list = Array.isArray(res) ? res : res?.data || res?.orders || [];
      setOrders(list);
    } catch (err) {
      console.error("fetchOrders error:", err);
      toast.error("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Real-time listeners (socket.io)
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("orderStatusUpdated", (updatedOrder) => {
      if (!updatedOrder?._id) return;
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
      toast.info(
        `Order #${updatedOrder._id?.slice(-6) || ""} updated in real-time`
      );
    });

    socket.on("newOrder", (order) => {
      if (!order?._id) return;
      setOrders((prev) => [order, ...prev]);
      toast.success("New order received!");
    });

    return () => {
      socket.off("orderStatusUpdated");
      socket.off("newOrder");
      socket.disconnect();
    };
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-black";
      case "Processing":
        return "bg-blue-500 text-white";
      case "Shipped":
        return "bg-purple-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSelectColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400 text-black border-yellow-600";
      case "Processing":
        return "bg-blue-400 text-white border-blue-600";
      case "Shipped":
        return "bg-purple-400 text-white border-purple-600";
      case "Delivered":
        return "bg-green-400 text-white border-green-600";
      default:
        return "bg-gray-400 text-white border-gray-600";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      // Update only that specific order — without reloading full table
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );

      toast.success("Order status updated!");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-[#FCB53B] mb-6">
        Manage Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-[#1a1a1a] border border-[#A72703] rounded-lg overflow-hidden">
          <thead className="bg-[#A72703]">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Expand</th>
            </tr>
          </thead>

          <tbody className="bg-[#131313] divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <React.Fragment key={order._id}>
                  {/* MAIN ROW */}
                  <tr className="hover:bg-[#242424]">
                    <td className="p-3 font-semibold">#{order._id?.slice(-6)}</td>

                    <td className="p-3">
                      {order.user?.name || "Unknown"}
                      <br />
                      <span className="text-sm text-gray-400">
                        {order.user?.email}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-[#FCB53B] font-bold">
                      Rs {order.totalAmount}
                    </td>

                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`px-3 py-1 rounded font-semibold border-2 transition-all ${getSelectColor(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => toggleExpand(order._id)}
                        className="text-[#FCB53B] hover:underline font-semibold"
                      >
                        {expanded === order._id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {/* EXPANDED SECTION */}
                  {expanded === order._id && (
                    <tr className="bg-[#242424]">
                      <td colSpan="6" className="p-5">
                        <div className="mb-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#A72703]">
                          <h3 className="text-lg font-bold mb-3 text-[#FCB53B]">
                            📍 Shipping Details
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                            <p>
                              <strong>Name:</strong>{" "}
                              {order.shippingDetails?.fullName || "N/A"}
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              {order.shippingDetails?.phone || "N/A"}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              {order.shippingDetails?.address || "N/A"}
                            </p>
                            <p>
                              <strong>City:</strong>{" "}
                              {order.shippingDetails?.city || "N/A"}
                            </p>
                            <p>
                              <strong>Postal:</strong>{" "}
                              {order.shippingDetails?.postalCode || "N/A"}
                            </p>
                            <p>
                              <strong>Country:</strong>{" "}
                              {order.shippingDetails?.country || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#A72703]">
                          <h3 className="text-lg font-bold text-[#FCB53B] mb-3">
                            📚 Order Items
                          </h3>

                          <ul className="space-y-2">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item) => (
                                <li
                                  key={
                                    item._id ||
                                    item.book?._id ||
                                    `${order._id}-${item.book?._id}`
                                  }
                                  className="p-2 bg-[#131313] rounded flex justify-between text-gray-200"
                                >
                                  <span>
                                    {item.book?.title || item.title}
                                  </span>
                                  <span className="text-[#FCB53B] font-semibold">
                                    Qty: {item.quantity}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-400">No items</li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminorders;

