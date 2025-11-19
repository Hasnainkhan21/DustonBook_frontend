import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../Services/cartService";
import { placeOrder } from "../Services/orderService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { DeliveryCharge } from "../Services/api";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan"
    }
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (err) {
        console.error("getCart error:", err);
        toast.error("Failed to load cart. Please refresh or login.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading checkout...</div>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        Your cart is empty.
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, it) => sum + (it.book?.price || 0) * (it.quantity || 0),
    0
  );
  const shippingFee = subtotal > 2000 ? 0 : DeliveryCharge;
  const total = subtotal + shippingFee;

  const onSubmit = async (raw) => {
    // trim all string fields
    const shippingDetails = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );

    // additional simple checks
    if (!shippingDetails.fullName || shippingDetails.fullName.length < 3) {
      toast.error("Please enter a valid full name (min 3 characters)");
      return;
    }
    if (!/^\+?[0-9]{10,15}$/.test(shippingDetails.phone)) {
      toast.error("Please enter a valid phone number (10-15 digits)");
      return;
    }
    if (!shippingDetails.address || shippingDetails.address.length < 5) {
      toast.error("Please enter a valid address");
      return;
    }

    setPlacing(true);
    try {
      await placeOrder({ shippingDetails });
      toast.success("Order placed successfully!");
      reset();
      navigate("/orders");
    } catch (err) {
      console.error("placeOrder error:", err);
      toast.error(err?.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#A72703]">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full name *</label>
            <input
              {...register("fullName", { required: true, minLength: 3 })}
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#FCB53B] outline-none"
              placeholder="John Doe"
              aria-invalid={errors.fullName ? "true" : "false"}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">Full name is required (min 3 chars)</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone *</label>
            <input
              {...register("phone", { required: true, pattern: /^\+?[0-9]{10,15}$/ })}
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#FCB53B] outline-none"
              placeholder="+923XXXXXXXXX or 03XXXXXXXXX"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">Enter a valid phone (10-15 digits)</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Address *</label>
            <input
              {...register("address", { required: true, minLength: 5 })}
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#FCB53B] outline-none"
              placeholder="Street, House, Apartment"
              aria-invalid={errors.address ? "true" : "false"}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">Address is required (min 5 chars)</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              {...register("city")}
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#FCB53B] outline-none"
              placeholder="Karachi, Lahore..."
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">Enter a valid city</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Postal code</label>
            <input
              {...register("postalCode", { pattern: /^[0-9A-Za-z\- ]{3,10}$/ })}
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#FCB53B] outline-none"
              placeholder="Postal Code"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">Enter a valid postal code</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              {...register("country")}
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#FCB53B] outline-none"
              placeholder="Pakistan"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">Enter a valid country</p>
            )}
          </div>

          {/* Mobile submit for smaller screens */}
          <div className="md:hidden mt-2">
            <button
              type="submit"
              disabled={placing}
              className="w-full py-3 rounded-xl font-semibold transition bg-[#FCB53B] hover:bg-[#A72703] text-white"
            >
              {placing ? <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Placing...</span> : `Place Order • Rs. ${total.toFixed(2)}`}
            </button>
          </div>
        </form>

        {/* Order Summary */}
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-3">Order Summary</h3>

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
            <span className="font-semibold">{shippingFee === 0 ? "Free" : `Rs. ${shippingFee}`}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>

          <div className="hidden md:block mt-4">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={placing}
              className="w-full py-3 rounded-xl font-semibold transition bg-[#FCB53B] active:bg-[#A72703] text-white"
            >
              {placing ? <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Placing...</span> : `Place Order • Rs. ${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
