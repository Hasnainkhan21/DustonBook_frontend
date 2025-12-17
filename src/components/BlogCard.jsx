import React, { useState } from "react";
import BlogModal from "./BlogModal";

const BlogCard = ({ blog }) => {
  const [isOpen, setIsOpen] = useState(false);

  const truncate = (text = "", limit = 140) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    const slice = text.slice(0, limit);
    const lastSpace = slice.lastIndexOf(" ");
    return slice.slice(0, lastSpace > 0 ? lastSpace : limit) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md mb-6">

      {blog.image && (
        <div className="h-44 w-full overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>

        <p className="text-gray-700 text-sm mb-4">{truncate(blog.content, 140)}</p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-800">{blog.authorName || "Unknown"}</div>
            <div className="text-xs text-gray-500">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="ml-4 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            View
          </button>
        </div>
      </div>

      <BlogModal blog={blog} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default BlogCard;
