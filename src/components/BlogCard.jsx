import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeBlog } from "../Services/blogService";

const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes || 0);
  const [expanded, setExpanded] = useState(false);

  const truncated = (text, limit = 240) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    const slice = text.slice(0, limit);
    const lastSpace = slice.lastIndexOf(" ");
    return slice.slice(0, lastSpace > 0 ? lastSpace : limit) + "...";
  };

  const handleLike = async () => {
    const newLiked = !isLiked;
    // optimistic UI
    setIsLiked(newLiked);
    setLikesCount((prev) => Math.max(0, prev + (newLiked ? 1 : -1)));

    try {
      const res = await likeBlog(blog._id);
      // if backend returns updated likes, use it
      if (res?.likes != null) setLikesCount(res.likes);
    } catch (err) {
      // revert on error
      console.error("Error liking blog:", err);
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => Math.max(0, prev + (isLiked ? 1 : -1))); // revert the optimistic change
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 mb-6">
      {/* Header: simple avatar + author + date */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {blog.authorName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{blog.authorName || "Unknown"}</div>
            <div className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h2>

        {blog.image && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img src={blog.image} alt={blog.title} className="w-full object-cover max-h-72" />
          </div>
        )}

        <p className="text-gray-700 mb-3">
          {expanded ? blog.content : truncated(blog.content, 240)}
          {blog.content && blog.content.length > 240 && (
            <button
              onClick={() => setExpanded((s) => !s)}
              className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {/* Reactions row */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-1">
              <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white"></div>
              <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div>{likesCount} {likesCount === 1 ? "like" : "likes"}</div>
          </div>

          <div className="text-gray-500">{/* space for potential metadata */}</div>
        </div>

        {/* Like button */}
        <div className="mt-3 border-t pt-3 flex">
          <button
            onClick={handleLike}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-md transition-colors ${
              isLiked ? "text-red-600 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span className="font-medium">Like</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;