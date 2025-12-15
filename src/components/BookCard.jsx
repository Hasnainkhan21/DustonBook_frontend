import React, { useState, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { addToCart } from "../Services/cartService";
import BookModal from "./BookModal";

const BookCard = ({ book }) => {
  const { loadCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const toastShown = useRef(false);

  // modal state
  const [open, setOpen] = useState(false);

  // small helper for truncating long text
  const truncate = (text = "", len = 120) =>
    text.length > len ? text.slice(0, text.slice(0, len).lastIndexOf(" ")) + "…" : text;

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      await addToCart(book._id);

      if (!toastShown.current) {
        toast.success("✅ Book added to cart", { autoClose: 2000 });
        toastShown.current = true;
        setTimeout(() => (toastShown.current = false), 800);
      }

      await loadCart();
    } catch (err) {
      toast.error("Please login to add to cart", { autoClose: 3000 });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <article className="relative bg-gradient-to-br from-white via-orange-50 to-white rounded-3xl border border-transparent hover:border-[#FFD4A6] shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-250 overflow-hidden flex flex-col">
        {/* Image area */}
        <div
          className="relative h-56 md:h-64 overflow-hidden bg-gray-50 cursor-pointer"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Open details for ${book.title}`}
        >
          <img
            src={book.coverImage || "https://via.placeholder.com/300x420?text=No+Image"}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out transform hover:scale-105"
          />

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
            {book.stock === 0 ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600 text-white shadow-sm">Out of stock</span>
            ) : book.stock <= 3 ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400 text-black shadow-sm">Low stock</span>
            ) : null}
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 font-extrabold text-[#A72703] shadow">
            Rs {Number(book.price || 0).toFixed(2)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-md md:text-lg font-bold text-[#2b2b2b] leading-tight truncate">
                {book.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{book.author}</p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400 mt-1">{book.category}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 border border-gray-200">
                {book.stock > 0 ? `In stock: ${book.stock}` : "Sold out"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0 || isAdding}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-sm transition shadow ${
                  book.stock === 0 || isAdding
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-tr from-[#ffa200] to-[#ffb74a] text-black hover:brightness-95"
                }`}
                title={book.stock === 0 ? "Out of stock" : "Add to cart"}
              >
                <FaCartPlus className="w-4 h-4" />
                <span className="hidden sm:inline">{isAdding ? "Adding..." : "Add"}</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Book details modal */}
      <BookModal book={book} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default BookCard;
