import React, { useState } from 'react'
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import UserModal from "../components/UserModal"
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Books' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/about', label: 'About' },
  { to: '/orders', label: 'My Orders' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const { cartCount = 0 } = useCart();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 font-bold"
      : "hover:text-orange-500 transition"

  return (
    <nav className="w-full bg-white shadow-md py-1 px-6 flex items-center justify-between relative">
      {/* Logo */}
      <div className="w-13 h-13">
        <img src={logo} alt="logo..." />
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <ul className={`flex-col md:flex-row md:flex gap-6 font-[syne] text-gray-700 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent z-10 transition-all duration-300 ${menuOpen ? 'flex' : 'hidden'}`}>
        {navLinks.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} className={linkClass} end={end}>
              {label}
            </NavLink>
          </li>
        ))}
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
        <NavLink to='/cart' className="relative border-2 border-gray-300 rounded-full p-2 cursor-pointer hover:border-orange-500 transition" aria-label="View cart">
          <FaShoppingCart className="text-amber-400 text-xl" />
          {cartCount > 0 && (
            <span
              aria-live="polite"
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </NavLink>

        <div
          className="cursor-pointer text-gray-700 hover:text-orange-500 transition"
          onClick={() => setOpen(true)}
        >
          <FaUserCircle size={34} />
        </div>
        {/* Modal imported */}
        <UserModal open={open} handleClose={() => setOpen(false)} />
      </div>
    </nav>
  )
}

export default Navbar
