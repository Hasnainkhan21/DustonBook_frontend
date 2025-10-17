import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBlog } from "../../Services/blogService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBlogs = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await addBlog(data);
      toast.success("✅ Blog added successfully!");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-orange-600 text-center mb-4">
        Add New Blog
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Blog Title"
          className="w-full border p-2 rounded"
        />

        <textarea
          {...register("content", { required: true })}
          placeholder="Blog Content"
          className="w-full border p-2 rounded"
          rows={4}
        />

        <input
          {...register("authorName")}
          placeholder="Author Name"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("tags")}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("image")}
          type="file"
          accept="image/*"
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700 transition"
        >
          {loading ? "Uploading..." : "Add Blog"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminBlogs;
