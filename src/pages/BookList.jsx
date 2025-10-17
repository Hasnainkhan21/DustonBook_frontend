import React, { useEffect, useState } from "react";
import { getBooks } from "../Services/bookService";
import { CircularProgress } from "@mui/material";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg">
        📚 No books available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            src={book.coverImage}
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
        </div>      
      ))}
    </div>
  );
};

export default BookList;
