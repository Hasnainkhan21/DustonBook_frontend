import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookOpen, FaFileAlt, FaShoppingCart, FaChartBar, FaHome, FaList, FaTimes } from "react-icons/fa";

const Sidebar = ({ open = false, setOpen = () => {} }) => {
  const { pathname } = useLocation();

  const links = [
    { path: "/admin/analytics", label: "Analytics", icon: <FaChartBar size={18} /> },
    { path: "/admin/books", label: "Add Book", icon: <FaBookOpen size={18} /> },
    { path: "booklist", label: "Book List", icon: <FaList size={18} /> },
    { path: "/admin/blogs", label: "Add Blog", icon: <FaFileAlt size={18} /> },
    { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart size={18} /> },
    {path : "blogslist", label: "Blog List", icon: <FaList size={18} /> },
  ];

  return (
    <>
      {/* Sidebar for md+ screens */}
      <div className="hidden md:block w-64 bg-white shadow-md min-h-screen p-5">
        <div className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaHome /> Admin Panel
        </div>

        <ul className="space-y-3">
          {links.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center gap-2 p-2 rounded-md ${
                  pathname === path ? "bg-orange-200 text-orange-800 font-semibold" : "hover:bg-gray-200"
                }`}
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile drawer (controlled by parent) */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />

          <nav className="relative bg-white w-64 p-5 h-full shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold flex items-center gap-2">
                <FaHome /> Admin Panel
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
                <FaTimes size={18} />
              </button>
            </div>

            <ul className="space-y-3">
              {links.map(({ path, label, icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 p-2 rounded-md ${
                      pathname === path ? "bg-orange-200 text-orange-800 font-semibold" : "hover:bg-gray-200"
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
