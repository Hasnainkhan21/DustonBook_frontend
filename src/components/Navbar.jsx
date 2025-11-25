import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import UserModal from "../components/UserModal";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/books", label: "Books" },
  { to: "/blogs", label: "Blogs" },
  { to: "/about", label: "About" },
  { to: "/orders", label: "My Orders" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount = 0 } = useCart();

  // close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive ? "text-yellow-500 font-bold" : "hover:text-orange-500 transition";

  // close menu when navigating
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-white shadow-md py-3 px-4 md:px-8 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* left */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button
            className="md:hidden text-2xl text-gray-700 p-2 rounded hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="flex items-center gap-2 md:gap-4 cursor-pointer">
            <img
              src={logo}
              alt="Dust on Book"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="hidden md:block">
              <div className="text-lg font-extrabold text-[#1f2937]">
                Dust on Book
              </div>
              <div className="text-xs text-gray-400 -mt-0.5">Books & More</div>
            </div>
          </div>
        </div>

        {/* center - desktop links */}
        <ul className="hidden md:flex items-center gap-6 font-[syne] text-gray-700">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} className={linkClass} end={end}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* right */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* search - compact */}
          <button className="hidden md:flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:brightness-95 transition text-sm">
            <FaSearch />
            <span className="hidden lg:inline">Search</span>
          </button>

          <NavLink
            to="/cart"
            className="relative border-2 border-gray-200 rounded-full p-2 cursor-pointer hover:border-orange-500 transition"
            aria-label="View cart"
          >
            <FaShoppingCart className="text-amber-400 text-lg md:text-xl" />
            {cartCount > 0 && (
              <span
                aria-live="polite"
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </NavLink>

          <button
            className="cursor-pointer text-gray-700 hover:text-orange-500 transition p-1"
            onClick={() => setOpen(true)}
            aria-label="Open user menu"
          >
            <FaUserCircle size={34} />
          </button>
          <UserModal open={open} handleClose={() => setOpen(false)} />
        </div>
      </div>

      {/* mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`fixed top-14 left-4 right-4 mx-auto bg-white rounded-xl shadow-xl border border-gray-100 transform transition-all duration-300 overflow-hidden ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
                <div>
                  <div className="text-sm font-bold">Dust on Book</div>
                  <div className="text-xs text-gray-400">Explore books</div>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <nav>
              <ul className="flex flex-col gap-3 text-gray-700">
                {navLinks.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                          isActive
                            ? "bg-[#FFF3E5] text-[#A72703] font-bold"
                            : "hover:bg-gray-50"
                        }`
                      }
                      onClick={handleLinkClick}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t pt-4 flex items-center justify-between gap-3">
                <NavLink
                  to="/cart"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50"
                  onClick={handleLinkClick}
                >
                  <FaShoppingCart className="text-amber-500" />
                  <div className="text-sm">Cart</div>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </NavLink>

                <button
                  onClick={() => {
                    setOpen(true);
                    setMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-gradient-to-tr from-[#ffa200] to-[#ffb74a] text-black font-semibold shadow-sm"
                >
                  Sign in
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
