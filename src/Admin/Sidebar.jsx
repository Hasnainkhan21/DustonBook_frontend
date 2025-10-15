import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookOpen, FaFileAlt, FaShoppingCart, FaChartBar, FaHome, FaList} from "react-icons/fa";

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { path: "/admin/analytics", label: "Analytics", icon: <FaChartBar size={18} /> },
    { path: "/admin/books", label: "Add Book", icon: <FaBookOpen size={18} /> },
    { path: "booklist", label: "Book List", icon: <FaList size={18} /> },
    { path: "/admin/blogs", label: "Blogs", icon: <FaFileAlt size={18} /> },
    { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart size={18} /> },

  ];

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-5">
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
  );
};

export default Sidebar;
