import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../Services/cartService";
import { placeOrder } from "../Services/orderService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { DELIVERY_CHARGE, FREE_SHIPPING_THRESHOLD } from "../Services/api";

const PHONE_REGEX = /^\+?[0-9]{10,15}$/;
const POSTAL_REGEX = /^[0-9A-Za-z\- ]{3,10}$/;

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
    },
  });

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch {
        toast.error("Failed to load cart. Please refresh or login.");
      } finally {
        setLoading(false);
      }
    };
    loadCartData();
  }, []);

  const onSubmit = async (raw) => {
    // Trim all string fields
    const shippingDetails = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );

    setPlacing(true);
    try {
      await placeOrder({ shippingDetails });
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  const PlaceOrderButton = () => (
    <button
      onClick={handleSubmit(onSubmit)}
      disabled={placing}
      className="w-full py-3 rounded-xl font-bold transition bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black shadow-md flex items-center justify-center gap-2"
    >
      {placing ? (
        <>
          <FaSpinner className="animate-spin" /> Placing...
        </>
      ) : (
        `Place Order • Rs. ${total.toFixed(2)}`
      )}
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="p-6 text-center text-gray-600 min-h-screen flex items-center justify-center">
        <div>
          <p className="text-xl font-semibold mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/books")}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition"
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, it) => sum + (it.book?.price || 0) * (it.quantity || 0),
    0
  );
  const shippingFee = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = subtotal + shippingFee;

  const inputClass =
    "mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-yellow-500 outline-none transition";

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-yellow-600">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium" htmlFor="fullName">Full name *</label>
            <input
              id="fullName"
              {...register("fullName", { required: "Full name is required", minLength: { value: 3, message: "Min 3 characters" } })}
              className={inputClass}
              placeholder="John Doe"
              autoComplete="name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="phone">Phone *</label>
            <input
              id="phone"
              {...register("phone", {
                required: "Phone is required",
                pattern: { value: PHONE_REGEX, message: "Enter a valid phone (10-15 digits)" },
              })}
              className={inputClass}
              placeholder="+923XXXXXXXXX or 03XXXXXXXXX"
              autoComplete="tel"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="address">Address *</label>
            <input
              id="address"
              {...register("address", { required: "Address is required", minLength: { value: 5, message: "Min 5 characters" } })}
              className={inputClass}
              placeholder="Street, House, Apartment"
              autoComplete="street-address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="city">City</label>
            <input
              id="city"
              {...register("city")}
              className={inputClass}
              placeholder="Karachi, Lahore..."
              autoComplete="address-level2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="postalCode">Postal code</label>
            <input
              id="postalCode"
              {...register("postalCode", {
                pattern: { value: POSTAL_REGEX, message: "Enter a valid postal code" },
              })}
              className={inputClass}
              placeholder="Postal Code"
              autoComplete="postal-code"
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="country">Country</label>
            <input
              id="country"
              {...register("country")}
              className={inputClass}
              placeholder="Pakistan"
              autoComplete="country-name"
            />
          </div>

          {/* Mobile submit */}
          <div className="md:hidden mt-2">
            <PlaceOrderButton />
          </div>
        </form>

        {/* Order Summary */}
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-3">Order Summary</h2>

          <div className="space-y-2 max-h-64 overflow-auto mb-3">
            {cart.items.map((it) => (
              <div key={it.book._id} className="flex justify-between">
                <div>
                  <div className="font-medium truncate max-w-xs">{it.book.title}</div>
                  <div className="text-xs text-gray-500">Qty: {it.quantity}</div>
                </div>
                <div className="font-semibold">Rs. {(it.book.price * it.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <hr className="my-3" />
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700">Subtotal</span>
            <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-700">Shipping</span>
            <span className={`font-semibold ${shippingFee === 0 ? "text-green-600" : ""}`}>
              {shippingFee === 0 ? "Free" : `Rs. ${shippingFee}`}
            </span>
          </div>
          {shippingFee === 0 && (
            <p className="text-xs text-green-600 mb-3">
              ✅ Free shipping applied (order over Rs. {FREE_SHIPPING_THRESHOLD})
            </p>
          )}

          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>

          {/* Desktop submit */}
          <div className="hidden md:block mt-4">
            <PlaceOrderButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
