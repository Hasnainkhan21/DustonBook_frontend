import React from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'
import { FaShoppingCart } from "react-icons/fa";
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-1 px-6 flex flex-wrap items-center justify-between">
      {/* Logo */}
      <div className="w-13 h-13 ">
        <img src={logo} alt="logo..." />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 font-[syne] text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "hover:text-orange-500 transition"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "hover:text-orange-500 transition"
            }
          >
            Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "hover:text-orange-500 transition"
            }
          >
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "hover:text-orange-500 transition"
            }
          >
            About
          </NavLink>
        </li>
        <li>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0">
        <input
          type="text"
          placeholder="Search books..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="bg-[#BF092F] text-white px-4 py-3 rounded-lg active:bg-[#e63057] transition">
          <FaSearch />
        </button>
      </div>

      {/* Cart and User Section */}
      <div className="flex items-center gap-5 mt-3 md:mt-0">
        {/* Cart */}
        <NavLink to='/cart' className="relative border-2 border-gray-300 rounded-full p-2 cursor-pointer hover:border-orange-500 transition">
          <FaShoppingCart className="text-amber-400 text-xl" />
        </NavLink>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUser className="text-2xl text-gray-700" /> 
        </div>
      </div>
    </nav>
  )
}

export default Navbar
