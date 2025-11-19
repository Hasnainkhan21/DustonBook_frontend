import React, { useEffect, useState } from "react";
import { getMyOrders } from "../Services/orderService";
import { DeliveryCharge } from "../Services/api";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then((res) => {
      setOrders(res.data || []);
    });
  }, []);

  // derive current user id from localStorage (adjust if your auth stores user elsewhere)
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || localStorage.getItem("profile") || "null");
    } catch {
      return null;
    }
  })();
  const userId = user?.result?._id || user?._id || user?.id || null;

  // Real-time listener for updates to this user's orders
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("orderStatusUpdated", (updatedOrder) => {
      if (!updatedOrder) return;
      if (updatedOrder.user?._id !== userId) return; // only update THIS user's orders

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

  const statusColors = {
    Pending: "bg-yellow-600",
    Processing: "bg-blue-600",
    shipped: "bg-purple-600",
    delivered: "bg-green-600",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[#FCB53B]">📦 My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-300 text-lg text-center mt-10">
          You have no orders yet.
        </p>
      )}

      {orders.map((order) => {
        const subtotal = order.totalAmount;
        const shippingFee = subtotal > 2000 ? 0 : DeliveryCharge;
        const finalTotal = subtotal + shippingFee;

        return (
          <div
            key={order._id}
            className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg mb-6 border border-[#A72703]"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Order #{order._id.slice(-6)}
              </h2>

              <span
                className={`px-3 py-1 text-sm rounded-lg text-white font-semibold ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            {/* Date */}
            <p className="mt-1 text-gray-400 text-sm">
              Placed on:{" "}
              <span className="text-gray-200 font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </p>

            {/* Items */}
            <h3 className="mt-4 mb-2 font-semibold text-lg text-[#FCB53B]">
              Items Ordered:
            </h3>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between bg-[#222] p-3 rounded-lg"
                >
                  <span>{item.book?.title}</span>
                  <span className="text-[#FCB53B]">
                    × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="mt-5 p-4 bg-[#111] rounded-lg border border-[#A72703]">
              <hr className="my-3 border-gray-700" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>

                <div className="text-right">
                  <h1 className="text-[#FCB53B]">Rs. {finalTotal}</h1>
                  <p className="text-sm font-normal text-gray-600 mt-[-6px]">
                    Included Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
