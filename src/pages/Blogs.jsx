import React, { useEffect, useState } from "react";
import { getBlogs } from "../Services/blogService";
import BlogCard from "../components/BlogCard";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlogs();
        const list = Array.isArray(data) ? data : data?.blogs || [];
        setBlogs(list);
      } catch (err) {
        console.error("Failed fetching blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (

      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <section>
      <Navbar />
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id || blog.id} blog={blog} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">No blogs found</p>
      )}
    </div>
    </section>
  );
};

export default Blogs;
