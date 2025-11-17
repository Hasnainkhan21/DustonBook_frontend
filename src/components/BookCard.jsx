import React, { useState, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext"; 
import { addToCart } from "../Services/cartService";

const BookCard = ({ book }) => {
  const { loadCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const toastShown = useRef(false);

  const handleAddToCart = async () => {
    if (isAdding) return;

    setIsAdding(true);
    try {
      await addToCart(book._id);

      // Show toast only once
      if (!toastShown.current) {
        toast.success("✅ Book added to cart!", { autoClose: 2500 });
        toastShown.current = true;
        setTimeout(() => (toastShown.current = false), 500);
      }

      await loadCart(); // update global cart count
    } catch (err) {
      toast.error("Please login to add to cart", { autoClose: 3000 });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col">
      <img
        src={book.coverImage || "https://via.placeholder.com/150x220"}
        alt={book.title}
        className="h-48 w-full object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-bold text-orange-600">{book.title}</h3>
      <p className="text-gray-700 text-sm">by {book.author}</p>
      <p className="text-gray-500 text-sm">{book.category}</p>
      <p className="mt-2 text-gray-800 font-semibold">Rs. {book.price}</p>
      <p className="text-sm text-gray-500">
        Stock: {book.stock > 0 ? book.stock : "Out of stock"}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={book.stock === 0 || isAdding}
        className={`mt-3 w-full py-2.5 rounded-xl font-semibold transition
          ${book.stock === 0 || isAdding
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#ffa200] text-black active:bg-[#e49813] hover:shadow-md active:scale-95"
          } flex items-center justify-center gap-2`}
      >
        {isAdding ? "Adding..." : book.stock === 0 ? "Out of Stock ❌" : "Add to Cart"}
        {!isAdding && <FaCartPlus />}
      </button>
    </div>
  );
};

export default BookCard;
