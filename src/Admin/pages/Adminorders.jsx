import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../../Services/orderService";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const Adminorders = () => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null); // which order is expanded
  const [loading, setLoading] = useState(true);

  // new state for confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

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
    const socket = io("http://localhost:3006");

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

  // open confirmation (replaces window.confirm)
  const openDeleteConfirm = (orderId) => {
    setDeletingOrderId(orderId);
    setConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setDeletingOrderId(null);
    setConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingOrderId) return;
    try {
      await deleteOrder(deletingOrderId);

      // Remove from UI instantly
      setOrders((prev) => prev.filter((o) => o._id !== deletingOrderId));

      toast.success("Order deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete order");
    } finally {
      setDeletingOrderId(null);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="p-4 md:p-6 text-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
        Manage Orders
      </h1>

      {/* confirmation dialog (MUI) */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete order?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this order? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <div className="overflow-x-auto rounded-xl border border-yellow-900/30 shadow-2xl">
        <table className="w-full text-left bg-[#1a1a1a] border-collapse min-w-[650px]">
          <thead className="bg-yellow-600">
            <tr>
              <th className="p-3 text-sm font-bold uppercase tracking-wider">Order</th>
              <th className="p-3 text-sm font-bold uppercase tracking-wider">User</th>
              <th className="p-3 text-sm font-bold uppercase tracking-wider">Date</th>
              <th className="p-3 text-sm font-bold uppercase tracking-wider">Amount</th>
              <th className="p-3 text-sm font-bold uppercase tracking-wider">Status</th>
              <th className="p-3 text-sm font-bold uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-[#131313] divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-500 italic">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-500 italic">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <React.Fragment key={order._id}>
                  {/* MAIN ROW */}
                  <tr className="hover:bg-[#1e1e1e] transition-colors">
                    <td className="p-3 text-sm font-mono text-yellow-500">#{order._id?.slice(-6)}</td>

                    <td className="p-3">
                      <div className="text-sm font-bold">{order.user?.name || "Unknown"}</div>
                      <div className="text-[10px] text-gray-500 truncate max-w-[120px]">
                        {order.user?.email}
                      </div>
                    </td>

                    <td className="p-3 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-sm text-yellow-500 font-bold">
                      Rs {order.totalAmount}
                    </td>

                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`text-xs px-2 py-1 rounded-full font-bold border outline-none cursor-pointer transition-all ${getSelectColor(
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
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleExpand(order._id)}
                          className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition"
                        >
                          {expanded === order._id ? "Hide" : "View"}
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(order._id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-white font-bold text-xs transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* EXPANDED SECTION */}
                  {expanded === order._id && (
                    <tr className="bg-[#1e1e1e]">
                      <td colSpan="6" className="p-4 md:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="p-4 bg-[#131313] rounded-xl border border-yellow-900/40">
                            <h3 className="text-sm font-bold mb-4 text-yellow-500 flex items-center gap-2">
                              <span>📍</span> Shipping Details
                            </h3>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                              <p className="text-gray-500">Name:</p>
                              <p className="text-gray-200">{order.shippingDetails?.fullName || "N/A"}</p>
                              <p className="text-gray-500">Phone:</p>
                              <p className="text-gray-200">{order.shippingDetails?.phone || "N/A"}</p>
                              <p className="text-gray-500">Address:</p>
                              <p className="text-gray-200 break-words">{order.shippingDetails?.address || "N/A"}</p>
                              <p className="text-gray-500">City:</p>
                              <p className="text-gray-200">{order.shippingDetails?.city || "N/A"}</p>
                            </div>
                          </div>

                          <div className="p-4 bg-[#131313] rounded-xl border border-yellow-900/40">
                            <h3 className="text-sm font-bold mb-4 text-yellow-500 flex items-center gap-2">
                              <span>📚</span> Items Summary
                            </h3>
                            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, i) => (
                                  <div key={i} className="flex justify-between items-center text-xs p-2 bg-[#1a1a1a] rounded-lg">
                                    <span className="text-gray-300 truncate max-w-[200px]">
                                      {item.book?.title || item.title}
                                    </span>
                                    <span className="text-yellow-500 font-bold shrink-0">
                                      x{item.quantity}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-gray-500 italic">No items found</p>
                              )}
                            </div>
                          </div>
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

