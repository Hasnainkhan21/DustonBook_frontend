import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBook, updateBook } from "../../Services/bookService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";

const AdminBooks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editBook = location.state?.editBook || null;

  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Literature",
    "Philosophy",
    "Politics",
    "Literary Critics",
    "Afghan Politics",
    "Khudai Khidmatgar Literature",
    "Bacha Khan Literature",
    "Other books",
  ];

  useEffect(() => {
    if (editBook) {
      Object.keys(editBook).forEach((key) => {
        if (key !== "coverImage") setValue(key, editBook[key]);
      });
    } else reset();
  }, [editBook, setValue, reset]);

  const onSubmit = async (data) => {
    setError("");

    // Trim all string fields
    const trimmedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    // Validation
    if (!trimmedData.title || trimmedData.title.length < 3) {
      setError("Title is required (min 3 characters)");
      return;
    }
    if (!trimmedData.author || trimmedData.author.length < 2) {
      setError("Author is required (min 2 characters)");
      return;
    }
    if (!trimmedData.category) {
      setError("Please select a category");
      return;
    }
    if (!trimmedData.price || trimmedData.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }
    if (!trimmedData.stock || trimmedData.stock < 0) {
      setError("Stock cannot be negative");
      return;
    }
    if (!trimmedData.description || trimmedData.description.length < 10) {
      setError("Description is required (min 10 characters)");
      return;
    }

    setLoading(true);
    try {
      if (editBook) {
        await updateBook(editBook._id, trimmedData);
        toast.success("✅ Book updated successfully!");
      } else {
        await addBook(trimmedData);
        toast.success("✅ Book added successfully!");
      }
      navigate("/admin/booklist");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-5 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl md:text-2xl font-extrabold text-yellow-600 mb-6 text-center">
        {editBook ? "Edit Book" : "Add New Book"}
      </h2>

      {error && (
        <Alert severity="error" className="mb-6 rounded-xl">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            {...register("title", { required: true, minLength: 3 })}
            placeholder="Enter book title"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            {...register("author", { required: true, minLength: 2 })}
            placeholder="Enter author name"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none bg-white"
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            {...register("price", { required: true, min: 0 })}
            type="number"
            placeholder="Enter price"
            step="0.01"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock *
          </label>
          <input
            {...register("stock", { required: true, min: 0 })}
            type="number"
            placeholder="Enter stock quantity"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            {...register("description", { required: true, minLength: 10 })}
            placeholder="Enter book description"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
            rows={4}
          />
        </div>

        {/* Cover Image */}
        <div className="bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Book Cover Image
          </label>

          {/* Existing Image Preview */}
          {editBook && editBook.coverImage && (
            <div className="mb-4 flex items-center gap-4 p-2 bg-white rounded-md border shadow-sm">
              <img
                src={editBook.coverImage}
                alt="Current Cover"
                className="w-16 h-20 object-cover rounded shadow-sm border border-yellow-200"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x200?text=Error";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-yellow-600 font-bold mb-1">Current Image</p>
                <p className="text-xs text-gray-600 truncate font-mono bg-gray-100 p-1 rounded" title={editBook.coverImage}>
                  {editBook.coverImage.split('/').pop()}
                </p>
              </div>
            </div>
          )}

          <input
            type="file"
            {...register("coverImage")}
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer"
          />
          <p className="text-[10px] text-gray-400 mt-2">
            Leave empty to keep the existing image when editing.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-bold py-2.5 rounded-xl transition shadow-md"
        >
          {loading ? "Saving..." : editBook ? "Update Book" : "Add Book"}
        </button>
      </form>


    </div>
  );
};

export default AdminBooks;
