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
      // handle various response shapes
      const list = Array.isArray(data) ? data : data?.blogs || data?.data || [];
      setBlogs(list);
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



  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center">
        Admin Blog Management
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No blogs found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-yellow-50 text-yellow-800">
              <tr>
                <th className="p-3 font-semibold border-b">Title</th>
                <th className="p-3 font-semibold border-b">Author</th>
                <th className="p-3 font-semibold border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-sm font-medium">{b.title}</td>
                  <td className="p-3 text-sm text-gray-600">{b.authorName || "Admin"}</td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
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

export default AdminBlogList;
