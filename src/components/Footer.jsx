import React from "react";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4 group text-white">
            <img
              src={logo}
              alt="Dust on Book"
              className="w-12 h-12 object-contain group-hover:rotate-12 transition-transform"
            />
            <span className="text-xl font-bold tracking-tight">Dust on Book</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Connecting readers with rare finds, timeless classics, and stories that deserve to be read.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-[#BF092F]">Explore</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/books" className="hover:text-amber-400 transition">Books Collection</Link></li>
            <li><Link to="/blogs" className="hover:text-amber-400 transition">Our Blog</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
            <li><Link to="/orders" className="hover:text-amber-400 transition">Track Orders</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="hidden md:block">
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-[#BF092F]">Categories</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/books?category=literature" className="hover:text-amber-400 transition">Literature</Link></li>
            <li><Link to="/books?category=philosophy" className="hover:text-amber-400 transition">Philosophy</Link></li>
            <li><Link to="/books?category=politics" className="hover:text-amber-400 transition">Politics</Link></li>
            <li><Link to="/books?category=other-books" className="hover:text-amber-400 transition">More...</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-[#BF092F]">Find Us</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3">
              <MdEmail className="text-amber-500 shrink-0 mt-0.5" />
              <span>info@dustonbook.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MdPhone className="text-amber-500 shrink-0 mt-0.5" />
              <span>+92 311 9201520</span>
            </li>
            <li className="flex items-start gap-3">
              <MdLocationOn className="text-amber-500 shrink-0 mt-0.5" />
              <span>Forest Bazaar, Peshawar</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>© {currentYear} Dust on Book. All rights reserved.</p>
        <p className="mt-2 text-[10px] text-gray-600">Premium Books & Literature</p>
      </div>
    </footer>
  );
};

export default Footer;
