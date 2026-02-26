import React, { useEffect, useState } from "react";
import { getMyOrders, deleteOrder } from "../Services/orderService";
import { DeliveryCharge } from "../Services/api";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FaTrash, FaClock } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data || res || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Get current user ID
  const user = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("user") ||
        localStorage.getItem("profile") ||
        "null"
      );
    } catch {
      return null;
    }
  })();
  const userId = user?.result?._id || user?._id || user?.id || null;

  // Real-time listener
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("orderStatusUpdated", (updatedOrder) => {
      if (!updatedOrder) return;
      if (updatedOrder.user?._id !== userId) return;

      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
      toast.info(`Your order status updated: ${updatedOrder.status}`);
    });

    return () => {
      socket.off("orderStatusUpdated");
      socket.disconnect();
    };
  }, [userId]);

  // Check if order can be cancelled (within 24 hours)
  const canCancelOrder = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - orderDate);
    const diffHours = diffTime / (1000 * 60 * 60);
    return diffHours < 24;
  };

  // Get hours remaining for cancellation
  const getHoursRemaining = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - orderDate);
    const diffHours = 24 - diffTime / (1000 * 60 * 60);
    return Math.ceil(diffHours);
  };

  // Open confirmation dialog
  const openDeleteConfirm = (orderId) => {
    setDeletingOrderId(orderId);
    setConfirmOpen(true);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeletingOrderId(null);
    setConfirmOpen(false);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingOrderId) return;

    try {
      await deleteOrder(deletingOrderId);
      setOrders((prev) => prev.filter((order) => order._id !== deletingOrderId));
      toast.success("✅ Order cancelled successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("❌ Failed to cancel order");
    } finally {
      setDeletingOrderId(null);
      setConfirmOpen(false);
    }
  };

  const statusColors = {
    Pending: "bg-yellow-600",
    Processing: "bg-blue-600",
    Shipped: "bg-purple-600",
    Delivered: "bg-green-600",
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-yellow-600">📦 My Orders</h1>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle className="text-black">Cancel Order?</DialogTitle>
        <DialogContent>
          <p className="text-black mt-2">
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="inherit">
            No, Keep It
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-600 text-lg mb-2">You have no orders yet.</p>
          <p className="text-gray-500">Start shopping to place your first order!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isCancellable =
              canCancelOrder(order.createdAt) && order.status === "Pending";
            const hoursRemaining = getHoursRemaining(order.createdAt);

            const subtotal = order.totalAmount;
            const shippingFee = subtotal > 2000 ? 0 : DeliveryCharge;
            const finalTotal = subtotal + shippingFee;

            return (
              <div
                key={order._id}
                className="bg-white p-5 rounded-lg shadow border-l-4 border-yellow-500 hover:shadow-lg transition"
              >
                {/* Order Header - Compact */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded text-white font-semibold ${statusColors[order.status] || "bg-gray-600"
                        }`}
                    >
                      {order.status}
                    </span>

                    {/* Small Cancel Button */}
                    {isCancellable && (
                      <button
                        onClick={() => openDeleteConfirm(order._id)}
                        title="Cancel order"
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Cancel Window Info - Only show if Pending */}
                {order.status === "Pending" && (
                  <div
                    className={`mb-3 p-2 rounded flex items-center gap-2 text-xs ${isCancellable
                        ? "bg-yellow-100 border border-yellow-300"
                        : "bg-red-100 border border-red-300"
                      }`}
                  >
                    <FaClock
                      className={isCancellable ? "text-yellow-600" : "text-red-600"}
                      size={12}
                    />
                    <p
                      className={
                        isCancellable
                          ? "text-yellow-800 font-semibold"
                          : "text-red-800 font-semibold"
                      }
                    >
                      {isCancellable
                        ? `⏱️ Cancel within ${hoursRemaining}h`
                        : "❌ Cancellation closed"}
                    </p>
                  </div>
                )}

                {/* Items - Compact */}
                <div className="mb-3">
                  <p className="text-gray-700 text-sm font-semibold mb-1">Items:</p>
                  <div className="space-y-1">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between text-gray-600 text-sm bg-gray-50 p-2 rounded"
                        >
                          <span className="truncate">
                            {item.book?.title || item.title}
                          </span>
                          <span className="text-yellow-600 font-semibold ml-2">
                            ×{item.quantity}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-xs">No items</p>
                    )}
                  </div>
                </div>

                {/* Price Summary - Compact */}
                <div className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total:</span>
                  <div className="text-right">
                    <p className="text-yellow-600 font-bold">
                      Rs. {finalTotal.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      (Delivery included)
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
