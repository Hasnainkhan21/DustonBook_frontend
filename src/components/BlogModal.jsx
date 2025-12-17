import React, { useEffect } from 'react';

const BlogModal = ({ blog = {}, isOpen = false, onClose = () => {} }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 overflow-auto max-h-[90vh] shadow-lg">
        <div className="p-4 border-b flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
            <div className="text-sm text-gray-500">{blog.authorName || 'Unknown'}{blog.createdAt ? ` • ${new Date(blog.createdAt).toLocaleDateString()}` : ''}</div>
          </div>

          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
        </div>

        {blog.image && (
          <div className="w-full h-64 overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-5 text-gray-800 whitespace-pre-line">{blog.content}</div>
      </div>
    </div>
  );
};

export default BlogModal;
