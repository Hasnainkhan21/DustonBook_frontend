import React, { useEffect, useState } from "react";
import { getBlogs } from "../Services/blogService";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">No blogs found</p>
      )}
    </div>
  );
};

export default Blogs;
