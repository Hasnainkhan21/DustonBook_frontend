import React, { useEffect, useState } from "react";
import { getBlogs } from "../Services/blogService";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        const list = Array.isArray(data) ? data : data?.blogs || [];
        setBlogs(list);
      } catch (err) {
        setError("Failed to load stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 animate-pulse">Fetching stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Blog</h1>
          <p className="text-gray-600">Stories, reviews, and literary news from Dust on Book.</p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <p className="text-gray-500 text-lg">No stories found yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
