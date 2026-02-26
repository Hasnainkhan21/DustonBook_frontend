import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop) + drawer (mobile) */}
      <Sidebar open={mobileOpen} setOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile hamburger (positioned below main Navbar) */}
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FaHome /> <span>Admin Panel</span>
          </div>
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FaBars size={20} />
          </button>
        </div>

        <main className="flex-1 pt-16 md:pt-0 overflow-y-auto">
          <div className="container mx-auto">
            <Outlet /> {/* Child routes render here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
