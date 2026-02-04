import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBooks } from "../Services/bookService";
import BookCard from "../components/BookCard";
import BooksHeader from "../components/BooksHeader";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getBooks();
        const list = Array.isArray(res) ? res : res?.data || res?.books || [];
        setBooks(list);
      } catch {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const visibleBooks = useMemo(() => {
    let list = books;

    if (selectedCategory !== "all") {
      list = list.filter(
        (b) => (b.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (debounced) {
      const q = debounced.toLowerCase();
      list = list.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.author || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [books, selectedCategory, debounced]);

  const clearFilters = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <BooksHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) =>
          cat === "all"
            ? setSearchParams({})
            : setSearchParams({ category: cat })
        }
        clearFilters={clearFilters}
      />

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div>
          Showing <strong>{visibleBooks.length}</strong> of{" "}
          <strong>{books.length}</strong> books
        </div>

        {(searchTerm || selectedCategory !== "all") && (
          <button
            onClick={clearFilters}
            className="text-orange-600 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="p-6 bg-red-50 rounded text-red-700">{error}</div>
      )}

      {!error && visibleBooks.length === 0 && (
        <div className="p-8 bg-white rounded shadow text-center">
          <p className="text-gray-700 font-semibold mb-2">No results found</p>
          <p className="text-sm text-gray-400">
            Try another search or category.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
