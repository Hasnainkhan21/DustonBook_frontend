import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBook, updateBook } from "../../Services/bookService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Alert from "@mui/material/Alert";

const AdminBooks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editBook = location.state?.editBook || null;

  const { register, handleSubmit, setValue, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editBook) {
      Object.keys(editBook).forEach((key) => {
        if (key !== "coverImage") setValue(key, editBook[key]);
      });
    } else reset();
  }, [editBook, setValue, reset]);

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      if (editBook) {
        await updateBook(editBook._id, data);
        toast.success("✅ Book updated successfully!");
      } else {
        await addBook(data);
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
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
        {editBook ? "Edit Book" : "Add New Book"}
      </h2>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("title")} placeholder="Title" className="w-full border p-2 rounded" />
        <input {...register("author")} placeholder="Author" className="w-full border p-2 rounded" />
        <input {...register("category")} placeholder="Category" className="w-full border p-2 rounded" />
        <input {...register("price")} type="number" placeholder="Price" className="w-full border p-2 rounded" />
        <input {...register("stock")} type="number" placeholder="Stock" className="w-full border p-2 rounded" />
        <textarea {...register("description")} placeholder="Description" className="w-full border p-2 rounded" rows={4} />
        <input type="file" {...register("coverImage")} accept="image/*" className="w-full" />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700"
        >
          {loading ? "Saving..." : editBook ? "Update Book" : "Add Book"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminBooks;
