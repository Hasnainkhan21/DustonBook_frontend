import React from "react";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold flex items-center rounded-2xl text-white "><span><img src={logo} alt="Dust on Book Logo" className="w-20 h-20  object-contain" /></span> Dust on Book</h2>
          <p className="text-sm text-gray-400">
            Discover stories worth remembering.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <MdEmail className="text-amber-400" />
            <span>info@dustonbook.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-amber-400" />
            <span>+1 (234) 567-890</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-amber-400" />
            <span>Forest Bazaar Peshawar</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:text-amber-400 transition">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {currentYear} Dust on Book. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
