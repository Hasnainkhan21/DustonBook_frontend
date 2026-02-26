import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../../Services/bookService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminBookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(Array.isArray(data) ? data : data.books || []);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      toast.error("Failed to load books");
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
      fetchBooks();
    }
  };

  const handleEdit = (book) => {
    navigate("/admin/books", { state: { editBook: book } }); // 👈 sends book to form
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center">
        Admin Book Management
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No books found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-yellow-50 text-yellow-800">
              <tr>
                <th className="p-3 font-semibold border-b">Title</th>
                <th className="p-3 font-semibold border-b">Author</th>
                <th className="p-3 font-semibold border-b">Price</th>
                <th className="p-3 font-semibold border-b">Stock</th>
                <th className="p-3 font-semibold border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {books.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-sm font-medium">{b.title}</td>
                  <td className="p-3 text-sm text-gray-600">{b.author}</td>
                  <td className="p-3 text-sm font-bold text-yellow-700">Rs {b.price}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${b.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {b.stock > 0 ? `In Stock (${b.stock})` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(b)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookList;
