import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { getCart, removeFromCart, updateCartQuantity } from "../Services/cartService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  // Load cart only on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCart(data || { items: [] });
      } catch (err) {
        console.error("Cart load error:", err);
        toast.error("❌ Failed to load cart");
        setCart({ items: [] });
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Remove item - update state directly
  const handleRemoveItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.book._id !== bookId),
      }));
      toast.success("✅ Book removed from cart");
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("❌ Failed to remove item");
    }
  };

  // Update quantity - update state directly
  const handleQty = async (bookId, newQty) => {
    if (newQty < 1) return;

    try {
      await updateCartQuantity(bookId, newQty);
      // Update UI immediately
      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.book._id === bookId ? { ...item, quantity: newQty } : item
        ),
      }));
      toast.success("✅ Quantity updated");
    } catch (err) {
      console.error("Update qty error:", err);
      toast.error("❌ Failed to update quantity");
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading cart...</div>;
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="text-center text-gray-600 p-6 min-h-screen">
        Your cart is empty.
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + (item.book?.price || 0) * (item.quantity || 1),
    0
  );

  const shippingFee = subtotal > 2000 ? 0 : 200;
  const totalPrice = subtotal + shippingFee;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">🛒 Your Cart</h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.book._id}
            className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={item.book.coverImage || "/no-image.png"}
              alt={item.book.title}
              className="w-20 h-28 rounded object-cover"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.book.title}</h3>
              <p className="text-gray-600 text-sm">by {item.book.author}</p>
              <p className="text-orange-600 font-bold mt-1">
                Rs. {item.book.price?.toFixed(2) || "0.00"}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-100 p-2 rounded">
              <button
                onClick={() => handleQty(item.book._id, item.quantity - 1)}
                className="p-1 bg-white rounded hover:bg-gray-200 transition"
                title="Decrease quantity"
              >
                <FaMinus size={12} />
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => handleQty(item.book._id, item.quantity + 1)}
                className="p-1 bg-white rounded hover:bg-gray-200 transition"
                title="Increase quantity"
              >
                <FaPlus size={12} />
              </button>
            </div>

            {/* Total Price */}
            <div className="w-28 text-right">
              <p className="font-bold text-lg">
                Rs. {(item.book.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveItem(item.book._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
              title="Remove from cart"
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg shadow border border-orange-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">📋 Order Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span className={shippingFee === 0 ? "text-green-600 font-bold" : ""}>
              {shippingFee === 0 ? "✅ Free" : `Rs. ${shippingFee}`}
            </span>
          </div>

          <hr className="my-3 border-orange-200" />

          <div className="flex justify-between text-lg font-bold text-orange-600">
            <span>Total</span>
            <span>Rs. {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
          Proceed to Checkout
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Cart;
