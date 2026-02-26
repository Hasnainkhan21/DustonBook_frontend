import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBlog } from "../../Services/blogService";
import { toast } from "react-toastify";

const AdminBlogs = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Trim string fields and process tags
      const { image, ...rest } = data;
      const trimmedData = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ])
      );

      const processedData = {
        ...trimmedData,
        image: image, // FileList from react-hook-form
        tags: typeof data.tags === 'string'
          ? data.tags.split(',').map(t => t.trim()).filter(t => t !== "")
          : data.tags
      };

      await addBlog(processedData);
      toast.success("✅ Blog added successfully!");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-5 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl md:text-2xl font-extrabold text-yellow-600 mb-6 text-center">
        Add New Blog
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Blog Title"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
        />

        <textarea
          {...register("content", { required: true })}
          placeholder="Blog Content"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
          rows={6}
        />

        <input
          {...register("authorName")}
          placeholder="Author Name"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
        />

        <input
          {...register("tags")}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-500 outline-none"
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Blog Image</label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black w-full py-2.5 rounded-xl font-bold hover:bg-yellow-600 transition-colors shadow-md disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AdminBlogs;
