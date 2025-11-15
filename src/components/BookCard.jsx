// src/components/BookCard.jsx
import React from "react";
import { Button } from "@mui/material";
import { addToCart } from "../Services/cartService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookCard = ({ book }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(book._id);
      toast.success("✅ Book added to cart!", {
        position: "top-right",
        autoClose: 2500,
      });
    } catch (err) {
      toast.error("Please login to add to cart", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={book.coverImage}
        alt={book.title}
        className="h-48 w-full object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-bold text-orange-600">{book.title}</h3>
      <p className="text-gray-700 text-sm">by {book.author}</p>
      <p className="text-gray-500 text-sm">{book.category}</p>
      <p className="mt-2 text-gray-800 font-semibold">Rs. {book.price}</p>

      <p className="text-sm text-gray-500 mb-2">
        Stock: {book.stock > 0 ? book.stock : "Out of stock"}
      </p>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={book.stock === 0}
        onClick={handleAddToCart}
      >
        {book.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
      <ToastContainer />
    </div>
  );
};

export default BookCard;
