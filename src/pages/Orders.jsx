import React, { useEffect, useState } from "react";
import { getMyOrders, deleteOrder } from "../Services/orderService";
import { DELIVERY_CHARGE, FREE_SHIPPING_THRESHOLD } from "../Services/api";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FaTrash, FaClock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const STATUS_COLORS = {
  pending: "bg-yellow-600",
  processing: "bg-blue-600",
  shipped: "bg-purple-600",
  delivered: "bg-green-600",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(Array.isArray(data) ? data : data?.orders || []);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Real-time order status updates via Socket.IO
  useEffect(() => {
    if (!user) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3006");

    socket.on("orderStatusUpdated", (updatedOrder) => {
      if (!updatedOrder || updatedOrder.user?._id !== user._id) return;
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
      toast.info(`Order status updated: ${updatedOrder.status}`);
    });

    return () => {
      socket.off("orderStatusUpdated");
      socket.disconnect();
    };
  }, [user]);

  const canCancelOrder = (createdAt) => {
    const diffHours = (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);
    return diffHours < 24;
  };

  const getHoursRemaining = (createdAt) => {
    const diffHours = (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);
    return Math.ceil(24 - diffHours);
  };

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
      setOrders((prev) => prev.filter((o) => o._id !== deletingOrderId));
      toast.success("Order cancelled successfully");
    } catch {
      toast.error("Failed to cancel order");
    } finally {
      setDeletingOrderId(null);
      setConfirmOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-yellow-600">📦 My Orders</h1>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Cancel Order?</DialogTitle>
        <DialogContent>
          <p className="text-gray-700 mt-2">
            Are you sure you want to cancel this order? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="inherit">No, Keep It</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
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
            const isPending = order.status?.toLowerCase() === "pending";
            const isCancellable = isPending && canCancelOrder(order.createdAt);
            const hoursRemaining = getHoursRemaining(order.createdAt);
            const shippingFee = order.totalAmount > FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_CHARGE;
            const finalTotal = order.totalAmount + shippingFee;
            const statusKey = order.status?.toLowerCase();

            return (
              <div
                key={order._id}
                className="bg-white p-5 rounded-lg shadow border-l-4 border-yellow-500 hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded text-white font-semibold ${STATUS_COLORS[statusKey] || "bg-gray-600"
                        }`}
                    >
                      {order.status}
                    </span>
                    {isCancellable && (
                      <button
                        onClick={() => openDeleteConfirm(order._id)}
                        aria-label="Cancel order"
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Cancel window info */}
                {isPending && (
                  <div
                    className={`mb-3 p-2 rounded flex items-center gap-2 text-xs ${isCancellable
                        ? "bg-yellow-100 border border-yellow-300"
                        : "bg-red-100 border border-red-300"
                      }`}
                  >
                    <FaClock
                      size={12}
                      className={isCancellable ? "text-yellow-600" : "text-red-600"}
                    />
                    <p className={`font-semibold ${isCancellable ? "text-yellow-800" : "text-red-800"}`}>
                      {isCancellable
                        ? `⏱️ Cancel within ${hoursRemaining}h`
                        : "❌ Cancellation window closed"}
                    </p>
                  </div>
                )}

                {/* Items */}
                <div className="mb-3">
                  <p className="text-gray-700 text-sm font-semibold mb-1">Items:</p>
                  <div className="space-y-1">
                    {order.items?.length > 0 ? (
                      order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between text-gray-600 text-sm bg-gray-50 p-2 rounded"
                        >
                          <span className="truncate">{item.book?.title || item.title}</span>
                          <span className="text-yellow-600 font-semibold ml-2">×{item.quantity}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-xs">No items</p>
                    )}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total:</span>
                  <div className="text-right">
                    <p className="text-yellow-600 font-bold">Rs. {finalTotal.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">(Delivery included)</p>
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
