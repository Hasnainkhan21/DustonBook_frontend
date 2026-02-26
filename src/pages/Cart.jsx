import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingBag, FaSpinner } from "react-icons/fa";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../Services/cartService";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DeliveryCharge } from "../Services/api";
const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const { loadCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartData = async () => {
      if (!user) {
        if (!authLoading) setLoading(false);
        return;
      }

      try {
        const data = await getCart();
        setCart(data || { items: [] });
      } catch (err) {
        // Only show error for real failures, not auth/not-found issues
        if (err.response?.status !== 401 && err.response?.status !== 404) {
          console.error("Cart load error:", err);
          toast.error("❌ Failed to load cart");
        }
        setCart({ items: [] });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadCartData();
    }
  }, [user, authLoading]);

  const handleRemoveItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.book._id !== bookId),
      }));
      toast.success("✅ Book removed from cart");
      loadCart();
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("❌ Failed to remove item");
    }
  };

  const handleQty = async (bookId, newQty) => {
    if (newQty < 1) return;

    try {
      await updateCartQuantity(bookId, newQty);
      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.book._id === bookId ? { ...item, quantity: newQty } : item
        ),
      }));
      toast.success("✅ Quantity updated");
      loadCart();
    } catch (err) {
      console.error("Update qty error:", err);
      toast.error("❌ Failed to update quantity");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <FaSpinner className="animate-spin text-yellow-500 text-4xl mx-auto mb-4" />
          <p className="text-gray-500 font-medium tracking-wide">Loading your library...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
          <FaShoppingBag size={64} className="text-yellow-500 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-sm text-gray-500 mb-6">You need to be logged in to view and manage your cart.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full border border-gray-100">
          <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag size={40} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mb-2">Your cart is empty</p>
          <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added any stories to your collection yet.</p>
          <button
            onClick={() => navigate("/books")}
            className="w-full bg-yellow-500 text-black px-8 py-4 rounded-2xl hover:bg-yellow-600 font-extrabold transition-all shadow-lg active:scale-95"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + (item.book?.price || 0) * (item.quantity || 1),
    0
  );

  const shippingFee = subtotal > 2000 ? 0 : DeliveryCharge;
  const totalPrice = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          🛒 Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.book._id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <img
                    src={item.book.coverImage || "/no-image.png"}
                    alt={item.book.title}
                    className="w-24 h-32 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.book.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      by {item.book.author}
                    </p>
                    <p className="text-yellow-600 font-bold mt-2 text-lg">
                      Rs. {item.book.price?.toFixed(2) || "0.00"}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4 bg-gray-100 w-fit p-2 rounded-lg">
                      <button
                        onClick={() =>
                          handleQty(item.book._id, item.quantity - 1)
                        }
                        className="p-1.5 bg-white rounded hover:bg-gray-200 transition"
                        title="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQty(item.book._id, item.quantity + 1)
                        }
                        className="p-1.5 bg-white rounded hover:bg-gray-200 transition"
                        title="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(item.book._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      title="Remove from cart"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-xl font-bold text-yellow-600">
                        Rs. {(item.book.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-yellow-200 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Total
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-semibold">
                    Rs. {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span
                    className={`font-semibold ${shippingFee === 0
                      ? "text-green-600"
                      : "text-gray-700"
                      }`}
                  >
                    {shippingFee === 0 ? "✅ Free" : `Rs. ${shippingFee}`}
                  </span>
                </div>

                <div className="text-xs text-gray-500">
                  {shippingFee === 0
                    ? "Free shipping on orders over Rs. 2000"
                    : "Free shipping on orders over Rs. 2000"}
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-3xl font-bold text-yellow-600">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-600 transition-all active:scale-95 flex items-center justify-center gap-2 mb-3 shadow-md"
              >
                <FaShoppingBag /> Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/books")}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Cart;
