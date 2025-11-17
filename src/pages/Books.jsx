import React, { useEffect, useState } from "react";
import { getBooks } from "../Services/bookService";
import { CircularProgress } from "@mui/material";
import BookCard from "../components/BookCard";

const Book = () => {
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
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default Book;
