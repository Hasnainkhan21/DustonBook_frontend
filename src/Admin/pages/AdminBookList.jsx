import React, { useEffect, useState } from "react";
import { getBooks, deleteBook} from "../../Services/bookService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">
        Admin Book Management
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id}>
                <td className="p-2 border">{b.title}</td>
                <td className="p-2 border">{b.author}</td>
                <td className="p-2 border">{b.price}</td>
                <td className="p-2 border">{b.stock}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleEdit(b)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminBookList;
