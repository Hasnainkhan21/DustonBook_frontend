import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeBlog } from "../Services/blogService"; // Make sure path is correct

const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes || 0);
  const [expanded, setExpanded] = useState(false);

  const handleLike = async () => {
    // Optimistically update UI
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount(prev => Math.max(0, prev + (newLiked ? 1 : -1)));

    try {
      // Send PUT request to backend
      const res = await likeBlog(blog._id);

      // Update likes from backend response (to sync with DB)
      if (res?.likes != null) setLikesCount(res.likes);
    } catch (err) {
      console.error("Error liking blog:", err);

      // Rollback UI if request fails
      setIsLiked(prev => !prev);
      setLikesCount(prev => Math.max(0, prev + (isLiked ? 1 : -1)));
    }
  };

  const truncateLimit = 150;
  const content = blog.content || "";
  const isLongContent = content.length > truncateLimit;

  const truncated = (text, limit) => {
    if (text.length <= limit) return text;
    const slice = text.slice(0, limit);
    const lastSpace = slice.lastIndexOf(" ");
    return slice.slice(0, lastSpace > 0 ? lastSpace : limit) + "...";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
      
      {/* Blog Image */}
      {blog.image && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
        
        <p className="text-gray-700 text-sm mb-4">
          {expanded ? content : truncated(content, truncateLimit)}
          {isLongContent && (
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
            {blog.authorName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <div className="font-medium text-sm text-gray-800">{blog.authorName || "Unknown"}</div>
            <div className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-3 flex justify-between items-center bg-gray-50/50">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors text-sm ${
            isLiked
              ? "text-red-600 bg-red-100 hover:bg-red-200"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span className="font-medium">Like</span>
        </button>

        <div className="text-sm text-gray-600">
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </div>
      </div>
      
    </div>
  );
};

export default BlogCard;
