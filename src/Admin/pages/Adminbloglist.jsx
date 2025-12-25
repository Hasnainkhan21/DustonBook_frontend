import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../Services/blogService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // ✅ Load all blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(Array.isArray(data) ? data : []); // safety check
    } catch (err) {
      toast.error("Failed to load blogs");
    }
  };

  // ✅ Delete a blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        toast.success("Blog deleted successfully!");
        fetchBlogs(); // Refresh after delete
      } catch (err) {
        toast.error("Failed to delete blog");
      }
    }
  };

  // ✅ Edit blog (go to add/edit page)
  const handleEdit = (blog) => {
    navigate("/admin/blogs", { state: { editBlog: blog } });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
        Admin Blog Management
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Tags</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id}>
                <td className="p-2 border">{b.title}</td>
                <td className="p-2 border">{b.authorName || "Admin"}</td>
                <td className="p-2 border">
                  {b.tags?.length > 0 ? b.tags.join(", ") : "—"}
                </td>
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


    </div>
  );
};

export default AdminBlogList;
