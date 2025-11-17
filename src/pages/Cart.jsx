import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../Services/cartService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const { loadCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartData = async () => {
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
    loadCartData();
  }, []);

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

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading cart...</div>;
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <FaShoppingBag size={80} className="text-gray-300 mb-4" />
        <p className="text-2xl font-semibold">Your cart is empty</p>
        <button
          onClick={() => navigate("/books")}
          className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
        >
          Continue Shopping
        </button>
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
    <div className="min-h-screen bg-gray-50 py-8">
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
                    <p className="text-orange-600 font-bold mt-2 text-lg">
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
                      <p className="text-xl font-bold text-orange-600">
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
            <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200 sticky top-8">
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
                    className={`font-semibold ${
                      shippingFee === 0
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
                <span className="text-3xl font-bold text-orange-600">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mb-3"
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
